import { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

import { jwtDecode } from 'jwt-decode';
import { Helmet } from 'react-helmet-async';
import { faker } from '@faker-js/faker';
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography } from '@mui/material';
// components
import Iconify from '../components/iconify';
// sections
import {
  AppTasks,
  AppNewsUpdate,
  AppOrderTimeline,
  AppCurrentVisits,
  AppWebsiteVisits,
  AppTrafficBySite,
  AppWidgetSummary,
  AppCurrentSubject,
  AppConversionRates,
} from '../sections/@dashboard/app';

// ----------------------------------------------------------------------

export default function DashboardAppPage() {
  const theme = useTheme();
  const [users, setUsers] = useState([]);
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

  return (
    <>
      <Helmet>
        <title> Dashboard | Minimal UI </title>
      </Helmet>

      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Xin chào, {users.employeeName} 👋👋👋
        </Typography>
      </Container>
    </>
  );
}
