import { useState, useEffect } from 'react';
import { detailPostpone } from '../../pages/PostponeExamPage/PostponeExamAPI';
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
  InputLabel,
  MenuItem,
  Select,
  FormControl,
  NativeSelect,
} from '@mui/material';

const DetailPostpone = ({ postponeExamId, onClose, open, hidden }) => {
  const [postponeExam, setPostponeExam] = useState({});
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
                <TextField disabled name="Mã đơn" label="Mã đơn" value={postponeExam.postponeExamId} fullWidth />
              </Grid>
              <Grid item xs={12}>
                <TextField disabled name="lyDo" label="Lý do" value={postponeExam.lyDo} fullWidth />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel id="status-label">Kết quả</InputLabel>
                  <NativeSelect
                    labelId="status-label"
                    id="status"
                    name="status"
                    defaultValue={postponeExam.status}
                    label="Kết quả"
                    // onChange={handleChange}
                  >
                    <option value={postponeExam.status}>{postponeExam.status}</option>
                    <option value={20}>Twenty</option>
                    <option value={30}>Thirty</option>
                  </NativeSelect>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField disabled={hidden} name="Phản hồi" label="Phản hồi" value={postponeExam.phanHoi} fullWidth />
              </Grid>
              <Grid item xs={12}>
                <TextField disabled={hidden} name="Ghi chú" label="Ghi chú" value={postponeExam.ghiChu} fullWidth />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
        <DialogActions style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button variant="contained" color="error" onClick={onClose}>
            Đóng
          </Button>
          <div style={{ display: 'flex', gap: '8px' }}>
            <Button variant="contained" color="error" onClick={onClose} hidden={hidden}>
              Từ chối
            </Button>
            <Button variant="contained" color="success" onClick={onClose} hidden={hidden}>
              Chấp nhận
            </Button>
          </div>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
};

export default DetailPostpone;
