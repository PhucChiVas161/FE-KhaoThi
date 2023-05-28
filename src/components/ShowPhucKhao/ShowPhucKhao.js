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
    const token = sessionStorage.getItem('token');
    axios
      .get(`${process.env.REACT_APP_API_ENDPOINT}api/PhucKhao/details/${id}`, {
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
      .post(`${process.env.REACT_APP_API_ENDPOINT}api/PhucKhao/${id}`, formData, {
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
          <Card style={{ width: '1000px', margin: '20px' }}>
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <TextField
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
                    disabled
                    name="employeeMSSV"
                    label="MSSV"
                    value={formData.employeeMSSV}
                    onChange={handleChange}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    disabled
                    name="hocKy"
                    label="Học kỳ"
                    value={formData.hocKy}
                    onChange={handleChange}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    disabled
                    name="lanThi"
                    label="Lần thi"
                    value={formData.lanThi}
                    onChange={handleChange}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    disabled
                    name="namHoc"
                    label="Năm Học"
                    value={formData.namHoc}
                    onChange={handleChange}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    disabled
                    name="maHocPhan"
                    label="Mã học phần"
                    value={formData.maHocPhan}
                    onChange={handleChange}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    disabled
                    name="maLop"
                    label="Mã lớp"
                    value={formData.maLop}
                    onChange={handleChange}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    disabled
                    name="tenHocPhan"
                    label="Tên học phần"
                    value={formData.tenHocPhan}
                    onChange={handleChange}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    disabled
                    name="ngayGioThi"
                    label="Ngày giờ thi"
                    value={formData.ngayGioThi}
                    onChange={handleChange}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    disabled
                    name="phongThi"
                    label="Phòng thi"
                    value={formData.phongThi}
                    onChange={handleChange}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    disabled
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
                      labelId="astatus-label"
                      id="status"
                      name="status"
                      value={formData.status}
                      onChange={handleChange}
                    >
                      <MenuItem value="Received">Đã tiếp nhận</MenuItem>
                      <MenuItem value="Inprocess">Đang xử lý</MenuItem>
                      <MenuItem value="Success">Xử lý thành công</MenuItem>
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

export default ShowPhucKhao;
