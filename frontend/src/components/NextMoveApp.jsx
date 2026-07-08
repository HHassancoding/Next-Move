import { useState } from 'react'
import { geocodePostcode, getRecommendations } from '../api/recommendations'
import BottomSheet from './BottomSheet'
import FilterSection from './FilterSection'

const postcodePattern = /^[A-Z]{1,2}\d[A-Z\d]?\s?\d[A-Z]{2}$/

function normalizePostcode(value) {
  return value.trim().toUpperCase().replace(/\s+/g, ' ')
}

function NextMoveApp() {
  const [recommendation, setRecommendation] = useState(null)
  const [error, setError] = useState(null)
  const [postcode, setPostcode] = useState('')
  const [postcodeError, setPostcodeError] = useState('')
  const [resolvedLocation, setResolvedLocation] = useState(null)
  const [selectedBudget, setSelectedBudget] = useState('')
  const [selectedType, setSelectedType] = useState('')
  const [phase, setPhase] = useState('empty')
  const[shownPlaceID, setShownPlaceID] = useState([])

  const cleanedPostcode = normalizePostcode(postcode)
  const isValidPostcode = cleanedPostcode.length > 0 && postcodePattern.test(cleanedPostcode)
  const canSubmit = Boolean(isValidPostcode && selectedBudget && selectedType && phase !== 'loading')
  const postcodeHint = resolvedLocation ? `We found your area ${resolvedLocation.area}` : ''

  function handlePostcodeChange(value) {
    setPostcode(value)
    if (postcodeError) {
      setPostcodeError('')
    }
    if (resolvedLocation) {
      setResolvedLocation(null)
    }
  }

  async function requestRecommendation(location = resolvedLocation) {
    const data = await getRecommendations({
      location: cleanedPostcode,
      latitude: location?.latitude,
      longitude: location?.longitude,
      type: selectedType,
      budget: selectedBudget,
      excludedPlacesID: shownPlaceID
    })

    const first = Array.isArray(data) ? data[0] : data

    if (!first) {
      throw new Error('No recommendations returned')
    }
    setShownPlaceID(prev =>{
      if(!first.id ){return prev}
      if(prev.includes(first.id)){return prev}
      return [...prev, first.id]
      
    })

    setRecommendation({
      id: first.id,
      name: first.name,
      area: first.location,
      distance: first.distance,
      description: first.description,
      type: first.type,
    })
    setPhase('success')
  }

  async function handleSubmit() {
    if (!isValidPostcode) {
      setPostcodeError('Enter a valid UK postcode')
      setResolvedLocation(null)
      setPhase('empty')
      return
    }

    setPostcodeError('')
    setError(null)
    setPhase('loading')

    try {
      const coordinates = await geocodePostcode(cleanedPostcode)
      setResolvedLocation(coordinates)

      await requestRecommendation(coordinates)
    } catch (err) {
      console.error('Failed to fetch recommendations', err)
      setResolvedLocation(null)
      setError(
        err instanceof Error && err.message === 'Postcode not found'
          ? 'We could not find that postcode. Check the format and try again.'
          : 'Could not resolve your postcode right now. Please try again.'
      )
      setRecommendation(null)
      setPhase('empty')
    }
  }

  function handleAdjustFilters() {
    setPhase('empty')
  }

  async function handleReroll() {
    setError(null)
    setPhase('loading')

    try {
      await requestRecommendation()
    } catch (err) {
      console.error('Failed to reroll recommendations', err)
      setError('Could not load recommendations from the server.')
      setRecommendation(null)
      setPhase('empty')
    }
  }

  return (
    <div className="next-move-app">
      <header className="next-move-app__topbar">
        <p className="next-move-app__brand">- london</p>
        <hr className="next-move-app__divider" aria-hidden="true" />
      </header>

      <main className="next-move-app__main">
        <section className="hero" aria-labelledby="hero-title">
          <h1 id="hero-title" className="hero__title">
            find your
            <br />
            next move.
          </h1>
          <p className="hero__subtitle">
            Put in a postcode. Pick your mood. We will do the rest.
          </p>
        </section>

        <FilterSection
          postcode={postcode}
          postcodeError={postcodeError}
          postcodeHint={postcodeHint}
          onPostcodeChange={handlePostcodeChange}
          selectedBudget={selectedBudget}
          onBudgetSelect={setSelectedBudget}
          selectedType={selectedType}
          onTypeSelect={setSelectedType}
        />

        <button type="button" className="cta-button" disabled={!canSubmit} onClick={handleSubmit}>
          find my move
        </button>
      </main>

      <BottomSheet
        phase={phase}
        recommendation={recommendation}
        error={error}
        onAdjustFilters={handleAdjustFilters}
        onReroll={handleReroll}
      />
    </div>
  )
}

export default NextMoveApp
