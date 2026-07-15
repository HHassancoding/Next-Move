function GamepadIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-5 w-5 shrink-0"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M6 9H4a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h2v2a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2v-2h2a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2h-2V7a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v2zm10 0h2a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-2v2a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2v-2h-2a2 2 0 0 1-2-2v-2a2 2 0 0 1 2-2h2V7a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2z" />
    </svg>
  )
}

function ArcadeHeader() {
  return (
    <header className="sticky top-0 z-50 border-b-4 border-black bg-arcade-navy text-white md:bg-black">
      <div className="mx-auto flex max-w-6xl items-center gap-2 px-4 py-3 md:px-8 md:py-4">
        <GamepadIcon />
        <p className="font-display text-lg italic tracking-wide md:text-xl">NEXT MOVE</p>
      </div>
    </header>
  )
}

export default ArcadeHeader
