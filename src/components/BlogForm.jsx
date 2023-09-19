import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = (e) => {
    e.preventDefault()
    createBlog({
      title: title,
      author: author,
      url: url,
    })

    setTitle('')
    setAuthor('')
    setUrl('')
  }
  return (
    <div>
      <form onSubmit={addBlog}>
        <div>
          title:
          <input
            id='title'
            type='text'
            value={title}
            name='Title'
            onChange={(e) => setTitle(e.target.value)}
            placeholder='title'
          />
        </div>
        <div>
          author:
          <input
            id='author'
            type='text'
            value={author}
            name='Author'
            onChange={(e) => setAuthor(e.target.value)}
            placeholder='author'
          />
        </div>
        <div>
          url:
          <input
            id='url'
            type='text'
            value={url}
            name='Url'
            onChange={(e) => setUrl(e.target.value)}
            placeholder='url'
          />
        </div>
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

export default BlogForm
