import { useState } from "react"
import personService from './services'


const Filter = (props) => {
    const [filter, setFilter] = useState('')
    const handleFilterChange = (event) => {
        setFilter(event.target.value)
    }

    const handleNotification = (message) => {
        props.setNotification(message)
        props.setError(true)
        setTimeout(() => {
            props.setNotification(null)
        }, 2000)
    }

    const handleDelete = async (event) => {
        event.preventDefault()
        const data = await personService.getAll().then(response => response.data)
        const target = data.find(person => person.id == event.target.id)
        console.log(target)
        if (typeof target === 'undefined') {
            handleNotification('not found')
        } else {
            if (window.confirm(`Do you want to delete ${target.name}?`)) {
                await personService.deleteId(event.target.id)
                const response = await personService.getAll();
                props.setPersons(response.data);
            }
        }
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