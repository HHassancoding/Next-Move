function SkeletonLine({ className }) {
  return <div className={`bottom-sheet__skeleton ${className || ''}`.trim()} />
}

function BottomSheet({ phase, recommendation, error, onAdjustFilters, onReroll }) {
  if (phase === 'loading') {
    return (
      <section className="bottom-sheet" aria-live="polite" aria-busy="true">
        <div className="bottom-sheet__handle" aria-hidden="true" />
        <div className="bottom-sheet__content bottom-sheet__content--loading">
          <div className="bottom-sheet__skeleton-label" />
          <SkeletonLine className="bottom-sheet__skeleton-name" />
          <SkeletonLine className="bottom-sheet__skeleton-meta" />
          <SkeletonLine className="bottom-sheet__skeleton-meta" />
          <SkeletonLine className="bottom-sheet__skeleton-body" />
        </div>
      </section>
    )
  }

  if (phase === 'success') {
    return (
      <section className="bottom-sheet" aria-labelledby="result-title">
        <div className="bottom-sheet__handle" aria-hidden="true" />
        <div className="bottom-sheet__content bottom-sheet__content--result">
          <p className="bottom-sheet__eyebrow">Your next move</p>
          <h2 id="result-title" className="bottom-sheet__result-name">
            {recommendation?.name}
          </h2>
          <p className="bottom-sheet__meta">
            {recommendation?.area} · {recommendation?.distance}
          </p>
          {recommendation?.type ? <p className="bottom-sheet__meta">{recommendation.type}</p> : null}
          <p className="bottom-sheet__body bottom-sheet__body--result">
            {recommendation?.description}
          </p>
          {error ? <p className="bottom-sheet__meta">{error}</p> : null}
          <div className="bottom-sheet__actions">
            <button type="button" className="bottom-sheet__button bottom-sheet__button--outline" onClick={onAdjustFilters}>
              Adjust filters
            </button>
            <button type="button" className="bottom-sheet__button bottom-sheet__button--solid" onClick={onReroll}>
              Reroll
            </button>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="bottom-sheet" aria-labelledby="result-title">
      <div className="bottom-sheet__handle" aria-hidden="true" />
      <div className="bottom-sheet__content">
        <h2 id="result-title" className="bottom-sheet__title">
          Your next move will appear here.
        </h2>
        <p className="bottom-sheet__body">
          Fill in the filters and tap 'Show me one place' to get a suggestion.
        </p>
      </div>
    </section>
  )
}

export default BottomSheet
