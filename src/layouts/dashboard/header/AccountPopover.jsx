import { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import ChangePasswordDialog from './ChangePasswordDialog';
import ProfileDialog from './ProfileDialog';
// @mui
import { alpha } from '@mui/material/styles';
import { Box, Divider, Typography, Stack, MenuItem, Avatar, IconButton, Popover } from '@mui/material';
import { Icon } from '@iconify/react';

// ----------------------------------------------------------------------

const MENU_OPTIONS = [
  {
    label: 'Đổi mật khẩu',
    icon: 'solar:lock-password-bold',
  },
  {
    label: 'Xem thông tin',
    icon: 'eva:person-fill',
  },
  {
    label: 'Settings',
    icon: 'eva:settings-2-fill',
  },
];

// ----------------------------------------------------------------------

export default function AccountPopover() {
  const [open, setOpen] = useState(null);
  const [users, setUsers] = useState('');
  const [changePassDialog, setChangePassDialog] = useState(false);
  const [profileDialog, setProfileDialog] = useState(false);

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const handleChangePasswordClick = () => {
    setChangePassDialog(true);
  };

  const handleProfileDialogClick = () => {
    setProfileDialog(true);
  };

  const handleDialogClose = () => {
    setChangePassDialog(false);
    setProfileDialog(false);
  };

  useEffect(() => {
    const token = Cookies.get('token');
    const decode = jwtDecode(token);
    axios
      .get(`${import.meta.env.VITE_API_ENDPOINT}api/Employees/${decode.EmployeeId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleLogout = () => {
    Cookies.remove('token');
    sessionStorage.clear();
    window.location.href = '/';
  };

  return (
    <>
      <IconButton
        onClick={handleOpen}
        sx={{
          p: 0,
          ...(open && {
            '&:before': {
              zIndex: 1,
              content: "''",
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              position: 'absolute',
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.8),
            },
          }),
        }}
      >
        <Avatar>
          <Icon icon="line-md:github-loop" width="30" height="30" />
        </Avatar>
      </IconButton>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 0,
            mt: 1.5,
            ml: 0.75,
            width: 180,
            '& .MuiMenuItem-root': {
              typography: 'body2',
              borderRadius: 0.75,
            },
          },
        }}
      >
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant="subtitle2" noWrap>
            {users.employeeName}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            {users.accountEmail}
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Stack sx={{ p: 1 }}>
          {MENU_OPTIONS.map((option) => (
            <MenuItem
              key={option.label}
              onClick={
                option.label === 'Đổi mật khẩu'
                  ? handleChangePasswordClick
                  : option.label === 'Xem thông tin'
                  ? handleProfileDialogClick
                  : handleClose
              }
            >
              {option.label}
            </MenuItem>
          ))}
        </Stack>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <MenuItem onClick={handleLogout} sx={{ m: 1 }}>
          Logout
        </MenuItem>
      </Popover>
      <ChangePasswordDialog open={changePassDialog} onClose={handleDialogClose} />
      <ProfileDialog open={profileDialog} onClose={handleDialogClose} />
    </>
  );
}
