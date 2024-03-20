import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import {
  TextField,
  Button,
  Card,
  CardContent,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const ProfileDialog = ({ open, onClose }) => {
  const [formData, setFormData] = useState({
    accountEmail: '',
    employeeName: '',
    employeeMSSV: '',
    accountRole: '',
    employeeGender: '',
  });

  const handleClose = () => {
    onClose();
  };

  useEffect(() => {
    const token = Cookies.get('token');
    const decode = jwtDecode(token);
    axios
      .get(`${import.meta.env.VITE_API_ENDPOINT}api/Employees/${decode.EmployeeId}`, {
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

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md">
      <DialogTitle>Xem thông tin người dùng</DialogTitle>
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
                  InputProps={{
                    readOnly: true,
                  }}
                  disabled
                  fullWidth
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  name="employeeName"
                  label="Tên"
                  value={formData.employeeName}
                  InputProps={{
                    readOnly: true,
                  }}
                  disabled
                  fullWidth
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  name="employeeMSSV"
                  label="MSSV"
                  value={formData.employeeMSSV}
                  InputProps={{
                    readOnly: true,
                  }}
                  disabled
                  fullWidth
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  name="accountRole"
                  label="Vai trò"
                  value={formData.accountRole}
                  InputProps={{
                    readOnly: true,
                  }}
                  disabled
                  fullWidth
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  name="employeeGender"
                  label="Giới tính"
                  value={formData.employeeGender === '0' ? 'Nữ' : 'Nam'}
                  InputProps={{
                    readOnly: true,
                  }}
                  disabled
                  fullWidth
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </DialogContent>
      <DialogActions style={{ justifyContent: 'center' }}>
        <Button variant="contained" color="error" onClick={handleClose}>
          Đóng
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProfileDialog;
