import { useState } from 'react'
import { geocodePostcode, getRecommendations } from '../api/recommendations'
import BottomSheet from './BottomSheet'
import FilterSection from './FilterSection'
import ArcadeButton from './ui/ArcadeButton'
import ArcadeHeader from './ui/ArcadeHeader'

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
    <div className="min-h-svh bg-dot-grid md:bg-scanlines">
      <ArcadeHeader />

      <div className="mx-auto max-w-6xl px-4 py-6 md:px-8 md:py-10">
        <main className="flex flex-col gap-8 md:gap-10">
          <section className="flex flex-col gap-4" aria-labelledby="hero-title">
            <h1
              id="hero-title"
              className="font-display text-4xl uppercase italic leading-none text-arcade-navy md:text-6xl lg:text-7xl"
            >
              FIND YOUR
              <br />
              NEXT MOVE.
            </h1>
            <p className="max-w-md font-mono-label text-sm text-black/80">
              Put in a postcode. Pick your mood. We will do the rest.
            </p>
            <div className="flex gap-2" aria-hidden="true">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="h-2 w-8 bg-arcade-navy" />
              ))}
            </div>
          </section>

          <section className="mx-auto w-full max-w-3xl">
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

            <ArcadeButton
              variant="cta"
              className="mt-6 w-full py-5 text-lg md:mt-8"
              disabled={!canSubmit}
              onClick={handleSubmit}
            >
              FIND MY MOVE
              <svg
                aria-hidden="true"
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
              </svg>
            </ArcadeButton>
          </section>

          <section className="mx-auto w-full max-w-5xl">
            <BottomSheet
              phase={phase}
              recommendation={recommendation}
              error={error}
              onAdjustFilters={handleAdjustFilters}
              onReroll={handleReroll}
            />
          </section>
        </main>

        <footer className="mt-16 hidden border-t-4 border-black bg-black py-8 text-center text-white md:block">
          <p className="font-mono-label text-xs uppercase tracking-[0.3em]">Next Move Arcade</p>
          <p className="mt-2 font-mono-label text-[0.65rem] text-white/60">
            &copy; 2024 NEXT MOVE ARCADE. INSERT COIN TO CONTINUE.
          </p>
        </footer>
      </div>
    </div>
  )
}

export default NextMoveApp
