import { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
// @mui
import { Link, Stack, IconButton, InputAdornment, TextField, Alert } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../../../components/iconify';
import ForgotPass from '../../../components/User/ForgotPass';

// ----------------------------------------------------------------------
const LOGIN_URL = `${import.meta.env.VITE_API_ENDPOINT}api/Accounts/login`;
const SESSION_TOKEN_KEY = 'token';
export default function LoginForm({ onLogin }) {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [accountEmail, setAccountEmail] = useState('');
  const [accountPassword, setAccountPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [openForgot, setOpenForgot] = useState(false);
  const [formLogin, setFormLogin] = useState(true);
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
      console.log(response);
      if (response.status === 200) {
        handleLogin();
      }
    } catch (error) {
      if (error.response.status === 401) {
        setErrorMessage('Sai tên đăng nhập hoặc mật khẩu 😥');
      } else {
        setErrorMessage('Đã có lỗi xảy ra, vui lòng thử lại 😥');
      }
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

  const handleForgotPassword = () => {
    setOpenForgot(!openForgot);
    setFormLogin(!formLogin);
  };

  return (
    <div>
      {openForgot && <ForgotPass onClose={handleForgotPassword} />}
      {formLogin && (
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
                      <Iconify icon={showPassword ? 'line-md:lightbulb' : 'line-md:lightbulb-off-twotone-loop'} />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              required
            />
          </Stack>

          {errorMessage && <Alert severity="error">{errorMessage}</Alert>}

          <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
            <Link variant="subtitle2" underline="hover" sx={{ cursor: 'pointer' }} onClick={handleForgotPassword}>
              Quên mật khẩu?
            </Link>
          </Stack>

          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            disabled={!accountEmail || !accountPassword || loading}
            loading={loading}
          >
            Login
          </LoadingButton>
        </form>
      )}
    </div>
  );
}
