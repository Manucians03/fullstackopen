import { useState, useEffect } from 'react'
import Blog from './Blog'
import blogService from '../services/blogs'

const View = (props) => {
 
    const [blogs, setBlogs] = useState([])

    useEffect(() => {
        blogService.getAll().then(blogs =>
          setBlogs( blogs )
        )  
    }, [props.user])

    const handleLogout = (event) => {
        event.preventDefault()
        props.setUser(null)
        window.localStorage.clear()
    }
    
    return (
        <div>
            <h2>Blogs</h2>
            <p> {props.user.username} logged in <button type="submit" onClick={handleLogout}> logout </button></p>
            {blogs.sort((a, b) => (a.likes < b.likes) ? 1 : -1).map(blog => <Blog key={blog.id} id={blog.id} blog={blog} user={props.user} setUser={props.setUser}/>)}
        </div>
    )
}

export default View