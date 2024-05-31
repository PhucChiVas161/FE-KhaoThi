import axios from 'axios';
import Cookies from 'js-cookie';
import { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import { alpha, useTheme } from '@mui/material/styles';
import InputAdornment from '@mui/material/InputAdornment';

import { useRouter } from 'src/routes/hooks';

import { bgGradient } from 'src/theme/css';

import Logo from 'src/components/logo';
import Iconify from 'src/components/iconify';
import ForgotPass from 'src/components/User/ForgotPass';

// ----------------------------------------------------------------------

const LOGIN_URL = `${import.meta.env.VITE_API_ENDPOINT}api/Accounts/login`;
const SESSION_TOKEN_KEY = 'token';
export default function LoginView() {
  const theme = useTheme();

  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [accountEmail, setAccountEmail] = useState('');
  const [accountPassword, setAccountPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [openForgot, setOpenForgot] = useState(false);
  const [formLogin, setFormLogin] = useState(true);

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
  });

  const handleLogin = () => {
    // onLogin();
    router.push('/dashboard', { replace: true });
  };

  useEffect(() => {
    const token = Cookies.get(SESSION_TOKEN_KEY);
    if (token) {
      handleLogin(token);
    }
  });

  const handleForgotPassword = () => {
    setOpenForgot(!openForgot);
    setFormLogin(!formLogin);
  };

  const renderForm = (
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
                      <Iconify
                        icon={
                          showPassword ? 'line-md:lightbulb' : 'line-md:lightbulb-off-twotone-loop'
                        }
                      />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              required
            />
          </Stack>

          {errorMessage && <Alert severity="error">{errorMessage}</Alert>}

          <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
            <Link
              variant="subtitle2"
              underline="hover"
              sx={{ cursor: 'pointer' }}
              onClick={handleForgotPassword}
            >
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
            Đăng nhập
          </LoadingButton>
        </form>
      )}
    </div>
  );

  return (
    <Box
      sx={{
        ...bgGradient({
          color: alpha(theme.palette.background.default, 0.9),
          imgUrl: '/assets/background/overlay_4.jpg',
        }),
        height: 1,
      }}
    >
      <Logo
        sx={{
          position: 'fixed',
          top: { xs: 16, md: 24 },
          left: { xs: 16, md: 24 },
        }}
      />

      <Stack alignItems="center" justifyContent="center" sx={{ height: 1 }}>
        <Card
          sx={{
            p: 5,
            width: 1,
            maxWidth: 420,
          }}
        >
          <Typography variant="h4" sx={{ mt: 2, mb: 4 }}>
            Đăng nhập VLU Khảo Thí
          </Typography>

          <Stack direction="row" spacing={2}>
            <Button
              fullWidth
              size="large"
              color="inherit"
              variant="outlined"
              sx={{ borderColor: alpha(theme.palette.grey[500], 0.16) }}
            >
              <Iconify icon="eva:google-fill" color="#DF3E30" />
            </Button>

            <Button
              fullWidth
              size="large"
              color="inherit"
              variant="outlined"
              sx={{ borderColor: alpha(theme.palette.grey[500], 0.16) }}
            >
              <Iconify icon="eva:facebook-fill" color="#1877F2" />
            </Button>

            <Button
              fullWidth
              size="large"
              color="inherit"
              variant="outlined"
              sx={{ borderColor: alpha(theme.palette.grey[500], 0.16) }}
            >
              <Iconify icon="eva:twitter-fill" color="#1C9CEA" />
            </Button>
          </Stack>

          <Divider sx={{ my: 3 }}>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              OR
            </Typography>
          </Divider>

          {renderForm}
        </Card>
      </Stack>
    </Box>
  );
}
