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
  CircularProgress,
} from '@mui/material';
import Cookies from 'js-cookie';
import axios from 'axios';

const AddNotification = ({ addUser }) => {
  const [formData, setFormData] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLoading = (loading) => {
    setIsLoading(loading);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    handleLoading(true); // Set isLoading to true

    const token = Cookies.get('token');
    const form = new FormData();
    form.append('title', formData.title);
    form.append('content', formData.content);
    form.append('link', formData.link);

    axios
      .post(`${import.meta.env.VITE_API_ENDPOINT}api/Notis`, form, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        console.log(response.data);
        if (response.data === 'Tạo thông báo thành công') {
          setSuccessMessage(response.data);
          setTimeout(() => {
            setSuccessMessage('');
          }, 3000);
          addUser(formData);
        }
      })
      .catch((error) => {
        console.error(error);
        setErrorMessage('Tạo thông báo thất bại!');
        setTimeout(() => {
          setErrorMessage('');
        }, 3000);
      })
      .finally(() => {
        handleLoading(false); // Set isLoading to false after response is received
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
                <Grid item xs={12}>
                  <TextField
                    name="title"
                    label="Tiêu đề"
                    value={formData.title}
                    onChange={handleChange}
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name="content"
                    label="Nội dung"
                    value={formData.content}
                    onChange={handleChange}
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name="link"
                    label="Link dẫn đến PDF"
                    value={formData.link}
                    onChange={handleChange}
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12} style={{ display: 'flex', justifyContent: 'right' }}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={isLoading} // Disable button while isLoading is true
                    startIcon={isLoading ? <CircularProgress size={20} /> : null} // Show loading indicator while isLoading is true
                  >
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

export default AddNotification;
