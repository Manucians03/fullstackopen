import { useState } from "react"
import blogsService from '../services/blogs'

const Blog = ({id, blog, user, setUser}) => {
  const blogStyle = {
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 2,
  }
  
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const handleLike = async (event) => {
    event.preventDefault()
    await blogsService.update(id, {likes: blog.likes + 1})
    setUser({...user})
  }

  const handleDelete = async (event) => {
    event.preventDefault()
    if (window.confirm(`Delete ${blog.title}?`)) {
      await blogsService.deleteId(id)
      setUser({...user})
    }
  }

  return (
  <div>
    <div style={hideWhenVisible}>
      {blog.title} {blog.author}
      <button onClick={toggleVisibility}>view</button>
      <button onClick={handleDelete}>delete</button>
    </div>
    <div style={{...blogStyle, ...showWhenVisible}}>
      <p>
        {blog.title} <br />
        {blog.author} <br />
        {blog.url} <br />
        {blog.likes} <button onClick={handleLike}>like</button> <br />
        {blog.user.name} 
      </p>
      <button onClick={toggleVisibility}>hide</button> 
      <button onClick={handleDelete}>delete</button>
    </div>
  </div>
)}

export default Blog