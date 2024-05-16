import { useState, useEffect } from 'react';
import { detailReCheck, updateReCheck } from '../../pages/ReCheck/ReCheckAPI';
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
} from '@mui/material';
import { useSnackbar } from 'notistack';
import { useHandleErrors } from '../../hooks/useHandleErrors';

const DetailReCheck = ({ reCheckId, onClose, open, hidden, updateReCheckRefresh }) => {
  const [reCheck, setReCheck] = useState({});
  // const [status, setStatus] = useState(null);
  const [formData, setFormData] = useState({
    reCheckId: reCheckId,
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
    updateReCheck(formData)
      .then((response) => {
        if (response.status === 200) {
          enqueueSnackbar('Cập nhật phúc khảo thành công', { variant: 'success' });
          updateReCheckRefresh(formData);
          onClose();
        }
      })
      .catch((error) => {
        if (error.response.status === 400) {
          handleErrors(error.response.data.errors);
        }
        enqueueSnackbar('Cập nhật phúc khảo thất bại!', { variant: 'error' });
      });
  };

  useEffect(() => {
    detailReCheck(reCheckId)
      .then((response) => {
        setReCheck(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [reCheckId]);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md">
      <DialogTitle>CHI TIẾT PHÚC KHẢO</DialogTitle>
      <FormControl onSubmit={handleSubmit}>
        <DialogContent>
          <Card>
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField disabled name="Họ và tên" label="Họ và tên" value={reCheck.employeeName} fullWidth />
                </Grid>
                <Grid item xs={6}>
                  <TextField disabled name="Email" label="Email" value={reCheck.accountEmail} fullWidth />
                </Grid>
                <Grid item xs={6}>
                  <TextField disabled name="Lớp học phần" label="Lớp học phần" value={reCheck.lopHP} fullWidth />
                </Grid>
                <Grid item xs={6}>
                  <TextField disabled name="Mã phòng thi" label="Mã phòng thi" value={reCheck.maPhongThi} fullWidth />
                </Grid>
                <Grid item xs={6}>
                  <TextField disabled name="Tên học phần" label="Tên học phần" value={reCheck.tenHP} fullWidth />
                </Grid>
                <Grid item xs={3}>
                  <TextField disabled name="Lần thi" label="Lần thi" value={reCheck.lanThi} fullWidth />
                </Grid>
                <Grid item xs={3}>
                  <TextField disabled name="reCheckId" label="Mã đơn" value={reCheck.reCheckId} fullWidth />
                </Grid>
                <Grid item xs={12}>
                  <TextField disabled name="lyDo" label="Lý do" value={reCheck.lyDo} fullWidth />
                </Grid>
                <Grid item xs={4}>
                  <FormControl disabled={hidden} fullWidth>
                    <InputLabel id="status-label">Trạng thái</InputLabel>
                    <Select
                      labelId="status-label"
                      id="status"
                      name="status"
                      label="Trạng thái"
                      value={reCheck.status || ''}
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
                    name="phanHoi"
                    label="Phản hồi"
                    value={reCheck.phanHoi}
                    fullWidth
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    disabled={hidden}
                    multiline
                    name="ghiChu"
                    label="Ghi chú"
                    value={reCheck.ghiChu}
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
              <Button variant="contained" color="warning" type="submit" hidden={hidden}>
                Từ chối
              </Button>
              <Button variant="contained" color="success" type="submit" hidden={hidden}>
                Chấp nhận
              </Button>
            </div>
          </DialogActions>
        </DialogContent>
      </FormControl>
    </Dialog>
  );
};

export default DetailReCheck;
