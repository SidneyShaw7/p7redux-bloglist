import { useState, useEffect, useRef } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import loginService from './services/login';
import BlogForm from './components/BlogForm';
import Togglable from './components/Togglable';
import LoginForm from './components/LoginForm';
import Notification from './components/Notification';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState(null);
  const [style, setStyle] = useState(true);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser');
    if (loggedUserJSON) {
      const loggedUser = JSON.parse(loggedUserJSON);
      setUser(loggedUser);
      blogService.setToken(loggedUser.token);
    }
  }, []);

  useEffect(() => {
    if (user) {
      blogService.getAll().then((blogs) => setBlogs(blogs));
    }
  }, [user]);

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser');
    window.location.reload();
  };

  const handleLogin = async (user) => {
    try {
      const loggedUser = await loginService.login(user);
      window.localStorage.setItem(
        'loggedBlogappUser',
        JSON.stringify(loggedUser)
      );
      setUser(loggedUser);
      blogService.setToken(loggedUser.token);
    } catch (exception) {
      setStyle(false);
      setNotification('Wrong credentials');
      setTimeout(() => {
        setNotification(null);
      }, 3500);
    }
  };

  const blogFormRef = useRef();

  const addBlog = async (blogObj) => {
    try {
      await blogService.create(blogObj);
      setBlogs((prevBlogs) => [...prevBlogs, blogObj]);
      blogFormRef.current.toggleVisibility();
    } catch (error) {
      console.error('An error occurred while creating the blog:', error);
      setStyle(false);
      setNotification('An error occurred while creating the blog');
      setTimeout(() => {
        setNotification(null);
      }, 3500);
    }
  };

  if (!user) {
    return (
      <div>
        <Notification notification={notification} style={style} />
        <LoginForm handleLogin={handleLogin} user={user} setUser={setUser} />
      </div>
    );
  }
  return (
    <div>
      <h2>blogs</h2>
      <Notification notification={notification} style={style} />
      <p>
        {user.username} logged in<button onClick={handleLogout}>logout</button>
      </p>
      <Togglable buttonLabel='new blog' ref={blogFormRef}>
        <BlogForm createBlog={addBlog} />
      </Togglable>
      {blogs.map((blog) => (
        <Blog user={user} key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default App;
