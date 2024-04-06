import { useState } from 'react'
import loginService from '../services/login'
import blogsService from '../services/blogs'

const Login = (props) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = async (event) => {
        event.preventDefault()
        try {
            const user = await loginService.login({username, password}) 
            window.localStorage.setItem(
                'loggedNoteappUser', JSON.stringify(user)
            )    
            blogsService.setToken(user.token)
            props.setUser(user)

        } catch (exception) {
            props.setNotification('Wrong credentials')
            props.setError(true)
        }
        setTimeout(() => {
            props.setNotification(null)
          }, 2000)
        setUsername('')
        setPassword('')
    }

    return (
        <div>
            <form onSubmit={handleLogin}>
                <div>
                username
                    <input
                    type="text"
                    value={username}
                    name="Username"
                    onChange={({ target }) => setUsername(target.value)}
                />
                </div>
                <div>
                password
                    <input
                    type="password"
                    value={password}
                    name="Password"
                    onChange={({ target }) => setPassword(target.value)}
                />
                </div>
                <button type="submit">login</button>
            </form>
        </div>
    )
}

export default Login
