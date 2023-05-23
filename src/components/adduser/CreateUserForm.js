import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import axios from 'axios';

const CreateUserForm = () => {
  const [formData, setFormData] = useState({
    accountEmail: '',
    employeeName: '',
    accountPassword: '',
    employeeMSSV: '',
    accountRole: '',
    employeeGender: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Gửi dữ liệu qua API
    const token = sessionStorage.getItem('token');
    axios
      .post(`${process.env.REACT_APP_API_ENDPOINT}api/Employees/create`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        console.log(response.data);
        // Xử lý phản hồi từ API (tuỳ theo yêu cầu của bạn)
      })
      .catch((error) => {
        console.error(error);
        // Xử lý lỗi (tuỳ theo yêu cầu của bạn)
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        name="accountEmail"
        label="Account Email"
        value={formData.accountEmail}
        onChange={handleChange}
        fullWidth
      />
      <TextField
        name="employeeName"
        label="Employee Name"
        value={formData.employeeName}
        onChange={handleChange}
        fullWidth
      />
      <TextField
        name="accountPassword"
        label="Account Password"
        value={formData.accountPassword}
        onChange={handleChange}
        fullWidth
      />
      <TextField
        name="employeeMSSV"
        label="Employee MSSV"
        value={formData.employeeMSSV}
        onChange={handleChange}
        fullWidth
      />
      <TextField
        name="accountRole"
        label="Account Role"
        value={formData.accountRole}
        onChange={handleChange}
        fullWidth
      />
      <TextField
        name="employeeGender"
        label="Employee Gender"
        value={formData.employeeGender}
        onChange={handleChange}
        fullWidth
      />
      <Button type="submit" variant="contained" color="primary">
        Submit
      </Button>
    </form>
  );
};

export default CreateUserForm;
