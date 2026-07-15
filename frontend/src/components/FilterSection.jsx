import PillGroup from './PillGroup'
import { budgetOptions, typeOptions } from '../constraints/options'

function FilterField({ label, children }) {
  return (
    <section className="flex flex-col gap-3" aria-label={label}>
      <h2 className="font-mono-label text-xs font-bold uppercase tracking-[0.2em] text-arcade-navy">
        {label}
      </h2>
      {children}
    </section>
  )
}

function LocationPinIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-5 w-5 shrink-0 text-arcade-navy"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
    </svg>
  )
}

function FilterSection({
  postcode,
  postcodeError,
  postcodeHint,
  onPostcodeChange,
  selectedBudget,
  onBudgetSelect,
  selectedType,
  onTypeSelect,
}) {
  return (
    <section
      className="flex flex-col gap-6 rounded-xl border-4 border-arcade-navy bg-white p-5 arcade-shadow-navy md:gap-8 md:p-8"
      aria-labelledby="filters-title"
    >
      <h2 id="filters-title" className="sr-only">
        Filters
      </h2>

      <FilterField label="WHERE ARE YOU">
        <div className="relative">
          <label className="sr-only" htmlFor="postcode">
            UK postcode
          </label>
          <input
            id="postcode"
            name="postcode"
            type="text"
            inputMode="text"
            autoComplete="postal-code"
            placeholder="ENTER POSTCODE"
            className="w-full rounded-lg border-2 border-black bg-white py-4 pl-4 pr-12 font-mono-label text-sm uppercase tracking-wider text-arcade-navy placeholder:text-gray-400 arcade-shadow"
            value={postcode}
            onChange={(event) => onPostcodeChange(event.target.value)}
            aria-invalid={Boolean(postcodeError)}
            aria-describedby={postcodeError ? 'postcode-error' : undefined}
          />
          <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2">
            <LocationPinIcon />
          </span>
        </div>
        {postcodeError ? (
          <p id="postcode-error" className="font-mono-label text-xs text-arcade-magenta">
            {postcodeError}
          </p>
        ) : postcodeHint ? (
          <p className="font-mono-label text-xs text-arcade-navy" aria-live="polite">
            {postcodeHint}
          </p>
        ) : null}
      </FilterField>

      <FilterField label="WHAT KIND OF MOVE">
        <PillGroup
          options={typeOptions}
          variant="type"
          selectedValue={selectedType}
          onSelect={onTypeSelect}
        />
      </FilterField>

      <FilterField label="BUDGET">
        <PillGroup
          options={budgetOptions}
          variant="budget"
          selectedValue={selectedBudget}
          onSelect={onBudgetSelect}
        />
      </FilterField>
    </section>
  )
}

export default FilterSection
