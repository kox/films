import React, { PropTypes } from 'react'

const Picker = ({ value, onChange, options }) => (
  <span>Company:  
    <select onChange={e => onChange(e.target.value)}
            value={value}>
      <option value='' key=''></option>
      {options.map(option =>
        <option value={option} key={option}>
          {option}
        </option>)
      }
    </select>
  </span>
)

Picker.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.string.isRequired
  ).isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
}

export default Picker
