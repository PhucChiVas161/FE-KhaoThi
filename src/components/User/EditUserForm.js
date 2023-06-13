import React, { useState, useEffect } from 'react';
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

const EditUserForm = ({ employeeId, onClose }) => {
  const [formData, setFormData] = useState({
    accountEmail: '',
    employeeName: '',
    employeeMSSV: '',
    accountRole: '',
    employeeGender: '',
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    axios
      .get(`${process.env.REACT_APP_API_ENDPOINT}api/Employees/${employeeId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setFormData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  console.log(formData);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Gửi dữ liệu qua API
    const token = sessionStorage.getItem('token');
    axios
      .post(`${process.env.REACT_APP_API_ENDPOINT}api/Employees/update`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        console.log(response.data);
        if (response.data === 'Cập nhật thông tin thành công') {
          setSuccessMessage(response.data);
          setTimeout(() => {
            setSuccessMessage('');
          }, 3000); // Thời gian đóng thông báo (3 giây)
        }
      })
      .catch((error) => {
        console.error(error);
        setErrorMessage('Cập nhật thông tin người dùng thất bại!');
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
          <Card style={{ width: '900px', margin: '20px' }}>
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
                <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Button variant="contained" color="error" onClick={onClose}>
                    Close
                  </Button>
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

export default EditUserForm;
