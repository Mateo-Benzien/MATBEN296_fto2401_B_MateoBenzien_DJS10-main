//The code below includes error handling. If the fetch operation fails, 
//the error message will be stored in the state and displayed to the user.
import React, { useState, useEffect } from 'react';

// Main App component
const App = () => {
  // State to store the fetched posts
  const [posts, setPosts] = useState([]);
  // State to store any error that occurs during fetching
  const [error, setError] = useState(null);

  // useEffect to fetch posts when the component mounts
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        // Fetching posts from the API
        //Ensure the application correctly displays the error message.
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        // Check if the response is not okay, throw an error
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        // Parse the JSON response
        const data = await response.json();
        // Set the posts data to the state
        setPosts(data);
      } catch (error) {
        // Catch any errors and set the error message to the state
        setError(error.message);
      }
    };

    // Call the fetchPosts function
    fetchPosts();
  }, []);

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Blog Posts</h1>
      {/* Render error message if there's an error */}
      {error ? (
        <div>Error: {error}</div>
      ) : (
        // Render the list of posts if there's no error
        <ul>
          {posts.map(post => (
            <li key={post.id}>
              <h2>{post.title}</h2>
              <p>{post.body}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default App;
