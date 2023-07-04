import { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
// @mui
import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox, Alert } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../../../components/iconify';

// ----------------------------------------------------------------------
const LOGIN_URL = `${process.env.REACT_APP_API_ENDPOINT}api/Accounts/login`;
const SESSION_TOKEN_KEY = 'token';
const SESSION_CSRT_KEY = 'csrf';
export default function LoginForm({ onLogin }) {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [accountEmail, setAccountEmail] = useState('');
  const [accountPassword, setAccountPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  // ----------------------------------------------------------------------
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        LOGIN_URL,
        { accountEmail, accountPassword },
        {
          withCredentials: true,
        }
      );
      if (response.data.message === 'Email hoặc mật khẩu không đúng') {
        setErrorMessage('Email hoặc mật khẩu không đúng. Vui lòng thử lại 😥');
      } else {
        console.log(Cookies.get(SESSION_TOKEN_KEY));
        handleLogin();
      }
    } catch (error) {
      setErrorMessage('Đã có lỗi xảy ra, vui lòng thử lại 😥');
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = Cookies.get(SESSION_TOKEN_KEY);
    if (token) {
      handleLogin();
    }
  }, []);

  const handleLogin = () => {
    onLogin();
    navigate('/dashboard', { replace: true });
  };

  useEffect(() => {
    const token = Cookies.get(SESSION_TOKEN_KEY);
    if (token) {
      handleLogin(token);
    }
  }, []);

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={3}>
        <TextField
          type="email"
          label="Email VLU"
          value={accountEmail}
          autoComplete="email"
          onChange={(e) => {
            setAccountEmail(e.target.value);
            setErrorMessage('');
          }}
          required
        />

        <TextField
          name="password"
          label="Ngày tháng năm sinh (01012001)"
          type={showPassword ? 'text' : 'password'}
          value={accountPassword}
          autoComplete="current-password"
          onChange={(e) => {
            setAccountPassword(e.target.value);
            setErrorMessage('');
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
          required
        />
      </Stack>

      {errorMessage && <Alert severity="error">{errorMessage}</Alert>}

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
        <Link variant="subtitle2" underline="hover">
          Forgot password?
        </Link>
      </Stack>

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        disabled={!accountEmail || !accountPassword || loading} // disable button if loading is true
        loading={loading} // show loading icon if loading is true
      >
        Login
      </LoadingButton>
    </form>
  );
}
