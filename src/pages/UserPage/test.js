import { useState, useEffect } from 'react';
import axios from 'axios';
import { Icon } from '@iconify/react';
import { Box, IconButton, Popover, MenuItem, Button, LinearProgress } from '@mui/material';
import {
  DataGrid,
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarFilterButton,
} from '@mui/x-data-grid';
import Header from '../../components/Header';
import Label from '../../components/label/Label';

const Contacts = () => {
  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(null);
  const [openCreateUserForm, setOpenCreateUserForm] = useState(false);
  const [showUserList, setShowUserList] = useState(true);

  //  API GET User
  useEffect(() => {
    const token = sessionStorage.getItem('token');
    axios
      .get(`${process.env.REACT_APP_API_ENDPOINT}api/Employees`, {
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
  console.log(users);
  const transformedUsers = users.map((user, index) => ({
    ...user,
    id: index + 1,
  }));
  //  Xử lý mở menu
  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  //  Hiển thị cột
  const columns = [
    { field: 'id', headerName: 'STT', flex: 0.5 },
    {
      field: 'employeeName',
      headerName: 'Họ và tên',
      flex: 1,
      cellClassName: 'name-column--cell',
    },
    {
      field: 'accountEmail',
      headerName: 'Email',
      flex: 1,
    },
    {
      field: 'employeeMSSV',
      headerName: 'MSSV',
      flex: 1,
    },
    {
      field: 'employeeGender',
      headerName: 'Giới tính',
      flex: 1,
    },
    {
      field: 'accountRole',
      headerName: 'Vai trò',
      flex: 1,
      renderCell: (params) => (
        <Label
          color={(params.value === 'Manager' && 'info') || (params.value === 'Inprocess' && 'warning') || 'success'}
        >
          {params.value}
        </Label>
      ),
      editable: true,
    },
    {
      field: 'actions',
      headerName: 'Hành động',
      flex: 0.5,
      renderCell: (params) => (
        <IconButton color="inherit" onClick={(event) => handleOpenMenu(event, params.row.employeeId)}>
          <Icon icon={'mdi:dots-vertical'} />
        </IconButton>
      ),
      disableExport: true,
    },
  ];

  const currentTime = new Date().toISOString().replace(/:/g, '-');
  const fileNameasd = `${document.title}_${currentTime}`;

  //  Thêm nút cạnh GridToolBar
  const CustomToolbar = () => (
    <GridToolbarContainer>
      <GridToolbarExport
        csvOptions={{
          fileName: fileNameasd,
          utf8WithBom: true,
        }}
        printOptions={{
          disableToolbarButton: true,
        }}
      />
      <GridToolbarFilterButton />
      <GridToolbarColumnsButton />
      <Button
        startIcon={<Icon icon="line-md:account-add" />}
        onClick={() => {
          setOpenCreateUserForm(!openCreateUserForm);
          setShowUserList(!showUserList);
        }}
      >
        Add User
      </Button>
    </GridToolbarContainer>
  );

  return (
    <Box m="20px">
      <Header title="TEST TABLE MỚI" subtitle="TESTTTTTT" />
      {showUserList && (
        <Box>
          <DataGrid
            slots={{
              toolbar: CustomToolbar,
              loadingOverlay: LinearProgress,
            }}
            rows={transformedUsers}
            columns={columns}
          />
        </Box>
      )}
      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 1,
            width: 140,
            '& .MuiMenuItem-root': {
              px: 1,
              typography: 'body2',
              borderRadius: 0.75,
            },
          },
        }}
      >
        <MenuItem>
          <Icon icon={'eva:edit-fill'} sx={{ mr: 2 }} />
          Edit
        </MenuItem>

        <MenuItem sx={{ color: 'error.main' }}>
          <Icon icon={'eva:trash-2-outline'} sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover>
    </Box>
  );
};

export default Contacts;
