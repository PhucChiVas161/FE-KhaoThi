import React, { useState } from 'react';
import './PostForm.css';

function PostForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);

  function handleTitleChange(event) {
    setTitle(event.target.value);
  }

  function handleDescriptionChange(event) {
    setDescription(event.target.value);
  }

  function handleFileChange(event) {
    setFile(event.target.files[0]);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('file', file);

    try {
      const response = await fetch('linkAPI', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        console.log('Post created successfully!');
      } else {
        throw new Error('Post creation failed.');
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="post-form-container">
      <form onSubmit={handleSubmit}>
        <div className="form-field">
          <label htmlFor="title">Title:</label>
          <input type="text" id="title" name="title" value={title} onChange={handleTitleChange} required />
        </div>
        <div className="form-field">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={description}
            onChange={handleDescriptionChange}
            required
          />
        </div>
        <div className="form-field">
          <label htmlFor="file">File:</label>
          <div className="file-drop-area">
            <p>Drop file here or click to select file</p>
            <input type="file" id="file" name="file" accept="application/pdf" onChange={handleFileChange} required />
          </div>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default PostForm;
