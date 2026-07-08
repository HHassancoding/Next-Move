import PillGroup from './PillGroup'
import { budgetOptions, typeOptions } from '../constraints/options'

function FilterField({ label, children }) {
  return (
    <section className="filter-section__field" aria-label={label}>
      <h2 className="filter-section__label">{label}</h2>
      {children}
    </section>
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
    <section className="filter-section" aria-labelledby="filters-title">
      <h2 id="filters-title" className="sr-only">
        Filters
      </h2>

      <FilterField label="WHERE ARE YOU">
        <div className="postcode-field">
          <label className="sr-only" htmlFor="postcode">
            UK postcode
          </label>
          <input
            id="postcode"
            name="postcode"
            type="text"
            inputMode="text"
            autoComplete="postal-code"
            placeholder="SW1A 1AB"
            className="postcode-field__input"
            value={postcode}
            onChange={(event) => onPostcodeChange(event.target.value)}
            aria-invalid={Boolean(postcodeError)}
            aria-describedby={postcodeError ? 'postcode-error' : undefined}
          />
        </div>
        {postcodeError ? (
          <p id="postcode-error" className="postcode-field__error">
            {postcodeError}
          </p>
        ) : postcodeHint ? (
          <p className="postcode-field__hint" aria-live="polite">
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