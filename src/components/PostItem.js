import React, { useState } from 'react';
import { supabase } from '../supabaseClient';

function PostItem({ post, onPostUpdated, onPostDeleted }) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(post.title);
  const [body, setBody] = useState(post.body);

  const handleUpdate = async () => {
    await supabase.from('Posts').update({ title, body }).eq('id', post.id);
    setIsEditing(false);
    onPostUpdated();
  };

  const handleDelete = async () => {
    await supabase.from('Posts').delete().eq('id', post.id);
    onPostDeleted();
  };

  return (
    <div className="post-item">
      {isEditing ? (
        <>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
          <textarea value={body} onChange={(e) => setBody(e.target.value)} />
          <button onClick={handleUpdate}>Guardar</button>
        </>
      ) : (
        <>
          <h3>{post.title}</h3>
          <p>{post.body}</p>
        </>
      )}
      <button onClick={() => setIsEditing(!isEditing)}>{isEditing ? 'Cancelar' : 'Editar'}</button>
      <button onClick={handleDelete}>Eliminar</button>
    </div>
  );
}

export default PostItem;