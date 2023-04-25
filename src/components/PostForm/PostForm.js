import React, { useState } from "react";
import "./PostForm.css";

function PostForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle post submission logic here
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  return (
    <div className="post-form-container">
      <form onSubmit={handleSubmit}>
        <div className="form-field">
          <label htmlFor="title">Tiêu đề:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </div>
        <div className="form-field">
          <label htmlFor="description">Mô tả:</label>
          <textarea
            id="description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          ></textarea>
        </div>
        <div className="form-field">
          <label htmlFor="file">Nội dung (PDF):</label>
          {file ? (
            <p>{file.name}</p>
          ) : (
            <div className="file-drop-area">
              <p>Kéo thả file vào đây</p>
              <input
                type="file"
                id="file"
                accept="application/pdf"
                onChange={handleFileChange}
              />
            </div>
          )}
        </div>
        <button type="submit">Đăng bài</button>
      </form>
    </div>
  );
}

export default PostForm;