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
import { AddAPhoto } from '@mui/icons-material';
import axios from 'axios';

const AddNotification = ({ addUser }) => {
  const [formData, setFormData] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [imagePreview, setImagePreview] = useState('');
  const [imageSelected, setImageSelected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setFormData({ ...formData, images: file });
      setImagePreview(reader.result);
      setImageSelected(true); // Set imageSelected to true
    };

    reader.readAsDataURL(file);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLoading = (loading) => {
    setIsLoading(loading);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    handleLoading(true); // Set isLoading to true

    const token = sessionStorage.getItem('token');
    const form = new FormData();
    form.append('title', formData.title);
    form.append('content', formData.content);
    form.append('images', formData.images);

    axios
      .post(`${process.env.REACT_APP_API_ENDPOINT}api/Noti`, form, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
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
                  <IconButton component="label" htmlFor="images" style={{ padding: 0 }}>
                    {!imageSelected ? <AddAPhoto style={{ fontSize: '4rem', color: '#ccc' }} /> : null}
                    <input
                      type="file"
                      accept="image/*"
                      id="images"
                      name="images"
                      onChange={handleImageChange}
                      style={{ display: 'none' }}
                    />
                  </IconButton>

                  {/* Image preview */}
                  {imagePreview && (
                    <img
                      src={imagePreview}
                      alt="Preview"
                      style={{
                        maxWidth: '100%',
                        maxHeight: '100%',
                        borderRadius: '50%',
                        objectFit: 'cover',
                        objectPosition: 'center',
                      }}
                    />
                  )}
                </div>
                {/* Upload Photo label */}
                <Typography variant="subtitle1" component="label" htmlFor="avatar" style={{ marginTop: '10px' }}>
                  Upload ảnh
                </Typography>
              </div>
            </CardContent>
          </Card>
          <Card style={{ width: '600px', margin: '20px' }}>
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
