import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, user, likeIt, remove }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }
  const [view, setView] = useState(false)

  const expand = () => {
    setView(!view)
  }

  const interaction = () => {
    return (
      <>
        <button onClick={likeIt}>like</button> <br />
        {blog.user.name} <br />
        {(blog.user === user.id || blog.user.id === user.id) && (
          <button id={remove} onClick={remove}>
            remove
          </button>
        )}
      </>
    )
  }

  const expandView = () => {
    return (
      <>
        {view ? (
          <>
            <button onClick={expand}>hide</button>
            <br /> {blog.url} <br /> likes: {blog.likes}
            {user && interaction()}
          </>
        ) : (
          <button onClick={expand}>view</button>
        )}
      </>
    )
  }

  return (
    <div className='blog' style={blogStyle}>
      {blog.title} {blog.author}
      {expandView()}
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  // user: PropTypes.object.isRequired,
  likeIt: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired,
}

export default Blog
