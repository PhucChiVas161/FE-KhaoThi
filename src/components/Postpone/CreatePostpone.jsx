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
  const [course, setCourse] = useState([]);
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
      .get(`${import.meta.env.VITE_API_ENDPOINT}api/Course`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setCourse(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const uniqueLopHPs = course.reduce((acc, current) => {
    const isDuplicate = acc.find((item) => item.lopHP === current.lopHP);
    if (!isDuplicate) {
      acc.push(current);
    }
    return acc;
  }, []);

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>GỬI HOÃN THI</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent m>
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
                    options={course
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
                    options={course.filter((option) => option.lopHP === formData.lopHP).map((option) => option.tenHP)}
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
                  <FormControl fullWidth>
                    <InputLabel id="lyDo-label">Lý do</InputLabel>
                    <Select
                      labelId="lyDo-label"
                      id="lyDo"
                      name="lyDo"
                      value={formData.lyDo}
                      onChange={handleChange}
                      label="Lý do"
                    >
                      <MenuItem value="Bệnh tật hoặc tình trạng sức khỏe khẩn cấp">
                        Bệnh tật hoặc tình trạng sức khỏe khẩn cấp
                      </MenuItem>
                      <MenuItem value="Tai nạn hoặc tình huống khẩn cấp gia đình">
                        Tai nạn hoặc tình huống khẩn cấp gia đình
                      </MenuItem>
                      <MenuItem value="Các vấn đề kỹ thuật hoặc hạ tầng như mất điện, internet, máy tính, v.v.">
                        Các vấn đề kỹ thuật hoặc hạ tầng như mất điện, internet, máy tính, v.v.
                      </MenuItem>
                      <MenuItem value="Các sự kiện chính đáng như tang lễ, cưới xin, v.v.">
                        Các sự kiện chính đáng như tang lễ, cưới xin, v.v.
                      </MenuItem>
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

export default CreatePostpone;
