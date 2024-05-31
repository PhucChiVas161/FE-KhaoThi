import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
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
import axios from 'axios';

const ShowPhucKhao = ({ id, onClose }) => {
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
    const token = Cookies.get('token');
    axios
      .get(`${import.meta.env.VITE_API_ENDPOINT}api/PhucKhao/details/${id}`, {
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
    const token = Cookies.get('token');
    axios
      .post(`${import.meta.env.VITE_API_ENDPOINT}api/PhucKhao/update/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        console.log(response.data);
        if (response.data === 'Cập nhật thành công') {
          setSuccessMessage(response.data);
          setTimeout(() => {
            setSuccessMessage('');
          }, 3000);
        }
      })
      .catch((error) => {
        console.error(error);
        setErrorMessage('Cập nhật thất bại!');
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
          <Card style={{ width: '1000px', margin: '20px' }}>
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <TextField
                    InputLabelProps={{
                      shrink: true,
                    }}
                    disabled
                    name="accountEmail"
                    type="email"
                    label="Email"
                    value={formData.accountEmail}
                    onChange={handleChange}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    InputLabelProps={{
                      shrink: true,
                    }}
                    disabled
                    name="employeeName"
                    label="Name"
                    value={formData.employeeName}
                    onChange={handleChange}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    InputLabelProps={{
                      shrink: true,
                    }}
                    disabled
                    name="employeeMSSV"
                    label="MSSV"
                    value={formData.employeeMSSV}
                    onChange={handleChange}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    InputLabelProps={{
                      shrink: true,
                    }}
                    disabled
                    name="lopHP"
                    label="Lớp học phần"
                    value={formData.lopHP}
                    onChange={handleChange}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    InputLabelProps={{
                      shrink: true,
                    }}
                    disabled
                    name="maPhongThi"
                    label="Mã phòng thi"
                    value={formData.maPhongThi}
                    onChange={handleChange}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    InputLabelProps={{
                      shrink: true,
                    }}
                    disabled
                    name="tenHP"
                    label="Tên học phần"
                    value={formData.tenHP}
                    onChange={handleChange}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    InputLabelProps={{
                      shrink: true,
                    }}
                    disabled
                    name="lanThi"
                    label="Lần thi"
                    value={formData.lanThi}
                    onChange={handleChange}
                    fullWidth
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    InputLabelProps={{
                      shrink: true,
                    }}
                    disabled
                    multiline
                    name="lyDo"
                    label="Lý do"
                    value={formData.lyDo}
                    onChange={handleChange}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel id="status-label">Trạng thái</InputLabel>
                    <Select
                      labelId="status-label"
                      id="status"
                      name="status"
                      value={formData.status || ''} // Ensure that the value is never undefined
                      onChange={handleChange}
                    >
                      <MenuItem value="Received">Đã tiếp nhận</MenuItem>
                      <MenuItem value="Inprocess">Đang xử lý</MenuItem>
                      <MenuItem value="Success">Xử lý thành công</MenuItem>
                      {/* Add more menu items as needed */}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    InputLabelProps={{
                      shrink: true,
                    }}
                    multiline
                    name="phanHoi"
                    label="Phản hồi"
                    value={formData.phanHoi}
                    onChange={handleChange}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    InputLabelProps={{
                      shrink: true,
                    }}
                    multiline
                    name="ghiChu"
                    label="Ghi chú"
                    value={formData.ghiChu}
                    onChange={handleChange}
                    fullWidth
                  />
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

export default ShowPhucKhao;
