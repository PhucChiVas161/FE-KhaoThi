import { Helmet } from 'react-helmet-async';
// @mui
import { styled } from '@mui/material/styles';
import { Container, Typography, Divider, Stack, Button } from '@mui/material';
// hooks
import useResponsive from '../hooks/useResponsive';
// components
import Logo from '../components/logo';
import Iconify from '../components/iconify';
// sections
import { LoginForm } from '../sections/auth/login';

// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

const StyledSection = styled('div')(({ theme }) => ({
  width: '100%',
  maxWidth: 480,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  boxShadow: theme.customShadows.card,
  backgroundColor: theme.palette.background.default,
}));

const StyledContent = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function LoginPage({ onLogin }) {
  const mdUp = useResponsive('up', 'md');
  const LOGIN_URL_GOOGLE = `${
    import.meta.env.VITE_API_ENDPOINT
  }accounts/signin-google`;
  const LOGIN_URL_FACEBOOK = `${
    import.meta.env.VITE_API_ENDPOINT
  }accounts/signin-facebook`;
  const LOGIN_URL_MICROSOFT = `${
    import.meta.env.VITE_API_ENDPOINT
  }accounts/signin-microsoft`;
  const handleSubmitGoogle = () => {
    window.location.href = LOGIN_URL_GOOGLE;
  };
  const handleSubmitFacebook = () => {
    window.location.href = LOGIN_URL_FACEBOOK;
  };
  const handleSubmitMicrosoft = () => {
    window.location.href = LOGIN_URL_MICROSOFT;
  };
  return (
    <>
      <Helmet>
        <title> Login | VLU Khảo Thí </title>
      </Helmet>

      <StyledRoot>
        <Logo
          sx={{
            position: 'fixed',
            top: { xs: 16, sm: 24, md: 40 },
            left: { xs: 16, sm: 24, md: 40 },
          }}
        />

        {mdUp && (
          <StyledSection>
            <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
              Hãy đăng nhập để tiếp tục!
            </Typography>
            <img
              src="/assets/illustrations/illustration_login.png"
              alt="login"
            />
          </StyledSection>
        )}

        <Container maxWidth="sm">
          <StyledContent>
            <Typography variant="h4" gutterBottom>
              Đăng nhập
            </Typography>

            <Typography variant="body2" sx={{ mb: 5 }}>
              VLU Khảo Thí {''}
              {/* <Link variant="subtitle2">Get started</Link> */}
            </Typography>

            {/* Đăng nhập bằng các bên thứ 3 */}
            <Stack direction="row" spacing={2}>
              <Button
                fullWidth
                size="large"
                color="inherit"
                variant="outlined"
                onClick={handleSubmitGoogle}
              >
                <Iconify
                  icon="eva:google-fill"
                  color="#DF3E30"
                  width={22}
                  height={22}
                />
              </Button>

              <Button
                fullWidth
                size="large"
                color="inherit"
                variant="outlined"
                onClick={handleSubmitFacebook}
              >
                <Iconify
                  icon="line-md:facebook"
                  color="#1877F2"
                  width={22}
                  height={22}
                />
              </Button>

              <Button
                fullWidth
                size="large"
                color="inherit"
                variant="outlined"
                onClick={handleSubmitMicrosoft}
              >
                <Iconify
                  icon="logos:microsoft-icon"
                  color="#1C9CEA"
                  width={22}
                  height={22}
                />
              </Button>
            </Stack>

            <Divider sx={{ my: 3 }}>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                HOẶC
              </Typography>
            </Divider>

            <LoginForm onLogin={onLogin} />
          </StyledContent>
        </Container>
      </StyledRoot>
    </>
  );
}
