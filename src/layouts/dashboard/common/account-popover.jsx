import axios from 'axios';
import Cookies from 'js-cookie';
import { Icon } from '@iconify/react';
import { jwtDecode } from 'jwt-decode';
import { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import Popover from '@mui/material/Popover';
import { alpha } from '@mui/material/styles';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import ProfileDialog from './ProfileDialog';
import ChangePasswordDialog from './ChangePasswordDialog';

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
          width: 40,
          height: 40,
          background: (theme) => alpha(theme.palette.grey[500], 0.08),
          ...(open && {
            background: (theme) =>
              `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`,
          }),
        }}
      >
        <Avatar>
          <Icon icon="line-md:github-loop" width="30" height="30" />
        </Avatar>
      </IconButton>

      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 0,
            mt: 1,
            ml: 0.75,
            width: 200,
          },
        }}
      >
        <Box sx={{ my: 1.5, px: 2 }}>
          <Typography variant="subtitle2" noWrap>
            {users.employeeName}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            {users.employeeMSSV}
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />

        {MENU_OPTIONS.map((option) => (
          <MenuItem
            key={option.label}
            onClick={() => {
              if (option.label === 'Đổi mật khẩu') {
                handleChangePasswordClick();
              } else if (option.label === 'Xem thông tin') {
                handleProfileDialogClick();
              } else {
                handleClose();
              }
            }}
          >
            {option.label}
          </MenuItem>
        ))}

        <Divider sx={{ borderStyle: 'dashed', m: 0 }} />

        <MenuItem
          disableRipple
          disableTouchRipple
          onClick={handleLogout}
          sx={{ typography: 'body2', color: 'error.main', py: 1.5 }}
        >
          Logout
        </MenuItem>
      </Popover>
      <ChangePasswordDialog open={changePassDialog} onClose={handleDialogClose} />
      <ProfileDialog open={profileDialog} onClose={handleDialogClose} />
    </>
  );
}
