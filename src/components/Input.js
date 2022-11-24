import React from 'react'
import PropTypes from 'prop-types'

import './Input.css'

const Input = ({ label, name, value, onChange }) => {
    return (
        <div className="field">
            <label>{label}:</label>
            <input name={name} value={value} onChange={onChange} />
        </div>
    )
}

Input.propTypes = {
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
}

export { Input }
