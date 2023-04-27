import React, { useState, useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import axios from 'axios';
import './PostList.css'

const PostList = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get('http://cntttest.vanlanguni.edu.vn:18080/Khaothi23/api/v1/News/get_all') //linkAPI
      .then(response => {
        setPosts(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const handleEdit = (id) => {
    // Xử lý khi người dùng nhấn nút sửa
    console.log(`Edit post with id = ${id}`);
  };

  const handleDelete = (id) => {
    axios.delete(`http://cntttest.vanlanguni.edu.vn:18080/Khaothi23/api/v1/News/${id}/drop`)
      .then(response => {
        console.log(response.data);
        // Xóa bài viết khỏi danh sách
        const updatedPosts = posts.filter(post => post.id !== id);
        setPosts(updatedPosts);
      })
      .catch(error => {
        console.log(error);
      });
  };
  

  return (
    <Table striped bordered hover className="post-table">
      <thead>
        <tr>
          <th>#</th>
          <th>Title</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {posts.map(post => (
          <tr key={post.id}>
          <td>{post.id}</td>
          <td><a href={post.title_desc}>{post.title_content}</a></td>
            <td>
              <Button variant="primary" className="btn" onClick={() => handleEdit(post.id)}>Edit</Button>
              <Button variant="danger" className="btn" onClick={() => handleDelete(post.id)}>Delete</Button>
            </td>
          </tr>
        ))}
      </tbody>

    </Table>
  );
};

export default PostList;
