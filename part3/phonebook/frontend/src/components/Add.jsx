import { useState } from "react"
import personService from './Services.jsx'

const Add = (props) => {
    
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
      
    const handleNameChange = (event) => {
        setNewName(event.target.value)
    }

    const handleNumberChange = (event) => {
        setNewNumber(event.target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        let existed = false
        props.persons.forEach(person => {
            if (person.name === newName) {
                existed = true
                if (window.confirm(`${newName} already exists. Do you want to update?`)) {
                    updatePerson(person)
               }
            }
        })
        if (!existed) {
            addPerson()
        }
        setNewName('')
        setNewNumber('')
    }

    const handleNotification = (message, error) => {
        console.log(message)
        props.setNotification(message)
        props.setError(error)
        setTimeout(() => {
            props.setNotification(null)
        }, 2000)
    }

    const updatePerson = (person) => {
        console.log('updating')
        personService
            .update(person.id, {...person, number: newNumber})
            .then(() => {
                personService
                    .getAll()
                    .then(response => {
                        props.setPersons(response.data)
                    })
                handleNotification(`${newName} number updated!`, false)
            })
            .catch((error) => {
                handleNotification(error.toString(), true)
            })
    }
    
    const addPerson = () => {
        console.log('adding')
        const newPerson = { name: newName, number: newNumber}
        personService
            .create(newPerson)
            .then(() => {
                personService
                    .getAll()
                    .then(response => {
                        props.setPersons(response.data)
                    })
                handleNotification(`${newName} number added!`, false)
            })
            .catch((error) => {
                handleNotification(error.toString(), true)
            })
    }

    return (
        <div>
            <h2>Add new</h2>
            <form>
                <div>
                <p>
                    name: <input value={newName} onChange={handleNameChange}/>
                </p>
                <p>
                    number: <input value={newNumber} onChange={handleNumberChange}/>
                </p>

                </div>
                <div>
                <button type="submit" onClick={handleSubmit}>add</button>
                </div>
            </form>
        </div>
    )
}

export default Add