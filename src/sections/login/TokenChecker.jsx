import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import { useState, useEffect } from 'react';

import { Alert, Snackbar, AlertTitle } from '@mui/material';

const TokenChecker = () => {
  const [showAlert, setShowAlert] = useState(false);
  const [tokenExp, setTokenExp] = useState(null);

  const TOKEN_KEY = 'token';

  const checkTokenExp = () => {
    const token = Cookies.get(TOKEN_KEY);
    if (token) {
      const decodedToken = jwtDecode(token);
      setTokenExp(decodedToken.exp);
    }
  };

  useEffect(() => {
    checkTokenExp();
  }, []);

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (tokenExp) {
      const currentTime = Date.now() / 1000;
      const timeUntilExpiry = tokenExp - currentTime;

      if (timeUntilExpiry < 120) {
        setShowAlert(true);
      }

      const timer = setTimeout(() => {
        const token = Cookies.get(TOKEN_KEY);
        if (token) {
          const decodedToken = jwtDecode(token);
          if (decodedToken.exp <= currentTime) {
            window.location.reload();
          }
        }
      }, timeUntilExpiry * 1000);

      return () => clearTimeout(timer);
    }
  }, [tokenExp]);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setShowAlert(false);
  };

  return (
    <Snackbar
      open={showAlert}
      autoHideDuration={null}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    >
      <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
        <AlertTitle>Cảnh báo</AlertTitle>
        Phiên làm việc của bạn <strong>chỉ còn 2 phút</strong>.
      </Alert>
    </Snackbar>
  );
};

export default TokenChecker;
