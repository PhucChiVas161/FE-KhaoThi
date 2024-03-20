import { useState, useEffect } from 'react';
import { useSnackbar } from 'notistack';
import { useHandleErrors } from '../../hooks/useHandleErrors';
import { createPostponeExam } from '../../pages/PostponeExamPage/PostponeExamAPI';
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
  Autocomplete,
} from '@mui/material';
import Cookies from 'js-cookie';
import axios from 'axios';

const CreatePostpone = ({ createPostpone, onClose, open }) => {
  const [formData, setFormData] = useState({
    lopHP: '',
    maPhongThi: '',
    tenHP: '',
    lanThi: '',
    lyDo: '',
  });
  const [danhMucs, setDanhMucs] = useState([]);
  const { enqueueSnackbar } = useSnackbar();
  const handleErrors = useHandleErrors();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createPostponeExam(formData)
      .then((response) => {
        if (response.status === 200) {
          enqueueSnackbar('Gửi hoãn thi thành công', { variant: 'success' });
          createPostpone(formData);
          onClose();
        }
      })
      .catch((error) => {
        if (error.response.status === 400) {
          handleErrors(error.response.data.errors);
        }
        enqueueSnackbar('Gửi hoãn thi thất bại!', { variant: 'error' });
      });
  };
  // Nùi này là để lấy data từ danh mục và lọc ra các giá trị tương ứng
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
  const uniqueLopHPs = danhMucs.reduce((acc, current) => {
    const isDuplicate = acc.find((item) => item.lopHP === current.lopHP);
    if (!isDuplicate) {
      acc.push(current);
    }
    return acc;
  }, []);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md">
      <DialogTitle>GỬI HOÃN THI</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Card>
            <CardContent>
              <Grid container spacing={2}>
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
                      label="Lần Thi"
                    >
                      <MenuItem value="1">1</MenuItem>
                      <MenuItem value="2">2</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    multiline
                    name="lyDo"
                    label="Lý do"
                    value={formData.lyDo}
                    onChange={handleChange}
                    fullWidth
                  />
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

export default CreatePostpone;
