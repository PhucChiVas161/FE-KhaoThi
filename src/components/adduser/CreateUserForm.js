import React, { useState } from 'react';
import {
  TextField,
  Button,
  Card,
  CardContent,
  Grid,
  IconButton,
  Typography,
  MenuItem,
  InputLabel,
  Select,
  FormControl,
  Snackbar,
  SnackbarContent,
} from '@mui/material';
import { AddAPhoto } from '@mui/icons-material';
import axios from 'axios';

const CreateUserForm = ({ addUser }) => {
  const [formData, setFormData] = useState({
    accountEmail: '',
    employeeName: '',
    accountPassword: '',
    employeeMSSV: '',
    accountRole: '',
    employeeGender: '',
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Gửi dữ liệu qua API
    const token = sessionStorage.getItem('token');
    axios
      .post(`${process.env.REACT_APP_API_ENDPOINT}api/Accounts/create`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        console.log(response.data);
        if (response.data === 'Create Thành công') {
          setSuccessMessage('Tạo người dùng thành công!');
          setTimeout(() => {
            setSuccessMessage('');
          }, 3000); // Thời gian đóng thông báo (3 giây)
          addUser(formData);
        } else if (response.data === 'Email đã tồn tại') {
          setErrorMessage(response.data);
          setTimeout(() => {
            setErrorMessage('');
          }, 3000); // Thời gian đóng thông báo (3 giây)
        }
      })
      .catch((error) => {
        console.error(error);
        setErrorMessage('Tạo người dùng thất bại!');
        setTimeout(() => {
          setErrorMessage('');
        }, 3000); // Thời gian đóng thông báo (3 giây)
        // Xử lý lỗi (tuỳ theo yêu cầu của bạn)
      });
  };

  return (
    <>
      <Snackbar
        open={!!successMessage}
        autoHideDuration={3000}
        onClose={() => setSuccessMessage('')}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <SnackbarContent
          sx={{ backgroundColor: '#43a047', color: 'white' }}
          message={successMessage}
          action={
            <Button color="inherit" size="small" onClick={() => setSuccessMessage('')}>
              Đóng
            </Button>
          }
        />
      </Snackbar>
      <Snackbar
        open={!!errorMessage}
        autoHideDuration={3000}
        onClose={() => setErrorMessage('')}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <SnackbarContent
          sx={{ backgroundColor: '#f44336', color: 'white' }}
          message={errorMessage}
          action={
            <Button color="inherit" size="small" onClick={() => setErrorMessage('')}>
              Đóng
            </Button>
          }
        />
      </Snackbar>
      <form onSubmit={handleSubmit}>
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
                    type="email"
                    label="Account Email"
                    value={formData.accountEmail}
                    onChange={handleChange}
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    name="employeeName"
                    label="Employee Name"
                    value={formData.employeeName}
                    onChange={handleChange}
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    name="accountPassword"
                    type="password"
                    label="Account Password"
                    value={formData.accountPassword}
                    onChange={handleChange}
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    name="employeeMSSV"
                    label="Employee MSSV"
                    value={formData.employeeMSSV}
                    onChange={handleChange}
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={6}>
                  <FormControl fullWidth>
                    <InputLabel id="accountRole-label">Account Role</InputLabel>
                    <Select
                      labelId="accountRole-label"
                      id="accountRole"
                      name="accountRole"
                      value={formData.accountRole}
                      onChange={handleChange}
                    >
                      <MenuItem value="Manager">Manager</MenuItem>
                      <MenuItem value="Student">Student</MenuItem>
                      {/* Add more menu items as needed */}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={6}>
                  <FormControl fullWidth>
                    <InputLabel id="EmployeeGender-label">Giới tính</InputLabel>
                    <Select
                      labelId="EmployeeGender-label"
                      id="employeeGender"
                      name="employeeGender"
                      value={formData.employeeGender}
                      onChange={handleChange}
                    >
                      <MenuItem value="Nam">Nam</MenuItem>
                      <MenuItem value="Nữ">Nữ</MenuItem>
                      {/* Add more menu items as needed */}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} style={{ display: 'flex', justifyContent: 'right' }}>
                  <Button type="submit" variant="contained" color="primary">
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </div>
      </form>
    </>
  );
};

export default CreateUserForm;
