import { useState } from 'react'
import blogsService from '../services/blogs'

const Create = (props) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
            await blogsService.create({title, author, url}) 
            props.setUser({...props.user})
            props.setNotification(`${title} added by ${author}`)
            props.setError(false)

        } catch (exception) {
            props.setNotification('Error')
            props.setError(true)
        }
        setTimeout(() => {
            props.setNotification(null)
        }, 2000)
        setAuthor('')
        setTitle('')
        setUrl('')
        props.noteFormRef.current.toggleVisibility()
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                title
                    <input
                    type="text"
                    value={title}
                    name="Title"
                    onChange={({ target }) => setTitle(target.value)}
                />
                </div>
                <div>
                author
                    <input
                    type="text"
                    value={author}
                    name="Author"
                    onChange={({ target }) => setAuthor(target.value)}
                />
                </div>
                <div>
                url
                    <input
                    type="text"
                    value={url}
                    name="URL"
                    onChange={({ target }) => setUrl(target.value)}
                />
                </div>
                <button type="submit">submit</button>
            </form>
        </div>
    )
}

export default Create
