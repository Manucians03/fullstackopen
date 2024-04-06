import { useState, useEffect, useRef } from 'react'
import View from './components/View'
import Togglable from './components/Togglable'
import Login from './components/Login'
import Create from './components/Create'
import Notification from './components/Notification'
import blogService from './services/blogs'

const App = () => {
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)
  const [error, setError] = useState(false)

  const noteFormRef = useRef()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  return (user === null) 
    ? (
    <div>
      <Notification notification={notification} error={error}/>
      <Togglable buttonLabel='login'>
        <Login
          setUser={setUser} 
          setNotification={setNotification}
          setError={setError}
        />
      </Togglable>
    </div>
  ) : (
    <div>
      <Notification notification={notification} error={error}/>
      <View user={user} setUser={setUser}/>
      <Togglable buttonLabel='new note' ref={noteFormRef}>
        <Create
          setNotification={setNotification}
          setError={setError}
          user={user}
          setUser={setUser}
          noteFormRef={noteFormRef}
        />
      </Togglable>
  </div>
  )
}

export default App