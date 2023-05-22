import React, { useState } from 'react';
import axios from 'axios';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

function PostForm() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [message, setMessage] = useState('');

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleContentChange = (value) => {
    setContent(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);

    try {
      const response = await axios.post('linkapi', formData);
      setMessage('Bài đăng của bạn đã được lưu trữ trên server!');
    } catch (error) {
      setMessage('Đã có lỗi xảy ra khi lưu trữ bài đăng của bạn trên server!');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label className="form-control form-control-lg" htmlFor='title'>Tiêu đề</label>
        <input id='title' type="text" name="title" value={title} onChange={handleTitleChange} placeholder='Nhập tiêu đề ...' />
      </div>
      <div>
        <label className="form-control form-control-lg" htmlFor="content">Nội dung</label>
        <ReactQuill value={content} onChange={handleContentChange} aria-label="Nội dung" placeholder='Nhập nội dung ...' />
      </div>
      <button type="submit">Đăng bài</button>
      {message && <p>{message}</p>}
    </form>
  );
}

export default PostForm;
