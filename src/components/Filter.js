import React from 'react'
import PropTypes from 'prop-types'
import { Input } from 'components'

const Filter = ({ value, onChange }) => {
    return (
        <Input
            label="Filter shown with"
            name="search"
            value={value}
            onChange={onChange}
        />
    )
}

Filter.propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
}

export { Filter }
