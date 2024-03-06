import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, Typography, Stack } from '@mui/material';
import { Icon } from '@iconify/react';
import { useSnackbar } from 'notistack';
import { useHandleErrors } from '../../../hooks/useHandleErrors';

export default function ChangePasswordDialog({ open, onClose }) {
  const [oldPass, setOldPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [isLengthValid, setIsLengthValid] = useState(false);
  const [isUpperCaseValid, setIsUpperCaseValid] = useState(false);
  const [isDigitValid, setIsDigitValid] = useState(false);
  const [isSpecialCharValid, setIsSpecialCharValid] = useState(false);
  const [newPassConfirm, setNewPassConfirm] = useState('');
  const [isMatch, setIsMatch] = useState(false);
  const [countDown, setCountDown] = useState(3);
  const countRef = useRef(null);

  const { enqueueSnackbar } = useSnackbar();
  const handleErrors = useHandleErrors();

  useEffect(() => {
    setIsLengthValid(newPass.length >= 8);
    setIsUpperCaseValid(/[A-Z]/.test(newPass));
    setIsDigitValid(/\d/.test(newPass));
    setIsSpecialCharValid(/[!@#$%^&*]/.test(newPass));
  }, [newPass]);

  useEffect(() => {
    setIsMatch(newPass === newPassConfirm);
  }, [newPass, newPassConfirm]);

  const handlePasswordChange = () => {
    const token = Cookies.get('token');
    const csrf = Cookies.get('csrf');
    if (!(isLengthValid && isUpperCaseValid && isDigitValid && isSpecialCharValid)) {
      enqueueSnackbar('Mật khẩu không hợp lệ. Vui lòng kiểm tra lại.', 'error');
      return;
    }
    axios
      .post(
        `${import.meta.env.VITE_API_ENDPOINT}api/Accounts/change/password`,
        {
          accountOldPassword: oldPass,
          accountPassword: newPass,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'X-CSRF-TOKEN': csrf,
          },
          withCredentials: true,
        }
      )
      .then((response) => {
        if (response.data.idValid === true) {
          onClose();
          enqueueSnackbar('Đổi mật khẩu thành công. Sẽ đăng xuất trong vòng ' + countDown + 's', {
            variant: 'success',
            autoHideDuration: 3000,
          });
          countRef.current = setInterval(() => {
            setCountDown((count) => {
              if (count - 1 >= 0) {
                enqueueSnackbar('Đổi mật khẩu thành công. Sẽ đăng xuất trong vòng ' + (count - 1) + 's', {
                  variant: 'success',
                  autoHideDuration: 3000,
                });
                return count - 1;
              } else {
                clearInterval(countRef.current);
                handleLogout();
              }
            });
          }, 1000);
        } else if (response.data.isValid === false) {
          handleErrors(response.data.errors);
        }
      })
      .catch((error) => {
        console.error(error);
        enqueueSnackbar('Đổi mật khẩu thất bại!', {
          variant: 'error',
          autoHideDuration: 3000,
        });
        onClose();
      });
  };

  useEffect(() => {
    if (countDown === 0) {
      clearInterval(countRef.current);
      handleLogout();
    }
  }, [countDown]);

  const handleLogout = () => {
    Cookies.remove('token');
    Cookies.remove('csrf');
    window.location.href = '/login';
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Đổi mật khẩu</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Mật khẩu cũ"
          type="password"
          fullWidth
          value={oldPass}
          onChange={(e) => setOldPass(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Mật khẩu mới"
          type="password"
          fullWidth
          value={newPass}
          onChange={(e) => setNewPass(e.target.value)}
        />
        <Stack spacing={1}>
          <Typography display="flex" alignItems="center" color={isLengthValid ? 'success' : 'error'}>
            {isLengthValid && <Icon icon="line-md:clipboard-check" color={isLengthValid ? 'green' : 'red'} />} Có ít
            nhất 8 ký tự
          </Typography>
          <Typography display="flex" alignItems="center" color={isUpperCaseValid ? 'success' : 'error'}>
            {isUpperCaseValid && <Icon icon="line-md:clipboard-check" color={isUpperCaseValid ? 'green' : 'red'} />} Có
            ít nhất một ký tự viết hoa
          </Typography>
          <Typography display="flex" alignItems="center" color={isDigitValid ? 'success' : 'error'}>
            {isDigitValid && <Icon icon="line-md:clipboard-check" color={isDigitValid ? 'green' : 'red'} />} Có ít nhất
            một ký tự số
          </Typography>
          <Typography display="flex" alignItems="center" color={isSpecialCharValid ? 'success' : 'error'}>
            {isSpecialCharValid && <Icon icon="line-md:clipboard-check" color={isSpecialCharValid ? 'green' : 'red'} />}{' '}
            Có ít nhất một ký tự đặc biệt (!@#$%^&*)
          </Typography>
        </Stack>
        <TextField
          margin="dense"
          label="Xác nhận mật khẩu mới"
          type="password"
          fullWidth
          value={newPassConfirm}
          onChange={(e) => setNewPassConfirm(e.target.value)}
        />
        <Stack>
          <Typography display="flex" alignItems="center" color={isMatch ? 'success' : 'error'}>
            {isMatch && <Icon icon="line-md:clipboard-check" color={isMatch ? 'green' : 'red'} />} Mật khẩu xác nhận
            trùng với mật khẩu mới
          </Typography>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" color="error" onClick={onClose}>
          Hủy
        </Button>
        <Button
          variant="contained"
          onClick={handlePasswordChange}
          disabled={!isLengthValid || !isUpperCaseValid || !isDigitValid || !isSpecialCharValid || !isMatch}
        >
          Xác nhận
        </Button>
      </DialogActions>
    </Dialog>
  );
}
