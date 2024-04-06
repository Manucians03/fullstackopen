import { useState } from "react"
import personService from './services'


const Filter = (props) => {
    const [filter, setFilter] = useState('')
    const handleFilterChange = (event) => {
        setFilter(event.target.value)
    }

    const handleNotification = (message, error) => {
        props.setNotification(message)
        props.setError(error)
        setTimeout(() => {
            props.setNotification(null)
        }, 2000)
    }

    const handleDelete = (event) => {
        event.preventDefault()
        personService
            .getAll()
            .then(response => response.data)
            .then(data => {
                const target = data.find(person => person.id == event.target.id)
                console.log(target)
                if (typeof target === 'undefined') {
                    handleNotification('not found', true)
                } else {
                    if (window.confirm(`Do you want to delete ${target.name}?`)) {
                        personService
                            .deleteId(event.target.id)
                            .then(() => {
                                personService
                                    .getAll()
                                    .then(response => {
                                        props.setPersons(response.data)
                                    })
                                handleNotification(`${target.name} number deleted!`, false)
                            })
                            .catch((error) => {
                                handleNotification(error.toString(), true)
                            })
                    }
                }
            })

    }
    
    return (
        <div>
            Filter <input value={filter} onChange={handleFilterChange}/>
            <h2>Numbers</h2>
            {props.persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase())).map(person => (<p>{person.name} {person.number} <button id={person.id} type="submit" onClick={handleDelete}> delete </button></p>))}
        </div>
    )
}

export default Filter