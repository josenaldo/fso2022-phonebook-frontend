import React from 'react'

import {
    Filter,
    PersonForm,
    People,
    Notification,
    NOTIFICATION_LEVELS,
} from 'components'
import { personServices } from 'services'

import './App.css'

const App = () => {
    const [people, setPeople] = React.useState([])

    const [newName, setNewName] = React.useState('')
    const [newNumber, setNewNumber] = React.useState('')
    const [search, setSearch] = React.useState('')

    const [message, setMessage] = React.useState(null)
    const [messageTimeout, setMessageTimeout] = React.useState(null)

    const peopleToShow = search
        ? people.filter((person) =>
              person.name.toLowerCase().includes(search.toLowerCase())
          )
        : people

    const handleSearchChange = (event) => {
        setSearch(event.target.value)
    }

    const handleNewNameChange = (event) => {
        setNewName(event.target.value)
    }

    const handleNewNumberChange = (event) => {
        setNewNumber(event.target.value)
    }

    const showMessage = (text, level) => {
        const message = {
            text: text,
            level: level,
            timeout: null,
        }

        if (messageTimeout) {
            clearTimeout(messageTimeout)
            setMessageTimeout(null)
        }

        setMessage(message)

        const timeout = setTimeout(() => {
            setMessage(null)
            setMessageTimeout(null)
        }, 6000)

        setMessageTimeout(timeout)
    }

    const createOrUpdate = (event) => {
        event.preventDefault()

        personServices
            .getAll({ name: newName })
            .then((people) => {
                if (people.length === 0) {
                    create()
                } else {
                    update(people[0])
                }
            })
            .catch((error) => {
                showMessage(
                    error.response.data.error,
                    NOTIFICATION_LEVELS.ERROR
                )
            })
    }

    const create = () => {
        const person = {
            name: newName,
            number: newNumber,
        }

        personServices
            .create(person)
            .then((person) => {
                setPeople(people.concat(person))
                setNewName('')
                setNewNumber('')
                showMessage(`Added ${person.name}`, NOTIFICATION_LEVELS.SUCCESS)
            })
            .catch((error) => {
                showMessage(
                    error.response.data.error,
                    NOTIFICATION_LEVELS.ERROR
                )
            })
    }

    const update = (person) => {
        if (
            window.confirm(
                `${person.name} is already added to phonebook, replace the old number with a new one?`
            )
        ) {
            person.number = newNumber

            personServices
                .update(person, person.id)
                .then((person) => {
                    setPeople(
                        people.map((p) => (p.id !== person.id ? p : person))
                    )
                    setNewName('')
                    setNewNumber('')
                    showMessage(
                        `Updated ${person.name}`,
                        NOTIFICATION_LEVELS.SUCCESS
                    )
                })
                .catch((error) => {
                    showMessage(
                        error.response.data.error,
                        NOTIFICATION_LEVELS.ERROR
                    )
                })
        }
    }

    const remove = (id) => {
        const personToRemove = people.find((p) => p.id === id)
        const message = `Delete ${personToRemove.name}?`

        if (window.confirm(message)) {
            personServices
                .remove(id)
                .then(() => {})
                .catch((error) => {
                    const message = `Information of ${personToRemove.name} has already been removed from server`
                    showMessage(message, NOTIFICATION_LEVELS.ERROR)
                })
            setPeople(people.filter((p) => p.id !== id))
        }
    }

    React.useEffect(() => {
        personServices.getAll().then((people) => {
            setPeople(people)
            showMessage('Application started', NOTIFICATION_LEVELS.INFO)
        })
    }, [])

    return (
        <div className="App">
            <Notification message={message} />

            <h2>Phonebook</h2>
            <Filter value={search} onChange={handleSearchChange} />

            <h2>Add a new</h2>

            <PersonForm
                onSubmit={createOrUpdate}
                newName={newName}
                newNumber={newNumber}
                handleNewNameChange={handleNewNameChange}
                handleNewNumberChange={handleNewNumberChange}
            />

            <h2>Numbers</h2>
            <People people={peopleToShow} remove={remove} />
        </div>
    )
}

export default App
