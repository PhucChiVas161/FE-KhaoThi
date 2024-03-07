import { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import {
  IconButton,
  Popover,
  MenuItem,
  Button,
  LinearProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Typography,
  Link,
} from '@mui/material';
import {
  DataGrid,
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarFilterButton,
} from '@mui/x-data-grid';
import { Helmet } from 'react-helmet';
import { useSnackbar } from 'notistack';
import Header from '../../components/Header';
import Label from '../../components/label/Label';
import CreateUser from '../../components/User/CreateUser';
import EditUser from '../../components/User/EditUser';
import { getUsers, deleteUsers, importUsers } from './UserPageAPI';

const UserPage = () => {
  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(null);
  const [openCreateUserForm, setOpenCreateUserForm] = useState(false);
  const [showUserList, setShowUserList] = useState(true);
  const [deleteConfirmation, setDeleteConfirmation] = useState(null);
  const [selected, setSelected] = useState('');
  const [showEditForm, setShowEditForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showErrorDetails, setShowErrorDetails] = useState(false);
  const [errorDetails, setErrorDetails] = useState([]);
  const { enqueueSnackbar } = useSnackbar();

  //  API GET User
  useEffect(() => {
    setLoading(true);
    getUsers()
      .then((response) => {
        setUsers(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  const transformedUsers = users.map((user, index) => ({
    ...user,
    id: index + 1,
  }));

  const getGenderLabel = (employeeGender) => {
    return employeeGender === '0' ? 'Nữ' : employeeGender === '1' ? 'Nam' : '';
  };

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
      valueGetter: (params) => getGenderLabel(params.value),
    },

    {
      field: 'accountRole',
      headerName: 'Vai trò',
      flex: 1,
      renderCell: (params) => (
        <Label
          color={(params.value === 'Manager' && 'error') || (params.value === 'Lecturer' && 'warning') || 'success'}
        >
          {params.value}
        </Label>
      ),
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

  const currentTime = new Date()
    .toLocaleString('vn-VN', {
      timeZone: 'Asia/Ho_Chi_Minh',
    })
    .replace(/,|:|\//g, '-');
  const nameFile = `${document.title}_${currentTime}`;

  //  Thêm nút cạnh GridToolBar
  const CustomToolbar = () => (
    <GridToolbarContainer>
      <GridToolbarExport
        csvOptions={{
          fileName: nameFile,
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
        }}
      >
        Add User
      </Button>
      <Button
        startIcon={<Icon icon="line-md:upload-outline-loop" />}
        component="label"
        onChange={handleFileChange}
        disabled={loading}
      >
        Import User from Excel
        <input id="fileInput" type="file" hidden accept=".xlsx" />
      </Button>
      <Typography>
        Mẫu File (
        <Link href="https://localhost:3000" underline="none" target="_blank" rel="noopener">
          tại đây
        </Link>
        )
      </Typography>
    </GridToolbarContainer>
  );

  //  Delete User
  const deleteUser = (row) => {
    deleteUsers(row)
      .then(() => {
        enqueueSnackbar('Xoá người dùng thành công!', {
          variant: 'success',
        });
        setUsers((prevUsers) => prevUsers.filter((user) => user.employeeId !== row));
        setSelected((prevSelected) => prevSelected.filter((id) => id !== row));
      })
      .catch((error) => {
        console.log(error);
        enqueueSnackbar('Xoá người dùng thất bại!', {
          variant: 'error',
        });
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

  //  Thêm ng dùng vào danh sách nếu thêm thành công bên client
  const addUser = (newUser) => {
    setUsers((prevUsers) => [...prevUsers, newUser]);
  };

  const updateUser = (updatedUser) => {
    setUsers((prevUsers) => prevUsers.map((user) => (user.employeeId === updatedUser.employeeId ? updatedUser : user)));
  };

  //  Đóng form thêm ng dùng
  const handleCloseAddUser = () => {
    setOpenCreateUserForm(false);
    setShowUserList(true);
  };

  //  Mở form Edit ng dùng
  const handleOpenEdit = () => {
    setShowEditForm(true);
    handleCloseMenu();
  };

  //  Đóng from Edit ng dùng
  const handleCloseEdit = () => {
    setShowEditForm(false);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    setLoading(true);
    formData.append('file', file);
    importUsers(formData)
      .then((response) => {
        if (response.data.isValid === true) {
          enqueueSnackbar(`Thêm thành công ${response.data.success} người dùng`, {
            variant: 'success',
          });
          if (response.data.all === false) {
            enqueueSnackbar(`Thêm thất bại ${response.data.fail} người dùng`, {
              variant: 'error',
              action: (
                <Button color="inherit" size="small" onClick={() => handleShowErrorDetails(response.data.data)}>
                  Xem chi tiết
                </Button>
              ),
            });
          }
        } else if (response.data.isValid === false) {
          enqueueSnackbar('Thêm người dùng hàng loạt thất bại!', {
            variant: 'error',
          });
        }
      })
      .catch((error) => {
        console.log(error);
        enqueueSnackbar('Thêm người dùng hàng loạt thất bại!', {
          variant: 'error',
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleShowErrorDetails = (errors) => {
    setErrorDetails(errors);
    setShowErrorDetails(true);
  };

  const handleCloseErrorDetails = () => {
    setShowErrorDetails(false);
  };

  return (
    <>
      <Helmet>
        <title>Quản lý NGƯỜI DÙNG | KHẢO THÍ - VLU</title>
      </Helmet>
      {/* <Box m="20px"> */}
      <Header title="Quản lý NGƯỜI DÙNG" />
      {openCreateUserForm && <CreateUser addUser={addUser} onClose={handleCloseAddUser} open={openCreateUserForm} />}
      {showEditForm && (
        <EditUser
          employeeId={selected.length > 0 ? selected[0] : null}
          onClose={handleCloseEdit}
          onSuccess={updateUser}
        />
      )}
      {showUserList && (
        <DataGrid
          emptyRowsWhenPaging
          slots={{
            toolbar: CustomToolbar,
            loadingOverlay: LinearProgress,
          }}
          loading={loading}
          rows={transformedUsers}
          columns={columns}
        />
      )}
      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
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
      {/* </Box> */}
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
      <Dialog open={showErrorDetails} onClose={handleCloseErrorDetails}>
        <DialogTitle>Chi tiết lỗi</DialogTitle>
        <DialogContent>
          {errorDetails.map((error, index) => (
            <DialogContentText key={index}>
              Lỗi tại vị trí {error.location}: {error.errors.map((e) => e.name).join(', ')}
            </DialogContentText>
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseErrorDetails} color="primary">
            Đóng
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default UserPage;
