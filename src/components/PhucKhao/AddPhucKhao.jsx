import { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import Cookies from 'js-cookie';
import {
  TextField,
  Button,
  Card,
  CardContent,
  Grid,
  Snackbar,
  SnackbarContent,
  Autocomplete,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from '@mui/material';
import axios from 'axios';

const AddPhucKhao = ({ onClose, addUser }) => {
  const [formData, setFormData] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [users, setUsers] = useState('');
  const [danhMucs, setDanhMucs] = useState([]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const token = Cookies.get('token');
    const decode = jwtDecode(token);
    const status = 'Received';
    const phucKhaoId = 'string';
    axios
      .get(`${import.meta.env.VITE_API_ENDPOINT}api/Employees/${decode.EmployeeId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const { accountEmail, employeeMSSV, employeeName, employeeId } = response.data;
        setUsers({ accountEmail, employeeMSSV, employeeName });
        setFormData({ employeeId, status, accountEmail, employeeMSSV, employeeName, phucKhaoId });
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  console.log(formData);

  useEffect(() => {
    const token = Cookies.get('token');
    axios
      .get(`${import.meta.env.VITE_API_ENDPOINT}api/Course`, {
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
      .post(`${import.meta.env.VITE_API_ENDPOINT}api/PhucKhao/`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        console.log(response.data);
        if (response.data === 'Gửi phúc khảo thành công') {
          setSuccessMessage(response.data);
          setTimeout(() => {
            setSuccessMessage('');
          }, 3000);
          addUser(formData);
        }
      })
      .catch((error) => {
        console.error(error);
        setErrorMessage('Gửi phúc khảo thất bại!');
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
                    value={users.accountEmail}
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
                    value={users.employeeName}
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
                    value={users.employeeMSSV}
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
                    options={danhMucs.filter((option) => option.lopHP === formData.lopHP).map((option) => option.tenHP)}
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

export default AddPhucKhao;
