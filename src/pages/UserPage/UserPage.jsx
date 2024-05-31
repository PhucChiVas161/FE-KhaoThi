import { Icon } from '@iconify/react';
import { Helmet } from 'react-helmet-async';
import { useSnackbar } from 'notistack';
import { useState, useEffect } from 'react';

import {
  Link,
  Button,
  Dialog,
  Typography,
  DialogTitle,
  DialogContent,
  DialogActions,
  LinearProgress,
  DialogContentText,
} from '@mui/material';
import {
  DataGridPremium,
  GridToolbarExport,
  GridActionsCellItem,
  GridToolbarContainer,
  GridToolbarFilterButton,
  GridToolbarColumnsButton,
} from '@mui/x-data-grid-premium';

import Header from '../../components/Header';
import Label from '../../components/label/label';
import EditUser from '../../components/User/EditUser';
import CreateUser from '../../components/User/CreateUser';
import { getUsers, deleteUsers, importUsers } from './UserPageAPI';

const UserPage = () => {
  const [users, setUsers] = useState([]);
  const [openCreateUserForm, setOpenCreateUserForm] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState(null);
  const [selected, setSelected] = useState(null);
  const [showEditForm, setShowEditForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showErrorDetails, setShowErrorDetails] = useState(false);
  const [errorDetails, setErrorDetails] = useState([]);
  const [shouldRefresh, setShouldRefresh] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    if (shouldRefresh) {
      fetchUsers();
      setShouldRefresh(false);
    }
  }, [shouldRefresh]);

  const fetchUsers = () => {
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
  };

  const handleRefresh = () => {
    setShouldRefresh(true);
  };

  const transformedUsers = users.map((user, index) => ({
    ...user,
    id: index + 1,
  }));

  //  Thêm nút cạnh GridToolBar
  const CustomToolbar = () => (
    <GridToolbarContainer>
      <GridToolbarExport />
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
  const deleteUser = (employeeId) => {
    deleteUsers(employeeId)
      .then(() => {
        enqueueSnackbar('Xoá người dùng thành công!', {
          variant: 'success',
        });
        handleRefresh();
      })
      .catch((error) => {
        console.log(error);
        enqueueSnackbar('Xoá người dùng thất bại!', {
          variant: 'error',
        });
      });
  };

  const handleDeleteUser = (event, employeeId) => {
    setDeleteConfirmation(employeeId);
  };

  const handleConfirmDelete = () => {
    deleteUser(deleteConfirmation);
    setDeleteConfirmation(null);
  };

  const handleCancelDelete = () => {
    setDeleteConfirmation(null);
  };

  //  Đóng form thêm ng dùng
  const handleCloseAddUser = () => {
    setOpenCreateUserForm(false);
  };

  //  Mở form Edit ng dùng
  const handleOpenEdit = (event, employeeId) => {
    setSelected(employeeId);
    setShowEditForm(true);
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
          handleRefresh();
          if (response.data.all === false) {
            enqueueSnackbar(`Thêm thất bại ${response.data.fail} người dùng`, {
              variant: 'error',
              action: (
                <Button
                  color="inherit"
                  size="small"
                  onClick={() => handleShowErrorDetails(response.data.data)}
                >
                  Xem chi tiết
                </Button>
              ),
            });
            handleRefresh();
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

  //  Hiển thị cột
  const columns = [
    { field: 'id', headerName: 'STT', flex: 0.2 },
    {
      field: 'employeeName',
      headerName: 'Họ và tên',
      flex: 0.8,
      cellClassName: 'name-column--cell',
    },
    {
      field: 'accountEmail',
      headerName: 'Email',
      flex: 0.8,
    },
    {
      field: 'employeeMSSV',
      headerName: 'MSSV',
      flex: 0.5,
    },
    {
      field: 'accountRole',
      headerName: 'Vai trò',
      flex: 0.3,
      renderCell: (params) => (
        <Label
          color={
            (params.value === 'Manager' && 'error') ||
            (params.value === 'Lecturer' && 'warning') ||
            'success'
          }
        >
          {params.value}
        </Label>
      ),
    },
    {
      field: 'actions',
      type: 'actions',
      flex: 0.1,
      getActions: (params) => [
        <GridActionsCellItem
          icon={<Icon icon="line-md:edit-twotone" />}
          label="Chỉnh sửa"
          onClick={(event) => {
            handleOpenEdit(event, params.row.employeeId);
          }}
          open={open}
          showInMenu
        />,
        <GridActionsCellItem
          icon={<Icon icon="line-md:account-delete" />}
          label="Xoá người dùng"
          onClick={(event) => handleDeleteUser(event, params.row.employeeId)}
          open={open}
          showInMenu
        />,
      ],
    },
  ];

  return (
    <>
      <Helmet>
        <title>QUẢN LÝ NGƯỜI DÙNG | KHẢO THÍ - VLU</title>
      </Helmet>
      <Header title="QUẢN LÝ NGƯỜI DÙNG" />
      {openCreateUserForm && (
        <CreateUser
          onSuccess={handleRefresh}
          onClose={handleCloseAddUser}
          open={openCreateUserForm}
        />
      )}
      {showEditForm && (
        <EditUser employeeId={selected} onClose={handleCloseEdit} onSuccess={handleRefresh} />
      )}
      <div style={{ height: 670, width: '100%' }}>
        <DataGridPremium
          emptyRowsWhenPaging
          slots={{
            toolbar: CustomToolbar,
            loadingOverlay: LinearProgress,
          }}
          loading={loading}
          rows={transformedUsers}
          columns={columns}
        />
      </div>
      <Dialog open={deleteConfirmation} onClose={handleCancelDelete}>
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
