const variantClasses = {
  primary:
    'bg-arcade-navy text-white border-2 border-black arcade-shadow hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0_0_#000] active:translate-x-1 active:translate-y-1 active:shadow-none',
  secondary:
    'bg-arcade-yellow text-arcade-navy border-2 border-black arcade-shadow hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0_0_#000] active:translate-x-1 active:translate-y-1 active:shadow-none',
  outline:
    'bg-white text-arcade-navy border-2 border-arcade-navy arcade-shadow-navy hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[4px_4px_0_0_#1d2b53] active:translate-x-1 active:translate-y-1 active:shadow-none',
  cta:
    'bg-arcade-navy text-white border-4 border-black arcade-shadow font-display italic uppercase tracking-wide hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0_0_#000] active:translate-x-1 active:translate-y-1 active:shadow-none',
}

function ArcadeButton({
  children,
  variant = 'primary',
  className = '',
  disabled,
  ...props
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      className={[
        'inline-flex items-center justify-center gap-2 font-mono-label text-sm font-bold uppercase tracking-wider transition-transform',
        variantClasses[variant] ?? variantClasses.primary,
        disabled ? 'cursor-not-allowed opacity-50 hover:translate-x-0 hover:translate-y-0 hover:shadow-[4px_4px_0_0_#000]' : '',
        className,
      ].join(' ')}
      {...props}
    >
      {children}
    </button>
  )
}

export default ArcadeButton
