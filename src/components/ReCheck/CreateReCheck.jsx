import { useState, useEffect } from 'react';
import { useSnackbar } from 'notistack';
import { useHandleErrors } from '../../hooks/useHandleErrors';
import { createReCheck } from '../../pages/ReCheck/ReCheckAPI';
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

const CreateReCheck = ({ onSuccess, onClose, open }) => {
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
    createReCheck(formData)
      .then((response) => {
        if (response.status === 200) {
          enqueueSnackbar('Gửi phúc khảo thành công', { variant: 'success' });
          onClose();
          onSuccess();
        }
      })
      .catch((error) => {
        if (error.response.status === 400) {
          handleErrors(error.response.data.errors);
        }
        enqueueSnackbar('Gửi phúc khảo thất bại!', { variant: 'error' });
      });
  };
  // Nùi này là để lấy data từ khoá học và lọc ra các giá trị tương ứng
  useEffect(() => {
    const token = Cookies.get('token');
    axios
      .get(`${import.meta.env.VITE_API_ENDPOINT}Course`, {
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
      <DialogTitle>GỬI PHÚC KHẢO</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Card>
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Autocomplete
                    inputValue={formData.lopHP}
                    onInputChange={(event, newValue) => {
                      setFormData({
                        ...formData,
                        lopHP: newValue,
                        maPhongThi: '',
                      });
                    }}
                    options={uniqueLopHPs.map((option) => option.lopHP)}
                    renderInput={(params) => (
                      <TextField {...params} label="Lớp học phần" />
                    )}
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
                    renderInput={(params) => (
                      <TextField {...params} label="Mã phòng thi" />
                    )}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Autocomplete
                    inputValue={formData.tenHP}
                    onInputChange={(event, newValue) => {
                      setFormData({ ...formData, tenHP: newValue });
                    }}
                    options={course
                      .filter((option) => option.lopHP === formData.lopHP)
                      .map((option) => option.tenHP)}
                    renderInput={(params) => (
                      <TextField {...params} label="Tên Học Phần" />
                    )}
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
                      <MenuItem value="Sai sót trong chấm điểm">
                        Sai sót trong chấm điểm
                      </MenuItem>
                      <MenuItem value="Điểm số không phản ánh đúng kiến thức">
                        Điểm số không phản ánh đúng kiến thức
                      </MenuItem>
                      <MenuItem value="Hoàn cảnh đặc biệt ảnh hưởng đến kết quả">
                        Hoàn cảnh đặc biệt ảnh hưởng đến kết quả
                      </MenuItem>
                      <MenuItem value="Tiêu chí chấm điểm không rõ ràng">
                        Tiêu chí chấm điểm không rõ ràng
                      </MenuItem>
                      <MenuItem value="Thiếu sót trong quá trình kiểm tra/thi">
                        Thiếu sót trong quá trình kiểm tra/thi
                      </MenuItem>
                      <MenuItem value="Điều kiện thi không công bằng">
                        Điều kiện thi không công bằng
                      </MenuItem>
                      <MenuItem value="Vấn đề về sức khỏe hoặc tâm lý">
                        Vấn đề về sức khỏe hoặc tâm lý
                      </MenuItem>
                      <MenuItem value="Lỗi hành chính">Lỗi hành chính</MenuItem>
                    </Select>
                  </FormControl>
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

export default CreateReCheck;
