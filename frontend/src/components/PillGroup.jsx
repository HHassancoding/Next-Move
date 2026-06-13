function PillButton({
  label,
  sublabel,
  variant = 'budget',
  selected = false,
  onClick,
}) {
  const pillClassName = [
    'pill-button',
    variant === 'type' ? 'pill-button--type' : 'pill-button--budget',
    selected ? 'pill-button--selected' : '',
  ].join(' ')

  return (
    <button
      type="button"
      className={pillClassName}
      aria-pressed={selected}
      onClick={onClick}
    >
      <span className="pill-button__label">{label}</span>
      {sublabel ? <span className="pill-button__sublabel">{sublabel}</span> : null}
    </button>
  )
}

function PillGroup({ options, variant = 'budget', selectedValue, onSelect }) {
  return (
    <div className={`pill-group pill-group--${variant}`}>
      {options.map((option) => (
        <PillButton
          key={option.value}
          label={option.label}
          sublabel={option.sublabel}
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