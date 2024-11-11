import React from 'react';
import PostItem from './PostItem';

function PostList({ posts, onPostUpdated, onPostDeleted }) {
  return (
    <div className="post-list">
      {posts.map((post) => (
        <PostItem key={post.id} post={post} onPostUpdated={onPostUpdated} onPostDeleted={onPostDeleted} />
      ))}
    </div>
  );
}

export default PostList;