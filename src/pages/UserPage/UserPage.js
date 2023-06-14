import { useState, useEffect } from 'react';
import axios from 'axios';
import { Icon } from '@iconify/react';
import {
  Box,
  IconButton,
  Popover,
  MenuItem,
  Button,
  LinearProgress,
  Snackbar,
  SnackbarContent,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@mui/material';
import {
  DataGrid,
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarFilterButton,
} from '@mui/x-data-grid';
import { Helmet } from 'react-helmet';
import Header from '../../components/Header';
import Label from '../../components/label/Label';
import CreateUserForm from '../../components/User/CreateUserForm';
import EditUserForm from '../../components/User/EditUserForm';

const UserPage = () => {
  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(null);
  const [openCreateUserForm, setOpenCreateUserForm] = useState(false);
  const [showUserList, setShowUserList] = useState(true);
  const [deleteConfirmation, setDeleteConfirmation] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [selected, setSelected] = useState('');
  const [showEditForm, setShowEditForm] = useState(false);

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
  const handleOpenMenu = (event, employeeId) => {
    setSelected([employeeId]);
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

  //  Delete User
  const deleteUser = (row) => {
    const token = sessionStorage.getItem('token');
    axios
      .delete(`${process.env.REACT_APP_API_ENDPOINT}api/Employees/${row}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log('User deleted successfully');
        console.log(response);
        setSuccessMessage('Xoá người dùng thành công!');
        setTimeout(() => {
          setSuccessMessage('');
        }, 3000); // Thời gian đóng thông báo (3 giây)
        setUsers((prevUsers) => prevUsers.filter((user) => user.employeeId !== row));
        setSelected((prevSelected) => prevSelected.filter((id) => id !== row));
      })
      .catch((error) => {
        console.log(error);
        setErrorMessage('Xoá người dùng thất bại!');
        setTimeout(() => {
          setErrorMessage('');
        }, 3000); // Thời gian đóng thông báo (3 giây)
      });
  };

  const handleDeleteUser = () => {
    handleShowConfirmation(selected[0]);
    handleCloseMenu();
  };
  const handleShowConfirmation = (row) => {
    console.log(row);
    setDeleteConfirmation(row);
  };

  const handleConfirmDelete = () => {
    deleteUser(deleteConfirmation);
    setDeleteConfirmation(null);
  };

  const handleCancelDelete = () => {
    setDeleteConfirmation(null);
  };

  //  Thêm ng dùng vào danh sách nếu thêm thành trong bên client
  const addUser = (newUser) => {
    setUsers((prevUsers) => [...prevUsers, newUser]);
  };

  //  Đóng form thêm ng dùng
  const handleCloseAddUser = () => {
    setOpenCreateUserForm(false);
    setShowUserList(true);
  };

  //  Mở form Edit ng dùng
  const handleOpenEdit = () => {
    setShowEditForm(true);
    setShowUserList(false);
    handleCloseMenu();
  };

  //  Đóng from Edit ng dùng
  const handleCloseEdit = () => {
    setShowEditForm(false);
    setShowUserList(true);
  };

  return (
    <>
      <Helmet>
        <title>Quản lý NGƯỜI DÙNG | KHẢO THÍ - VLU</title>
      </Helmet>
      <Snackbar
        open={!!successMessage}
        autoHideDuration={3000}
        onClose={() => setSuccessMessage('')}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <SnackbarContent
          sx={{ backgroundColor: '#43a047', color: 'white' }}
          message={successMessage}
          action={
            <Button color="inherit" size="small" onClick={() => setSuccessMessage('')}>
              Đóng
            </Button>
          }
        />
      </Snackbar>
      <Snackbar
        open={!!errorMessage}
        autoHideDuration={3000}
        onClose={() => setErrorMessage('')}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <SnackbarContent
          sx={{ backgroundColor: '#f44336', color: 'white' }}
          message={errorMessage}
          action={
            <Button color="inherit" size="small" onClick={() => setErrorMessage('')}>
              Đóng
            </Button>
          }
        />
      </Snackbar>
      <Box m="20px">
        <Header title="TEST TABLE MỚI" subtitle="TESTTTTTT" />
        {openCreateUserForm && <CreateUserForm addUser={addUser} onClose={handleCloseAddUser} />}
        {showEditForm && (
          <EditUserForm employeeId={selected.length > 0 ? selected[0] : null} onClose={handleCloseEdit} />
        )}
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
          <MenuItem onClick={handleOpenEdit}>
            <Icon icon="line-md:edit-twotone" width="20" height="20" sx={{ mr: 2 }} />
            Chỉnh sửa
          </MenuItem>

          <MenuItem sx={{ color: 'error.main' }} onClick={handleDeleteUser}>
            <Icon icon="line-md:account-delete" width="20" height="20" sx={{ mr: 2 }} />
            Xoá
          </MenuItem>
        </Popover>
      </Box>
      {deleteConfirmation && (
        <Dialog open={Boolean(deleteConfirmation)} onClose={handleCancelDelete}>
          <DialogTitle>Confirm Delete</DialogTitle>
          <DialogContent>
            <DialogContentText>Bạn có chắc xoá người dùng này không ?</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCancelDelete}>No</Button>
            <Button onClick={handleConfirmDelete} autoFocus>
              Yes
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
};

export default UserPage;
