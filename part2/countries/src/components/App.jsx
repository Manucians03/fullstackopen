import { useState } from 'react'
import View from './View'

function App() {
  const [name, setName] = useState('')
  const handleNameChange = (event) => {
    setName(event.target.value)
}
  return (
    <>
      find countries <input value={name} onChange={handleNameChange}/>
      <View name={name.toLowerCase()} setName={setName}/> 
    </>
  )
}

export default App
