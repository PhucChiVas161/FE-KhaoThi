import { useState, useEffect } from 'react';
import axios from 'axios';
import {
  TextField,
  Button,
  Typography,
  Stack,
  Card,
  CardContent,
  CardActions,
  Paper,
} from '@mui/material';
import { Icon } from '@iconify/react';
import { useSnackbar } from 'notistack';
import { useHandleErrors } from '../../hooks/useHandleErrors';

export default function ForgotChangePassword() {
  const [newPass, setNewPass] = useState('');
  const [isLengthValid, setIsLengthValid] = useState(false);
  const [isUpperCaseValid, setIsUpperCaseValid] = useState(false);
  const [isDigitValid, setIsDigitValid] = useState(false);
  const [isSpecialCharValid, setIsSpecialCharValid] = useState(false);
  const [newPassConfirm, setNewPassConfirm] = useState('');
  const [isMatch, setIsMatch] = useState(false);

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
    const token = window.location.pathname.split('/')[3];
    if (
      !(isLengthValid && isUpperCaseValid && isDigitValid && isSpecialCharValid)
    ) {
      enqueueSnackbar('Mật khẩu không hợp lệ. Vui lòng kiểm tra lại.', 'error');
      return;
    }
    axios
      .post(
        `${import.meta.env.VITE_API_ENDPOINT}Accounts/change/forgot/password`,
        {
          accountNewPassword: newPass,
          jwtToken: token,
        }
      )
      .then((response) => {
        console.log(response);
        if (response.data.isValid === true) {
          alert('Đổi mật khẩu thành công');
          window.location.href = '/login';
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
      });
  };

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
      }}
    >
      <Paper
        elevation={5}
        className="MuiPaper-root MuiPaper-rounded"
        style={{ maxWidth: 500, borderRadius: '30%' }}
      >
        <Card>
          <h1
            style={{
              display: 'flex',
              justifyContent: 'center',
              marginTop: '8px',
            }}
          >
            Đổi mật khẩu
          </h1>
          <CardContent>
            <TextField
              margin="dense"
              label="Mật khẩu mới"
              type="password"
              fullWidth
              value={newPass}
              onChange={(e) => setNewPass(e.target.value)}
            />
            <Stack spacing={1}>
              <Typography
                display="flex"
                alignItems="center"
                color={isLengthValid ? 'success' : 'error'}
              >
                {isLengthValid && (
                  <Icon
                    icon="line-md:clipboard-check"
                    color={isLengthValid ? 'green' : 'red'}
                  />
                )}{' '}
                Có ít nhất 8 ký tự
              </Typography>
              <Typography
                display="flex"
                alignItems="center"
                color={isUpperCaseValid ? 'success' : 'error'}
              >
                {isUpperCaseValid && (
                  <Icon
                    icon="line-md:clipboard-check"
                    color={isUpperCaseValid ? 'green' : 'red'}
                  />
                )}{' '}
                Có ít nhất mộtký tự viết hoa
              </Typography>
              <Typography
                display="flex"
                alignItems="center"
                color={isDigitValid ? 'success' : 'error'}
              >
                {isDigitValid && (
                  <Icon
                    icon="line-md:clipboard-check"
                    color={isDigitValid ? 'green' : 'red'}
                  />
                )}{' '}
                Có ít nhất một chữ số
              </Typography>
              <Typography
                display="flex"
                alignItems="center"
                color={isSpecialCharValid ? 'success' : 'error'}
              >
                {isSpecialCharValid && (
                  <Icon
                    icon="line-md:clipboard-check"
                    color={isSpecialCharValid ? 'green' : 'red'}
                  />
                )}{' '}
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
              <Typography
                display="flex"
                alignItems="center"
                color={isMatch ? 'success' : 'error'}
              >
                {isMatch && (
                  <Icon
                    icon="line-md:clipboard-check"
                    color={isMatch ? 'green' : 'red'}
                  />
                )}{' '}
                Mật khẩu xác nhận trùng với mật khẩu mới
              </Typography>
            </Stack>
          </CardContent>
          <CardActions>
            <Stack direction="row" justifyContent="center" width="100%">
              <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={handlePasswordChange}
                disabled={
                  !isLengthValid ||
                  !isUpperCaseValid ||
                  !isDigitValid ||
                  !isSpecialCharValid ||
                  !isMatch
                }
              >
                Đổi mật khẩu
              </Button>
            </Stack>
          </CardActions>
        </Card>
      </Paper>
    </div>
  );
}
