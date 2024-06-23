import { useState, useEffect } from 'react';
import { detailReCheck, updateReCheck } from '../../pages/ReCheck/ReCheckAPI';
import { getUsersLecturer } from '../../pages/UserPage/UserPageAPI';
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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Autocomplete,
} from '@mui/material';
import { useSnackbar } from 'notistack';
import { useHandleErrors } from '../../hooks/useHandleErrors';

const DetailReCheck = ({ reCheckId, onClose, onSuccess, open, hidden }) => {
  const [reCheck, setReCheck] = useState({});
  const [lecturers, setLecturers] = useState([]);
  const [formData, setFormData] = useState({
    reCheckId: reCheckId,
    status: '',
    phanHoi: '',
    phanHoiLecturer: '', // Add phanHoiLecturer to formData
    lecturerId: null, // Add lecturerId to formData
  });
  const { enqueueSnackbar } = useSnackbar();
  const handleErrors = useHandleErrors();

  useEffect(() => {
    detailReCheck(reCheckId)
      .then((response) => {
        setReCheck(response.data);
        setFormData({
          reCheckId: reCheckId,
          status: response.data.status || '',
          phanHoi: response.data.phanHoi || '',
          lecturerId: response.data.lecturerId || null, // Initialize lecturerId
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }, [reCheckId]);

  useEffect(() => {
    getUsersLecturer()
      .then((response) => {
        setLecturers(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLecturerChange = (event, value) => {
    setFormData({ ...formData, lecturerId: value ? value.employeeId : '' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateReCheck(formData)
      .then((response) => {
        if (response.status === 200) {
          enqueueSnackbar('Cập nhật phúc khảo thành công', {
            variant: 'success',
          });
          onClose();
          onSuccess(); // Gọi callback function onSuccess
        }
      })
      .catch((error) => {
        if (error.response.status === 400) {
          handleErrors(error.response.data.errors);
        }
        enqueueSnackbar('Cập nhật phúc khảo thất bại!', { variant: 'error' });
      });
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>CHI TIẾT PHÚC KHẢO</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Card>
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    disabled
                    name="Họ và tên"
                    label="Họ và tên"
                    value={reCheck.employeeName}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    disabled
                    name="Email"
                    label="Email"
                    value={reCheck.accountEmail}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    disabled
                    name="Lớp học phần"
                    label="Lớp học phần"
                    value={reCheck.lopHP}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    disabled
                    name="Mã phòng thi"
                    label="Mã phòng thi"
                    value={reCheck.maPhongThi}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    disabled
                    name="Tên học phần"
                    label="Tên học phần"
                    value={reCheck.tenHP}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={2}>
                  <TextField
                    disabled
                    name="Lần thi"
                    label="Lần thi"
                    value={reCheck.lanThi}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    disabled
                    name="reCheckId"
                    label="Mã đơn"
                    value={reCheck.reCheckId}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    disabled
                    name="lyDo"
                    label="Lý do"
                    value={reCheck.lyDo}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={6}>
                  <FormControl disabled={hidden} fullWidth>
                    <InputLabel id="status-label">Trạng thái</InputLabel>
                    <Select
                      labelId="status-label"
                      id="status"
                      name="status"
                      label="Trạng thái"
                      value={formData.status}
                      onChange={handleChange}
                    >
                      <MenuItem value="Chờ duyệt">Chờ duyệt</MenuItem>
                      <MenuItem value="Đã tiếp nhận">Đã tiếp nhận</MenuItem>
                      <MenuItem value="Đang xử lý">Đang xử lý</MenuItem>
                      <MenuItem value="Đã xử lý">Đã xử lý</MenuItem>
                      <MenuItem value="Hoàn tất">Hoàn tất</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={6}>
                  <TextField
                    disabled
                    multiline
                    name="ghiChu"
                    label="Ghi chú"
                    value={reCheck.ghiChu}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    disabled={hidden}
                    multiline
                    name="phanHoi"
                    label="Phản hồi từ phòng khảo thí"
                    value={formData.phanHoi}
                    fullWidth
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    disabled={hidden}
                    multiline
                    name="phanHoiLecturer"
                    label="Phản hồi từ giảng viên"
                    value={formData.phanHoiLecturer}
                    fullWidth
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} hidden={hidden}>
                  <Autocomplete
                    disablePortal
                    id="lecturers"
                    options={lecturers}
                    value={reCheck.lecturerName}
                    getOptionLabel={(option) => option.employeeName}
                    onChange={handleLecturerChange}
                    renderOption={(props, option) => (
                      <li {...props} key={option.employeeId}>
                        {option.employeeName}
                      </li>
                    )}
                    renderInput={(params) => (
                      <TextField {...params} label="Phân công giảng viên" />
                    )}
                  />
                </Grid>
              </Grid>
            </CardContent>
            <DialogActions
              style={{ display: 'flex', justifyContent: 'space-between' }}
            >
              <Button variant="contained" color="error" onClick={onClose}>
                Đóng
              </Button>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                hidden={hidden}
              >
                Lưu
              </Button>
            </DialogActions>
          </Card>
        </DialogContent>
      </form>
    </Dialog>
  );
};

export default DetailReCheck;
