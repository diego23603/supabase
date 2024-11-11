import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';
import PostList from './components/PostList';
import PostForm from './components/PostForm';
import PostItem from './components/PostItem';
import './App.css';

function App() {
  const [posts, setPosts] = useState([]);
  
  const fetchPosts = async () => {
    const { data, error } = await supabase.from('Posts').select();
    if (error) console.error('Error fetching posts:', error);
    else setPosts(data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="App">
      <h1>Gestión de Publicaciones</h1>
      <PostForm onPostCreated={fetchPosts} />
      <PostList posts={posts} onPostUpdated={fetchPosts} onPostDeleted={fetchPosts} />
    </div>
  );
}

export default App;