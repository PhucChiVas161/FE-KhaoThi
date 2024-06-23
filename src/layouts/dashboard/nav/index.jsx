import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getOneUsers } from '../../../pages/UserPage/UserPageAPI';
import { jwtDecode } from 'jwt-decode';
import Cookies from 'js-cookie';
// @mui
import { styled, alpha } from '@mui/material/styles';
import { Box, Link, Drawer, Typography, Avatar } from '@mui/material';
import { Icon } from '@iconify/react';
// hooks
import useResponsive from '../../../hooks/useResponsive';
// components
import Scrollbar from '../../../components/scrollbar';
import NavSection from '../../../components/nav-section';
//
import navConfig from './config';

// ----------------------------------------------------------------------

const NAV_WIDTH = 255;

const StyledAccount = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2, 2.5),
  borderRadius: Number(theme.shape.borderRadius) * 1.5,
  backgroundColor: alpha(theme.palette.grey[500], 0.12),
}));

// ----------------------------------------------------------------------

Nav.propTypes = {
  openNav: PropTypes.bool,
  onCloseNav: PropTypes.func,
};

export default function Nav({ openNav, onCloseNav }) {
  const { pathname } = useLocation();

  const isDesktop = useResponsive('up', 'lg');
  const [users, setUsers] = useState('');
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const token = Cookies.get('token');
    const decode = jwtDecode(token);
    getOneUsers(decode.EmployeeId)
      .then((response) => {
        setUsers(response.data);
        setUserRole(response.data.accountRole);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    if (openNav) {
      onCloseNav();
    }
  }, [pathname]);

  const renderContent = (
    <Scrollbar
      sx={{
        height: 1,
        '& .simplebar-content': {
          height: 1,
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#FAFBFC',
        },
      }}
    >
      <Box sx={{ my: 5, mx: 2.5 }}>
        <Link underline="none">
          <StyledAccount>
            <Avatar>
              <Icon icon="line-md:github-loop" width="30" height="30" />
            </Avatar>

            <Box sx={{ ml: 2 }}>
              <Typography variant="subtitle2" sx={{ color: 'text.primary' }}>
                {users.employeeName}
              </Typography>

              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {users.employeeMSSV}
              </Typography>

              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {users.accountRole}
              </Typography>
            </Box>
          </StyledAccount>
        </Link>
      </Box>
      {/* Sinh viên */}
      <Box sx={{ ml: 4 }}>
        <Typography
          variant="subtitle2"
          sx={{ color: 'text.primary' }}
          hidden={userRole !== 'Student' && userRole !== 'Dev'}
        >
          SINH VIÊN
        </Typography>
      </Box>
      <NavSection
        data={navConfig.find((section) => section.title === 'Student').items}
        hidden={userRole !== 'Student' && userRole !== 'Dev'}
      />
      {/* Quản lý */}
      <Box sx={{ ml: 4 }}>
        <Typography
          variant="subtitle2"
          sx={{ color: 'text.primary' }}
          hidden={userRole !== 'Manager' && userRole !== 'Dev'}
        >
          QUẢN LÝ
        </Typography>
      </Box>
      <NavSection
        data={navConfig.find((section) => section.title === 'Manager').items}
        hidden={userRole !== 'Manager' && userRole !== 'Dev'}
      />
      {/* Giảng viên */}
      <Box sx={{ ml: 4 }}>
        <Typography
          variant="subtitle2"
          sx={{ color: 'text.primary' }}
          hidden={userRole !== 'Lecturer' && userRole !== 'Dev'}
        >
          Giảng viên
        </Typography>
      </Box>
      <NavSection
        data={navConfig.find((section) => section.title === 'Lecturer').items}
        hidden={userRole !== 'Lecturer' && userRole !== 'Dev'}
      />

      <Box sx={{ flexGrow: 1 }} />
    </Scrollbar>
  );

  return (
    <Box
      component="nav"
      sx={{
        flexShrink: { lg: 0 },
        width: { lg: NAV_WIDTH },
      }}
    >
      {isDesktop ? (
        <Drawer
          open
          variant="permanent"
          PaperProps={{
            sx: {
              width: NAV_WIDTH,
              bgcolor: 'background.default',
              borderRightStyle: 'dashed',
            },
          }}
        >
          {renderContent}
        </Drawer>
      ) : (
        <Drawer
          open={openNav}
          onClose={onCloseNav}
          ModalProps={{
            keepMounted: true,
          }}
          PaperProps={{
            sx: { width: NAV_WIDTH },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </Box>
  );
}
