import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { useSnackbar } from 'notistack';
import {
  TextField,
  Button,
  Grid,
  MenuItem,
  InputLabel,
  Select,
  FormControl,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Card,
  CardContent,
} from '@mui/material';
import axios from 'axios';

const EditUser = ({ employeeId, onClose, onSuccess }) => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    accountEmail: '',
    employeeName: '',
    employeeMSSV: '',
    accountRole: '',
    employeeGender: '',
  });
  const { enqueueSnackbar } = useSnackbar();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    setOpen(true);
    const token = Cookies.get('token');
    axios
      .get(`${import.meta.env.VITE_API_ENDPOINT}api/Employees/${employeeId}`, {
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
  }, [employeeId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = Cookies.get('token');
    const csrf = Cookies.get('csrf');
    axios
      .post(`${import.meta.env.VITE_API_ENDPOINT}api/Employees/update`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'X-CSRF-TOKEN': csrf,
        },
        withCredentials: true,
      })
      .then((response) => {
        enqueueSnackbar('Cập nhật thông tin người dùng thành công!', { variant: 'success' });
        onSuccess(formData);
        handleClose();
      })
      .catch((error) => {
        console.error(error);
        enqueueSnackbar('Cập nhật thông tin người dùng thất bại!', { variant: 'error' });
      });
  };

  const handleClose = () => {
    setOpen(false);
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md">
      <DialogTitle>Edit User</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Card>
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={12}>
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
            <Button variant="contained" color="error" onClick={handleClose}>
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

export default EditUser;
