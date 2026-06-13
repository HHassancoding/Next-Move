import { useState } from 'react'
import { getRecommendations } from '../api/recommendations'
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
  const [selectedBudget, setSelectedBudget] = useState('')
  const [selectedType, setSelectedType] = useState('')
  const [phase, setPhase] = useState('empty')

  const cleanedPostcode = normalizePostcode(postcode)
  const isValidPostcode = cleanedPostcode.length > 0 && postcodePattern.test(cleanedPostcode)
  const canSubmit = Boolean(isValidPostcode && selectedBudget && selectedType && phase !== 'loading')

  function handlePostcodeChange(value) {
    setPostcode(value)
    if (postcodeError) {
      setPostcodeError('')
    }
  }

  async function requestRecommendation() {
    const data = await getRecommendations({
      location: cleanedPostcode,
      type: selectedType,
      budget: selectedBudget,
    })

    const first = Array.isArray(data) ? data[0] : data

    if (!first) {
      throw new Error('No recommendations returned')
    }

    setRecommendation({
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
      setPhase('empty')
      return
    }

    setPostcodeError('')
    setError(null)
    setPhase('loading')

    try {
      await requestRecommendation()
    } catch (err) {
      console.error('Failed to fetch recommendations', err)
      setError('Could not load recommendations from the server.')
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
        <p className="next-move-app__brand">Next Move London</p>
      </header>

      <main className="next-move-app__main">
        <section className="hero" aria-labelledby="hero-title">
          <h1 id="hero-title" className="hero__title">
            What’s your next move?
          </h1>
          <p className="hero__subtitle">
            Set where you are, your budget, and what you’re in the mood for.
          </p>
        </section>

        <FilterSection
          postcode={postcode}
          postcodeError={postcodeError}
          onPostcodeChange={handlePostcodeChange}
          selectedBudget={selectedBudget}
          onBudgetSelect={setSelectedBudget}
          selectedType={selectedType}
          onTypeSelect={setSelectedType}
        />

        <button type="button" className="cta-button" disabled={!canSubmit} onClick={handleSubmit}>
          Show me one place
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
