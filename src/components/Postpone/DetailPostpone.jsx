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
} from '@mui/material';

const DetailPostpone = ({ postponeExamId, onClose, open }) => {
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
  console.log(postponeExam);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md">
      <DialogTitle>CHI TIẾT HOÃN THI</DialogTitle>
      <DialogContent>
        <Card>
          <CardContent>
            <Grid container spacing={2}>
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
              <Grid item xs={6}>
                <TextField disabled name="Lần thi" label="Lần thi" value={postponeExam.lanThi} fullWidth />
              </Grid>
              <Grid item xs={12}>
                <TextField disabled name="lyDo" label="Lý do" value={postponeExam.lyDo} fullWidth />
              </Grid>
              <Grid item xs={12}>
                <TextField disabled name="Trạng thái" label="Trạng thái" value={postponeExam.lanThi} fullWidth />
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
    </Dialog>
  );
};

export default DetailPostpone;
