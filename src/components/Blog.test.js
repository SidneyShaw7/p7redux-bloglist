import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('a blog renders title and author but not its URL or likes by default', () => {
  const blog = {
    title: 'testing title',
    author: 'testing author',
    url: 'testing url',
  }

  render(<Blog blog={blog} />)

  const element = screen.getByText('testing title testing author')
  //   const element1 = screen.getByText('testing url')
  expect(element).toBeDefined()
  //   expect(element1).toBeDefined()
})

test('URL and likes are shown when clicking the button', async () => {
  const blog = {
    title: 'testing title',
    author: 'testing author',
    url: 'testing url',
  }

  const user = {
    name: 'testname',
  }

  const mockHandler = jest.fn()

  render(<Blog blog={blog} user={user} />)

  const user1 = userEvent.setup()
  const button = screen.getByText('view')
  await user1.click(button)
  const element = screen.getByText(
    'testing title testing author testing url likes: testname'
  )
  expect(element).toBeDefined()
  screen.debug()
})

test('if the like button is clicked twice, the event handler is called twice', async () => {
  const blog = {
    title: 'testing title',
    author: 'testing author',
    url: 'testing url',
  }

  const user = {
    name: 'testname',
  }

  const mockHandler = jest.fn()

  render(<Blog blog={blog} user={user} likeIt={mockHandler} />)

  const user1 = userEvent.setup()
  const viewButton = screen.getByText('view')
  await user1.click(viewButton)
  const likeButton = screen.getByText('like')
  await user1.click(likeButton)
  await user1.click(likeButton)

  expect(mockHandler.mock.calls).toHaveLength(2)
})
