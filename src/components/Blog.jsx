import { useState } from 'react';

const Blog = ({ blog, user }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };
  const [view, setView] = useState(false);
  const expand = () => {
    setView(!view);
  };

  if (!view) {
    return (
      <div style={blogStyle}>
        {blog.title} {blog.author}
        <button onClick={expand}>view</button>
      </div>
    );
  }
  return (
    <div style={blogStyle}>
      {blog.title}
      {blog.author}
      <button onClick={expand}>hide</button> <br /> {blog.url} <br /> likes:{' '}
      {blog.likes}
      <button>like</button> <br /> {user.name}
    </div>
  );
};

export default Blog;
