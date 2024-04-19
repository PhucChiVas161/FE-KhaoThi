import { useState, useEffect } from 'react';
import { detailPostpone, updatePostpone } from '../../pages/PostponeExamPage/PostponeExamAPI';
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
import { useHandleErrors } from '../../hooks/useHandleErrors';

const DetailPostpone = ({ postponeExamId, onClose, open, hidden, updatePostponeRefresh }) => {
  const [postponeExam, setPostponeExam] = useState({});
  const [status, setStatus] = useState(null);
  const [formData, setFormData] = useState({
    postponeExamId: postponeExamId,
    status: '',
    phanHoi: null,
    ghiChu: null,
  });
  const { enqueueSnackbar } = useSnackbar();
  const handleErrors = useHandleErrors();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    formData.status = status;
    updatePostpone(formData)
      .then((response) => {
        if (response.status === 200) {
          enqueueSnackbar('Cập nhật hoãn thi thành công', { variant: 'success' });
          updatePostponeRefresh(formData);
          onClose();
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
      })
      .catch((error) => {
        console.log(error);
      });
  }, [postponeExamId]);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md">
      <DialogTitle>CHI TIẾT HOÃN THI</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Card>
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField disabled name="Họ và tên" label="Họ và tên" value={postponeExam.employeeName} fullWidth />
                </Grid>
                <Grid item xs={6}>
                  <TextField disabled name="Email" label="Email" value={postponeExam.accountEmail} fullWidth />
                </Grid>
                <Grid item xs={6}>
                  <TextField disabled name="Lớp học phần" label="Lớp học phần" value={postponeExam.lopHP} fullWidth />
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
                  <TextField disabled name="Tên học phần" label="Tên học phần" value={postponeExam.tenHP} fullWidth />
                </Grid>
                <Grid item xs={3}>
                  <TextField disabled name="Lần thi" label="Lần thi" value={postponeExam.lanThi} fullWidth />
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
                  <TextField disabled name="lyDo" label="Lý do" value={postponeExam.lyDo} fullWidth />
                </Grid>
                <Grid item xs={12}>
                  <TextField disabled name="Kết quả" label="Kết quả" value={postponeExam.status} fullWidth />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    disabled={hidden}
                    multiline
                    name="phanHoi"
                    label="Phản hồi"
                    value={postponeExam.phanHoi}
                    fullWidth
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    disabled={hidden}
                    multiline
                    name="ghiChu"
                    label="Ghi chú"
                    value={postponeExam.ghiChu}
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
            <div style={{ display: 'flex', gap: '8px' }}>
              <Button
                variant="contained"
                color="warning"
                onClick={() => {
                  setStatus('Từ chối');
                }}
                type="submit"
                hidden={hidden}
              >
                Từ chối
              </Button>
              <Button
                variant="contained"
                color="success"
                onClick={() => {
                  setStatus('Chấp nhận');
                }}
                type="submit"
                hidden={hidden}
              >
                Chấp nhận
              </Button>
            </div>
          </DialogActions>
        </DialogContent>
      </form>
    </Dialog>
  );
};

export default DetailPostpone;
