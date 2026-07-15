const typeIcons = {
  FOOD: (
    <svg aria-hidden="true" className="h-8 w-8 md:h-10 md:w-10" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C9.24 2 7 4.24 7 7v1H5v2h2v10h10V10h2V8h-2V7c0-2.76-2.24-5-5-5zm0 2c1.66 0 3 1.34 3 3v1H9V7c0-1.66 1.34-3 3-3z" />
    </svg>
  ),
  ACTIVITY: (
    <svg aria-hidden="true" className="h-8 w-8 md:h-10 md:w-10" viewBox="0 0 24 24" fill="currentColor">
      <path d="M6 14l3-6 3 4 3-8 3 10H6zm-2 2h16v2H4v-2z" />
    </svg>
  ),
  VIEW: (
    <svg aria-hidden="true" className="h-8 w-8 md:h-10 md:w-10" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
    </svg>
  ),
}

const budgetColors = {
  FREE: {
    base: 'bg-arcade-teal text-white',
    selected: 'ring-4 ring-black ring-offset-2',
    shadow: 'shadow-[0_4px_0_0_#1a7ab8]',
  },
  CHEAP: {
    base: 'bg-arcade-orange text-white',
    selected: 'ring-4 ring-black ring-offset-2',
    shadow: 'shadow-[0_4px_0_0_#c44e20]',
  },
  MEDIUM: {
    base: 'bg-arcade-gold text-arcade-navy',
    selected: 'ring-4 ring-black ring-offset-2',
    shadow: 'shadow-[0_4px_0_0_#a88a10]',
  },
  EXPENSIVE: {
    base: 'bg-arcade-magenta text-white',
    selected: 'ring-4 ring-black ring-offset-2',
    shadow: 'shadow-[0_4px_0_0_#b8003a]',
  },
}

function PillButton({
  label,
  sublabel,
  value,
  variant = 'budget',
  selected = false,
  onClick,
}) {
  if (variant === 'type') {
    return (
      <button
        type="button"
        className={[
          'flex flex-col items-center justify-center gap-2 rounded-lg border-2 border-black p-4 transition-transform',
          selected
            ? 'bg-arcade-navy text-white arcade-shadow-press'
            : 'bg-white text-arcade-navy arcade-shadow hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0_0_#000]',
        ].join(' ')}
        aria-pressed={selected}
        onClick={onClick}
      >
        {typeIcons[value] ?? typeIcons.FOOD}
        <span className="font-mono-label text-xs font-bold uppercase tracking-wider">
          {label}
        </span>
      </button>
    )
  }

  const colors = budgetColors[value] ?? budgetColors.FREE

  return (
    <button
      type="button"
      className={[
        'flex min-h-[72px] flex-col items-center justify-center gap-1 rounded-lg border-2 border-black px-2 py-3 transition-transform',
        colors.base,
        colors.shadow,
        selected ? colors.selected : 'hover:translate-y-0.5 hover:shadow-[0_2px_0_0_currentColor]',
      ].join(' ')}
      aria-pressed={selected}
      onClick={onClick}
    >
      <span className="font-mono-label text-sm font-bold uppercase tracking-wider">
        {label}
      </span>
      {sublabel ? (
        <span className="font-mono-label text-[0.65rem] uppercase opacity-90">
          {sublabel}
        </span>
      ) : null}
    </button>
  )
}

function PillGroup({ options, variant = 'budget', selectedValue, onSelect }) {
  const gridClass =
    variant === 'type'
      ? 'grid grid-cols-3 gap-3'
      : 'grid grid-cols-2 gap-3 md:grid-cols-4'

  return (
    <div className={gridClass}>
      {options.map((option) => (
        <PillButton
          key={option.value}
          label={option.label}
          sublabel={option.sublabel}
          value={option.value}
          variant={variant}
          selected={selectedValue === option.value}
          onClick={() => onSelect(option.value)}
        />
      ))}
    </div>
  )
}

export { PillButton }
export default PillGroup
