import React, { useState } from 'react';
import { TextField, Button, Card, CardContent, Grid, IconButton, Typography } from '@mui/material';
import { AddAPhoto } from '@mui/icons-material';
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
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <Card style={{ width: '300px', margin: '20px' }}>
        <CardContent>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              height: '100%',
              position: 'relative',
            }}
          >
            {/* Circular image upload section */}
            <div
              style={{
                width: '150px',
                height: '150px',
                borderRadius: '50%',
                border: '2px dashed #ccc',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              {/* Camera icon */}
              <IconButton component="label" htmlFor="avatar" style={{ padding: 0 }}>
                <AddAPhoto style={{ fontSize: '4rem', color: '#ccc' }} />
                <input
                  type="file"
                  accept="image/*"
                  id="avatar"
                  name="avatar"
                  onChange={handleChange}
                  style={{ display: 'none' }}
                />
              </IconButton>
            </div>
            {/* Upload Photo label */}
            <Typography variant="subtitle1" component="label" htmlFor="avatar" style={{ marginTop: '10px' }}>
              Thêm Avatar
            </Typography>
            <Typography variant="subtitle2" component="label" htmlFor="Allow">
              Chức năng demo, chưa gắn chức năng
            </Typography>
          </div>
        </CardContent>
      </Card>
      <Card style={{ width: '600px', margin: '20px' }}>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                name="accountEmail"
                label="Account Email"
                value={formData.accountEmail}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                name="employeeName"
                label="Employee Name"
                value={formData.employeeName}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                name="accountPassword"
                label="Account Password"
                value={formData.accountPassword}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                name="employeeMSSV"
                label="Employee MSSV"
                value={formData.employeeMSSV}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                name="accountRole"
                label="Account Role"
                value={formData.accountRole}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                name="employeeGender"
                label="Employee Gender"
                value={formData.employeeGender}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center' }}>
              <Button type="submit" variant="contained" color="primary" onClick={handleSubmit}>
                Submit
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateUserForm;
