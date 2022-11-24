import React from 'react'
import PropTypes from 'prop-types'

import './People.css'

const People = ({ people: people, remove }) => {
    return (
        <table cellSpacing="0" cellPadding="0">
            <tbody>
                {people.map((person) => (
                    <tr key={person.id}>
                        <td className="person-name">{person.name}</td>
                        <td className="person-number">{person.number}</td>
                        <td className="person-delete">
                            <button onClick={() => remove(person.id)}>
                                Delete
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

People.propTypes = {
    people: PropTypes.array.isRequired,
    remove: PropTypes.func.isRequired,
}

export { People }
