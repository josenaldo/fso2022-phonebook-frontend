import React from 'react'
import PropTypes from 'prop-types'
import { Input } from 'components'
import './PersonForm.css'

const PersonForm = ({
    onSubmit,
    newName,
    newNumber,
    handleNewNameChange,
    handleNewNumberChange,
}) => {
    return (
        <form className="form" onSubmit={onSubmit}>
            <Input
                label="Name"
                name="name"
                value={newName}
                onChange={handleNewNameChange}
            />
            <Input
                label="Number"
                name="number"
                value={newNumber}
                onChange={handleNewNumberChange}
            />
            <div>
                <button type="submit">Add</button>
            </div>
        </form>
    )
}

PersonForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    newName: PropTypes.string.isRequired,
    newNumber: PropTypes.string.isRequired,
    handleNewNameChange: PropTypes.func.isRequired,
    handleNewNumberChange: PropTypes.func.isRequired,
}

export { PersonForm }
