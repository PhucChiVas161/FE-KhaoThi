import { useState } from 'react';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import { useHandleErrors } from '../../hooks/useHandleErrors';
// @mui
import { Stack, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components

// ----------------------------------------------------------------------
const FORGOT_URL = `${
  import.meta.env.VITE_API_ENDPOINT
}Accounts/forgot/password`;
export default function ForgotPass({ onClose }) {
  const [accountEmail, setAccountEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const handleErrors = useHandleErrors();
  // ----------------------------------------------------------------------
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(FORGOT_URL, { accountEmail });
      if (response.data.isValid === true) {
        enqueueSnackbar('Gửi email thành công, Vui lòng kiểm tra!', {
          variant: 'success',
        });
      } else if (response.data.isValid === false) {
        handleErrors(response.data.errors);
      }
    } catch (error) {
      enqueueSnackbar('Đã có lỗi xảy ra, vui lòng thử lại 😥');
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const closeForgot = () => {
    onClose();
  };

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
          }}
          required
        />
      </Stack>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ my: 2, '& > :not(:first-of-type)': { ml: 1 } }}
      >
        <LoadingButton
          fullWidth
          size="large"
          variant="contained"
          onClick={closeForgot}
          sx={{ bgcolor: 'error.main', color: 'white' }}
        >
          Đóng
        </LoadingButton>
        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          disabled={!accountEmail || loading}
          loading={loading}
        >
          Quên mật khẩu
        </LoadingButton>
      </Stack>
    </form>
  );
}
