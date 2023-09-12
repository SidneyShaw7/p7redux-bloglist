import { useState, useEffect } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import loginService from './services/login';
import LoginForm from './components/LoginForm';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');
  const [notification, setNotification] = useState(null);
  const [style, setStyle] = useState(true);
  const [loginVisible, setLoginVisible] = useState(false);

  useEffect(() => {
    if (user) {
      blogService.getAll().then((blogs) => setBlogs(blogs));
    }
  }, [user]);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser');
    window.location.reload();
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername('');
      setPassword('');
    } catch (exception) {
      setStyle(false);
      setNotification('Wrong credentials');
      setTimeout(() => {
        setNotification(null);
      }, 3500);
    }
  };

  const addBlog = async (e) => {
    e.preventDefault();

    const blogObj = {
      title,
      author,
      url,
    };
    try {
      blogService.create(blogObj);
      setBlogs(blogs.concat(blogObj));

      setTitle('');
      setAuthor('');
      setUrl('');
      setStyle(true);
      setNotification(`a new blog ${blogObj.title} by ${blogObj.author} added`);
      setTimeout(() => {
        setNotification(null);
      }, 3500);
    } catch (exception) {
      // setErrorMessage('Wrong');
      // setTimeout(() => {
      //   setErrorMessage(null);
      // }, 5000);
    }
  };

  const Notification = ({ notification, style }) => {
    return notification === null ? null : (
      <div className={style ? 'success' : 'error'}>{notification}</div>
    );
  };

  const loginForm = () => {
    const hideWhenVisible = { display: loginVisible ? 'none' : '' };
    const showWhenVisible = { display: loginVisible ? '' : 'none' };

    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={() => setLoginVisible(true)}>log in</button>
        </div>
        <div></div>
      </div>
    );
  };

  if (!user) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification notification={notification} style={style} />
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
      <form onSubmit={addBlog}>
        <div>
          title:
          <input
            type='text'
            value={title}
            name='Title'
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author:
          <input
            type='text'
            value={author}
            name='Author'
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url:
          <input
            type='text'
            value={url}
            name='Url'
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type='submit'>create</button>
      </form>

      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default App;
