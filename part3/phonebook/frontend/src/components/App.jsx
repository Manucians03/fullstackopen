import { useState, useEffect } from 'react'
import Filter from './Filter.jsx'
import Add from './Add.jsx'
import Notification from './Notification.jsx'
import personService from './services.jsx'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [notification, setNotification] = useState(null)
  const [error, setError] = useState(false)

  const hook = () => {
    personService
      .getAll()
      .then(response => {setPersons(response.data); console.log("persons", response.data)})
  }

  useEffect(hook,[])

  return (
    <div>
      <Notification notification={notification} error={error}/>
      <h2>Phonebook</h2>
      <Add persons={persons} setPersons={setPersons} setNotification={setNotification} setError={setError}/>
      <Filter persons={persons} setPersons={setPersons} setNotification={setNotification} setError={setError}/>
    </div>
  )
}

export default App