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
  Autocomplete,
} from '@mui/material';
import axios from 'axios';

const ShowForm = ({ id, onClose }) => {
  const [formData, setFormData] = useState({
    accountEmail: '',
    employeeName: '',
    employeeMSSV: '',
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [danhMucs, setDanhMucs] = useState([]);

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

  useEffect(() => {
    const token = Cookies.get('token');
    axios
      .get(`${import.meta.env.VITE_API_ENDPOINT}api/DanhMucs`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setDanhMucs(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

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

  const uniqueLopHPs = danhMucs.reduce((acc, current) => {
    const isDuplicate = acc.find((item) => item.lopHP === current.lopHP);
    if (!isDuplicate) {
      acc.push(current);
    }
    return acc;
  }, []);

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
                  <Autocomplete
                    inputValue={formData.lopHP}
                    onInputChange={(event, newValue) => {
                      setFormData({ ...formData, lopHP: newValue, maPhongThi: '' });
                    }}
                    options={uniqueLopHPs.map((option) => option.lopHP)}
                    renderInput={(params) => <TextField {...params} label="Lớp học phần" />}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Autocomplete
                    inputValue={formData.maPhongThi}
                    onInputChange={(event, newValue) => {
                      setFormData({ ...formData, maPhongThi: newValue });
                    }}
                    options={danhMucs
                      .filter((option) => option.lopHP === formData.lopHP)
                      .map((option) => option.maPhongThi)}
                    renderInput={(params) => <TextField {...params} label="Mã phòng thi" />}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Autocomplete
                    inputValue={formData.tenHP}
                    onInputChange={(event, newValue) => {
                      setFormData({ ...formData, tenHP: newValue });
                    }}
                    options={danhMucs
                      .filter((option) => option.maPhongThi === formData.maPhongThi)
                      .map((option) => option.tenHP)}
                    renderInput={(params) => <TextField {...params} label="Tên Học Phần" />}
                  />
                </Grid>
                <Grid item xs={6}>
                  <FormControl fullWidth>
                    <InputLabel id="lanThi-label">Lần Thi</InputLabel>
                    <Select
                      labelId="lanThi-label"
                      id="lanThi"
                      name="lanThi"
                      value={formData.lanThi}
                      onChange={handleChange}
                    >
                      <MenuItem value="1">1</MenuItem>
                      <MenuItem value="2">2</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    InputLabelProps={{
                      shrink: true,
                    }}
                    multiline
                    name="lyDo"
                    label="Lý do"
                    value={formData.lyDo}
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

export default ShowForm;
