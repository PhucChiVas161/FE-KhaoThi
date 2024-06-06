import { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

import { jwtDecode } from 'jwt-decode';
import { Helmet } from 'react-helmet-async';
import { Container, Typography } from '@mui/material';

// ----------------------------------------------------------------------

export default function WelcomePage() {
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

      <Container maxWidth="xl" className="w-full h-full bg-gradient-to-r from-cyan-500 to-blue-500">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Xin chào, {users.employeeName} 👋👋👋
        </Typography>
      </Container>
    </>
  );
}
