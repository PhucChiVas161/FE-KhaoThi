import { useState } from 'react';
import { useSnackbar } from 'notistack';
import { useHandleErrors } from '../../hooks/useHandleErrors';
import Cookies from 'js-cookie';
import {
  TextField,
  Button,
  Card,
  CardContent,
  Grid,
  MenuItem,
  InputLabel,
  Select,
  FormControl,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import axios from 'axios';

const CreateUser = ({ onSuccess, onClose, open }) => {
  const [formData, setFormData] = useState({
    accountEmail: '',
    employeeName: '',
    accountPassword: '',
    employeeMSSV: '',
    accountRole: '',
    employeeGender: '',
  });
  const { enqueueSnackbar } = useSnackbar();
  const handleErrors = useHandleErrors();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = Cookies.get('token');
    axios
      .post(`${import.meta.env.VITE_API_ENDPOINT}api/Accounts/create`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          enqueueSnackbar('Tạo người dùng thành công!', { variant: 'success' });
          onClose();
          onSuccess();
        }
      })
      .catch((error) => {
        if (error.response.status === 400) {
          handleErrors(error.response.data.errors);
        }
        enqueueSnackbar('Tạo người dùng thất bại!', { variant: 'error' });
      });
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md">
      <DialogTitle>Tạo người dùng mới</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Card>
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    name="accountEmail"
                    type="email"
                    label="Email"
                    value={formData.accountEmail}
                    onChange={handleChange}
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    name="accountPassword"
                    type="password"
                    label="Password"
                    value={formData.accountPassword}
                    onChange={handleChange}
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    name="employeeName"
                    label="Tên"
                    value={formData.employeeName}
                    onChange={handleChange}
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    name="employeeMSSV"
                    label="MSSV"
                    value={formData.employeeMSSV}
                    onChange={handleChange}
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={6}>
                  <FormControl fullWidth>
                    <InputLabel id="accountRole-label">Vai trò</InputLabel>
                    <Select
                      labelId="accountRole-label"
                      label="Vai trò"
                      id="accountRole"
                      name="accountRole"
                      value={formData.accountRole}
                      onChange={handleChange}
                    >
                      <MenuItem value="Manager">Manager</MenuItem>
                      <MenuItem value="Student">Student</MenuItem>
                      <MenuItem value="Lecturer">Lecturer</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={6}>
                  <FormControl fullWidth>
                    <InputLabel>Giới tính</InputLabel>
                    <Select
                      id="employeeGender"
                      name="employeeGender"
                      value={formData.employeeGender}
                      onChange={handleChange}
                      label="Giới tính"
                    >
                      <MenuItem value="1">Nam</MenuItem>
                      <MenuItem value="0">Nữ</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
          <DialogActions style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button variant="contained" color="error" onClick={onClose}>
              Đóng
            </Button>
            <Button variant="contained" color="primary" type="submit">
              Lưu
            </Button>
          </DialogActions>
        </DialogContent>
      </form>
    </Dialog>
  );
};

export default CreateUser;
