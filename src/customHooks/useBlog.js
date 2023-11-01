import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

export const useBlog = () => {
  const blogs = useSelector((state) => state.blogs)
  const { id } = useParams()
  const blog = blogs.find((u) => u.id === id)

  return blog
}
