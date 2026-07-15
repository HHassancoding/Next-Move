import ArcadeButton from './ui/ArcadeButton'

const PLACEHOLDER_IMAGE =
  'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=500&fit=crop'

function SkeletonBlock({ className = '' }) {
  return (
    <div
      className={`animate-shimmer rounded bg-arcade-navy/20 ${className}`.trim()}
      aria-hidden="true"
    />
  )
}

function LocationPinIcon() {
  return (
    <svg aria-hidden="true" className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
    </svg>
  )
}

function RerollIcon() {
  return (
    <svg aria-hidden="true" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M1 4v6h6M23 20v-6h-6" />
      <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15" />
    </svg>
  )
}

function SlidersIcon() {
  return (
    <svg aria-hidden="true" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="4" y1="21" x2="4" y2="14" />
      <line x1="4" y1="10" x2="4" y2="3" />
      <line x1="12" y1="21" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12" y2="3" />
      <line x1="20" y1="21" x2="20" y2="16" />
      <line x1="20" y1="12" x2="20" y2="3" />
      <line x1="1" y1="14" x2="7" y2="14" />
      <line x1="9" y1="8" x2="15" y2="8" />
      <line x1="17" y1="16" x2="23" y2="16" />
    </svg>
  )
}

function StaticStatsRow() {
  return (
    <div className="mt-6 hidden gap-4 md:grid md:grid-cols-4">
      {[
        { label: 'POPULARITY', bars: 4 },
        { label: 'NOISE LEVEL', bars: 3 },
        { label: 'VIBE MATCH', value: '98%' },
        { label: 'PRICE', value: '££' },
      ].map((stat) => (
        <div
          key={stat.label}
          className="rounded-lg border-2 border-arcade-navy bg-white p-4 arcade-shadow-navy"
        >
          <p className="font-mono-label text-[0.6rem] font-bold uppercase tracking-wider text-arcade-navy">
            {stat.label}
          </p>
          {stat.value ? (
            <p className="mt-2 font-display text-2xl text-arcade-navy">{stat.value}</p>
          ) : (
            <div className="mt-2 flex gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className={`h-4 w-4 border border-black ${i < (stat.bars ?? 0) ? 'bg-arcade-navy' : 'bg-arcade-yellow'}`}
                />
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

function MobileStaticStats() {
  return (
    <div className="mt-4 grid grid-cols-2 gap-3 md:hidden">
      <div className="rounded-lg border-2 border-black bg-white p-3">
        <p className="font-mono-label text-[0.6rem] font-bold uppercase">VIBE METER</p>
        <div className="mt-2 flex gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className={`h-3 flex-1 border border-black ${i < 4 ? 'bg-arcade-navy' : 'bg-arcade-yellow'}`}
            />
          ))}
        </div>
      </div>
      <div className="rounded-lg border-2 border-black bg-white p-3">
        <p className="font-mono-label text-[0.6rem] font-bold uppercase">PRICE LEVEL</p>
        <p className="mt-2 font-display text-lg text-arcade-navy">££</p>
      </div>
    </div>
  )
}

function LoadingView() {
  return (
    <section className="w-full" aria-live="polite" aria-busy="true">
      <div className="rounded-xl border-4 border-arcade-navy bg-white p-6 arcade-shadow-navy md:p-8">
        <SkeletonBlock className="mb-4 h-3 w-32" />
        <SkeletonBlock className="mb-3 h-8 w-3/4" />
        <SkeletonBlock className="mb-3 h-4 w-1/2" />
        <SkeletonBlock className="mb-3 h-4 w-2/5" />
        <SkeletonBlock className="h-16 w-full" />
        <div className="mt-6 grid grid-cols-2 gap-3">
          <SkeletonBlock className="h-12" />
          <SkeletonBlock className="h-12" />
        </div>
      </div>
    </section>
  )
}

function SuccessView({ recommendation, error, onAdjustFilters, onReroll }) {
  return (
    <section className="w-full" aria-labelledby="result-title">
      <div className="overflow-hidden rounded-xl border-4 border-arcade-navy bg-white arcade-shadow-navy">
        <div className="md:grid md:grid-cols-2">
          <div className="relative bg-gray-200 p-3 md:p-4">
            <img
              src={PLACEHOLDER_IMAGE}
              alt=""
              className="aspect-[4/3] w-full rounded-lg border-2 border-black object-cover md:aspect-auto md:h-full md:min-h-[320px]"
            />
            {recommendation?.type ? (
              <span className="absolute bottom-6 left-6 rounded border-2 border-black bg-arcade-yellow px-2 py-1 font-mono-label text-xs font-bold uppercase">
                {recommendation.type}
              </span>
            ) : null}
          </div>

          <div className="bg-scanlines-white flex flex-col gap-4 p-5 md:gap-5 md:p-8">
            <p className="hidden font-mono-label text-xs font-bold uppercase tracking-[0.2em] text-arcade-navy md:block">
              TOP MATCH FOUND
            </p>
            <p className="font-mono-label text-xs font-bold uppercase tracking-[0.2em] text-arcade-navy md:hidden">
              YOUR NEXT MOVE
            </p>

            <h2
              id="result-title"
              className="font-display text-2xl uppercase leading-tight text-black md:text-4xl"
            >
              {recommendation?.name}
            </h2>

            <p className="flex flex-wrap items-center gap-2 font-mono-label text-xs uppercase text-black">
              <LocationPinIcon />
              <span>
                {recommendation?.distance} • {recommendation?.area}
              </span>
            </p>

            {recommendation?.type ? (
              <p className="font-mono-label text-xs uppercase text-arcade-navy md:hidden">
                {recommendation.type}
              </p>
            ) : null}

            <p className="rounded-lg border-2 border-arcade-navy/20 bg-arcade-cream p-4 font-mono-label text-sm leading-relaxed text-black md:italic">
              &ldquo;{recommendation?.description}&rdquo;
            </p>

            {error ? (
              <p className="font-mono-label text-xs text-arcade-magenta">{error}</p>
            ) : null}

            <MobileStaticStats />

            <div className="mt-2 flex flex-col gap-3 md:mt-auto md:flex-row">
              <ArcadeButton
                variant="primary"
                className="w-full px-6 py-4 md:order-2 md:flex-1"
                onClick={onReroll}
              >
                <RerollIcon />
                Reroll
              </ArcadeButton>
              <ArcadeButton
                variant="secondary"
                className="w-full px-6 py-4 md:order-1 md:flex-1"
                onClick={onAdjustFilters}
              >
                <SlidersIcon />
                Adjust Filters
              </ArcadeButton>
            </div>
          </div>
        </div>
      </div>

      <StaticStatsRow />

      <div className="mt-6 overflow-hidden rounded-xl border-4 border-arcade-navy arcade-shadow-navy md:hidden">
        <div className="flex h-40 items-center justify-center bg-gradient-to-br from-indigo-200 via-purple-200 to-blue-300">
          <div className="flex flex-col items-center gap-1">
            <LocationPinIcon />
            <span className="font-mono-label text-xs uppercase text-arcade-navy">Map preview</span>
          </div>
        </div>
      </div>
    </section>
  )
}

function EmptyView() {
  return (
    <section className="w-full" aria-labelledby="result-title">
      <div className="rounded-xl border-4 border-dashed border-arcade-navy/40 bg-white/80 p-8 text-center arcade-shadow-navy md:p-12">
        <h2
          id="result-title"
          className="font-display text-xl uppercase text-arcade-navy md:text-2xl"
        >
          Your next move will appear here.
        </h2>
        <p className="mt-3 font-mono-label text-sm text-arcade-navy/70">
          Fill in the filters and tap &lsquo;FIND MY MOVE&rsquo; to get a suggestion.
        </p>
      </div>
    </section>
  )
}

function BottomSheet({ phase, recommendation, error, onAdjustFilters, onReroll }) {
  if (phase === 'loading') {
    return <LoadingView />
  }

  if (phase === 'success') {
    return (
      <SuccessView
        recommendation={recommendation}
        error={error}
        onAdjustFilters={onAdjustFilters}
        onReroll={onReroll}
      />
    )
  }

  return <EmptyView />
}

export default BottomSheet
