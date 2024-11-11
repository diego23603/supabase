import React, { useState } from 'react';
import { supabase } from '../supabaseClient';

function PostForm({ onPostCreated }) {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !body) {
      setError('Por favor, complete todos los campos.');
      return;
    }

    setLoading(true);
    setError(null); // Reset error state

    try {
      const { data, error } = await supabase.from('Posts').insert([{ title, body }]);

      if (error) {
        throw error;
      }

      setTitle('');
      setBody('');
      onPostCreated();
      console.log('Post creado:', data); // Ver datos creados
    } catch (error) {
      setError(`Hubo un problema al agregar la publicación: ${error.message}`);
      console.error('Error al agregar publicación:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="post-form" onSubmit={handleSubmit}>
      {error && <p className="error-message">{error}</p>} {/* Mostrar mensaje de error */}
      <input
        type="text"
        placeholder="Título"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Contenido"
        value={body}
        onChange={(e) => setBody(e.target.value)}
        required
      />
      <button type="submit" disabled={loading}>
        {loading ? 'Cargando...' : 'Agregar Publicación'}
      </button>
    </form>
  );
}

export default PostForm;