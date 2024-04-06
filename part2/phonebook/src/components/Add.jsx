import { useState } from "react"
import personService from './services.jsx'

const Add = (props) => {
    
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
      
    const handleNameChange = (event) => {
        setNewName(event.target.value)
    }

    const handleNumberChange = (event) => {
        setNewNumber(event.target.value)
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        let update = false
        let existed = false
        await props.persons.forEach(person => {
            if (person.name === newName) {
                existed = true
                if (window.confirm(`${newName} already exists. Do you want to update?`)) {
                    updatePerson(person)
                    update = true
               }
            }
        })
        if (!existed) {
            addPerson()
        }
        setNewName('')
        setNewNumber('')
    }

    const handleNotification = (message) => {
        console.log(message)
        props.setNotification(message)
        props.setError(false)
        setTimeout(() => {
            props.setNotification(null)
        }, 2000)
    }

    const updatePerson = async (person) => {
        console.log('updating')
        await personService.update(person.id, {...person, number: newNumber})
        const response = await personService.getAll();
        props.setPersons(response.data)
        handleNotification(`${person.name} number updated!`)
    }
    
    const addPerson = async () => {
        console.log('adding')
        const maxId = props.persons.map(person => person.id).reduce((acc, e) => e > acc ? e : acc, 0)
        const newPerson = { name: newName, number: newNumber, id: maxId+1}
        await personService
            .create(newPerson)
            .then(response => {
                props.setPersons(props.persons.concat(response.data))
            })
        handleNotification(`${newName} number added!`)
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