import { useSnackbar } from 'notistack';
import { useState, useEffect } from 'react';

import {
  Card,
  Grid,
  Button,
  Dialog,
  Select,
  MenuItem,
  TextField,
  InputLabel,
  CardContent,
  DialogTitle,
  FormControl,
  DialogContent,
  DialogActions,
} from '@mui/material';

import { useHandleErrors } from '../../hooks/useHandleErrors';
import { detailPostpone, updatePostpone } from '../../pages/PostponeExamPage/PostponeExamAPI';

const DetailPostpone = ({ postponeExamId, onClose, open, hidden, onSucess }) => {
  const [postponeExam, setPostponeExam] = useState({});
  const [formData, setFormData] = useState({
    postponeExamId,
    status: '',
    phanHoi: '',
    ghiChu: '',
  });
  const { enqueueSnackbar } = useSnackbar();
  const handleErrors = useHandleErrors();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updatePostpone(formData)
      .then((response) => {
        if (response.status === 200) {
          enqueueSnackbar('Cập nhật hoãn thi thành công', { variant: 'success' });
          onClose();
          onSucess();
        }
      })
      .catch((error) => {
        if (error.response.status === 400) {
          handleErrors(error.response.data.errors);
        }
        enqueueSnackbar('Cập nhật hoãn thi thất bại!', { variant: 'error' });
      });
  };

  useEffect(() => {
    detailPostpone(postponeExamId)
      .then((response) => {
        setPostponeExam(response.data);
        setFormData({
          postponeExamId,
          status: response.data.status || '',
          phanHoi: response.data.phanHoi || '',
          ghiChu: response.data.ghiChu || '',
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }, [postponeExamId]);

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>CHI TIẾT HOÃN THI</DialogTitle>
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
                    value={postponeExam.employeeName}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    disabled
                    name="Email"
                    label="Email"
                    value={postponeExam.accountEmail}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    disabled
                    name="Lớp học phần"
                    label="Lớp học phần"
                    value={postponeExam.lopHP}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    disabled
                    name="Mã phòng thi"
                    label="Mã phòng thi"
                    value={postponeExam.maPhongThi}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    disabled
                    name="Tên học phần"
                    label="Tên học phần"
                    value={postponeExam.tenHP}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    disabled
                    name="Lần thi"
                    label="Lần thi"
                    value={postponeExam.lanThi}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    disabled
                    name="postponeExamId"
                    label="Mã đơn"
                    value={postponeExam.postponeExamId}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    disabled
                    name="lyDo"
                    label="Lý do"
                    value={postponeExam.lyDo}
                    fullWidth
                    multiline
                  />
                </Grid>
                <Grid item xs={4}>
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
                      <MenuItem value="Từ chối">Từ chối</MenuItem>
                      <MenuItem value="Chấp nhận">Chấp nhận</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    disabled={hidden}
                    multiline
                    name="ghiChu"
                    label="Ghi chú"
                    value={formData.ghiChu}
                    fullWidth
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    disabled={hidden}
                    multiline
                    name="phanHoi"
                    label="Phản hồi"
                    value={formData.phanHoi}
                    fullWidth
                    onChange={handleChange}
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
          <DialogActions style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button variant="contained" color="error" onClick={onClose}>
              Đóng
            </Button>
            <Button variant="contained" color="primary" type="submit" hidden={hidden}>
              Lưu
            </Button>
          </DialogActions>
        </DialogContent>
      </form>
    </Dialog>
  );
};

export default DetailPostpone;
