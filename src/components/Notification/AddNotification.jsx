import { useState } from 'react';
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
import { useSnackbar } from 'notistack';
import { createNotification } from '../../pages/Notification/NotificationAPI';

const AddNotification = ({ onSuccess, onClose, open }) => {
  const [formData, setFormData] = useState({});
  const { enqueueSnackbar } = useSnackbar();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append('title', formData.title);
    form.append('content', formData.content);
    form.append('link', formData.link);

    createNotification(formData)
      .then((response) => {
        if (response.status === 200) {
          enqueueSnackbar('Tạo thông báo thành công', { variant: 'success' });
          onSuccess();
          onClose();
        }
      })
      .catch((error) => {
        console.error(error);
        enqueueSnackbar('Tạo thông báo thất bại', { variant: 'error' });
      })
      .finally(() => {
        onClose();
      });
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>Tạo thông báo</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Card>
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
              </Grid>
            </CardContent>
          </Card>
          <DialogActions
            style={{ display: 'flex', justifyContent: 'space-between' }}
          >
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

export default AddNotification;
