import { Helmet } from 'react-helmet-async';
import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import {
  Card,
  Table,
  Stack,
  Paper,
  Avatar,
  Button,
  Popover,
  Checkbox,
  TableRow,
  MenuItem,
  TableBody,
  TableCell,
  Container,
  Typography,
  IconButton,
  TableContainer,
  TablePagination,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Snackbar,
  SnackbarContent,
  TextField,
} from '@mui/material';
import jwtDecode from 'jwt-decode';
import Label from '../components/label';
import Iconify from '../components/iconify';
import Scrollbar from '../components/scrollbar';
import { UserListHead, UserListToolbar } from '../sections/@dashboard/user';
import ShowForm from '../components/PhucKhao/EditPhucKhao';
import AddPhucKhao from '../components/PhucKhao/AddPhucKhao';

const TABLE_HEAD = [
  { id: 'tenHocPhan', label: 'Tên học phần', alignRight: false },
  { id: 'phucKhaoId', label: 'Mã đơn', alignRight: false },
  { id: 'status', label: 'Trạng thái', alignRight: false },
  { id: 'updateAt', label: 'Ngày nhận', alignRight: false },
  { id: 'phanHoi', label: 'Phản hồi', alignRight: false },
  { id: 'ghiChu', label: 'Ghi chú', alignRight: false },
  { id: '' },
];

function descendingComparator(a, b, orderBy) {
  if (!a[orderBy] || !b[orderBy]) {
    return 0;
  }
  if (typeof b[orderBy] === 'string') {
    return b[orderBy].localeCompare(a[orderBy]);
  }
  return b[orderBy] - a[orderBy];
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_user) => _user.employeeName.toLowerCase().includes(query.toLowerCase()));
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function PhucKhao() {
  const [open, setOpen] = useState(null);
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('employeeName');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [users, setUsers] = useState([]);
  const [deleteConfirmation, setDeleteConfirmation] = useState(null);
  const [showUserList, setShowUserList] = useState(true);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showEditForm, setShowEditForm] = useState(false);
  const [openCreateUserForm, setOpenCreateUserForm] = useState(false);

  useEffect(() => {
    const token = Cookies.get('token');
    const decode = jwtDecode(token);
    axios
      .get(`${import.meta.env.VITE_API_ENDPOINT}api/PhucKhao/${decode.EmployeeId}`, {
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

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = users.map((n) => n.phucKhaoId);
      setSelected(newSelecteds);
    } else {
      setSelected([]);
    }
  };

  const handleClick = (event, employeeName) => {
    const selectedIndex = selected.indexOf(employeeName);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = [...selected, employeeName];
    } else if (selectedIndex === 0) {
      newSelected = selected.slice(1);
    } else if (selectedIndex === selected.length - 1) {
      newSelected = selected.slice(0, -1);
    } else if (selectedIndex > 0) {
      newSelected = selected.slice(0, selectedIndex).concat(selected.slice(selectedIndex + 1));
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const addUser = (newUser) => {
    setUsers((prevUsers) => [...prevUsers, newUser]);
  };

  const deleteUser = (phucKhaoId) => {
    const token = Cookies.get('token');
    axios
      .delete(`${import.meta.env.VITE_API_ENDPOINT}api/PhucKhao/${phucKhaoId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log('User deleted successfully');
        console.log(response);
        setSuccessMessage('Xoá đơn phúc khảo thành công!');
        setTimeout(() => {
          setSuccessMessage('');
        }, 3000); // Thời gian đóng thông báo (3 giây)
        setUsers((prevUsers) => prevUsers.filter((user) => user.phucKhaoId !== phucKhaoId));
        setSelected((prevSelected) => prevSelected.filter((id) => id !== phucKhaoId));
      })
      .catch((error) => {
        console.log(error);
        setErrorMessage('Xoá đơn phúc khảo thất bại!');
        setTimeout(() => {
          setErrorMessage('');
        }, 3000); // Thời gian đóng thông báo (3 giây)
      });
  };

  const handleDeleteUser = () => {
    if (selected.length > 0) {
      handleShowConfirmation(selected[0]);
    }
    handleCloseMenu();
  };
  const handleShowConfirmation = (phucKhaoId) => {
    setDeleteConfirmation(phucKhaoId);
  };

  const handleConfirmDelete = () => {
    deleteUser(deleteConfirmation);
    setDeleteConfirmation(null);
  };

  const handleCancelDelete = () => {
    setDeleteConfirmation(null);
  };

  const handleOpenEdit = () => {
    setShowEditForm(true);
    setShowUserList(false);
    handleCloseMenu();
  };
  const handleCloseEdit = () => {
    setShowEditForm(false);
    setShowUserList(true);
  };

  const emptyRows = Math.max(0, rowsPerPage - Math.min(rowsPerPage, users.length - page * rowsPerPage));
  const filteredUsers = applySortFilter(users, getComparator(order, orderBy), filterName);
  const isNotFound = !filteredUsers.length && !!filterName;

  return (
    <>
      <Helmet>
        <title>PHÚC KHẢO | KHẢO THÍ - VLU</title>
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

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Phúc Khảo
          </Typography>
          <Button
            variant="contained"
            startIcon={<Iconify icon="line-md:document-add" />}
            onClick={() => {
              setOpenCreateUserForm(!openCreateUserForm);
              setShowUserList(!showUserList);
            }}
          >
            Gửi Phúc Khảo
          </Button>
        </Stack>
        {openCreateUserForm && <AddPhucKhao addUser={addUser} />}
        {showEditForm && <ShowForm id={selected.length > 0 ? selected[0] : null} onClose={handleCloseEdit} />}

        {showUserList && (
          <Card>
            <UserListToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} />
            <Scrollbar>
              <TableContainer sx={{ minWidth: 800 }}>
                <Table>
                  <UserListHead
                    order={order}
                    orderBy={orderBy}
                    headLabel={TABLE_HEAD}
                    rowCount={users.length}
                    numSelected={selected.length}
                    onRequestSort={handleRequestSort}
                    onSelectAllClick={handleSelectAllClick}
                  />
                  <TableBody>
                    {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
                      const { phucKhaoId, status, updateAt, tenHP, phanHoi, ghiChu } = row;
                      const dateTime = new Date(updateAt);
                      const formattedDateTime = dateTime.toLocaleString();
                      const selectedUser = selected.indexOf(phucKhaoId) !== -1;
                      const defaultAvatarUrl = `/assets/images/avatars/avatar_${index + 1}.jpg`;
                      console.log(typeof phucKhaoId);

                      return (
                        <TableRow hover key={phucKhaoId} tabIndex={-1} role="checkbox" selected={selectedUser}>
                          <TableCell padding="checkbox">
                            <Checkbox checked={selectedUser} onChange={(event) => handleClick(event, phucKhaoId)} />
                          </TableCell>

                          <TableCell align="left">{tenHP}</TableCell>

                          <TableCell align="left">{phucKhaoId}</TableCell>

                          <TableCell align="left">
                            <Label
                              color={
                                (status === 'Received' && 'info') || (status === 'Inprocess' && 'warning') || 'success'
                              }
                            >
                              {sentenceCase(status)}
                            </Label>
                          </TableCell>

                          <TableCell align="left">{formattedDateTime}</TableCell>

                          <TableCell align="left">
                            <TextField
                              InputProps={{
                                readOnly: true,
                              }}
                              multiline
                              value={phanHoi}
                              fullWidth
                            />
                          </TableCell>

                          <TableCell align="left">
                            <TextField
                              InputProps={{
                                readOnly: true,
                              }}
                              multiline
                              value={ghiChu}
                              fullWidth
                            />
                          </TableCell>

                          <TableCell align="right">
                            <IconButton size="large" color="inherit" onClick={handleOpenMenu}>
                              <Iconify icon={'eva:more-vertical-fill'} />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                    {emptyRows > 0 && (
                      <TableRow style={{ height: 53 * emptyRows }}>
                        <TableCell colSpan={6} />
                      </TableRow>
                    )}
                  </TableBody>

                  {isNotFound && (
                    <TableBody>
                      <TableRow>
                        <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                          <Paper sx={{ textAlign: 'center' }}>
                            <Typography variant="h6" paragraph>
                              Not found
                            </Typography>

                            <Typography variant="body2">
                              No results found for &nbsp;
                              <strong>&quot;{filterName}&quot;</strong>.
                              <br /> Try checking for typos or using complete words.
                            </Typography>
                          </Paper>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  )}
                </Table>
              </TableContainer>
            </Scrollbar>

            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={users.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Card>
        )}
      </Container>

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
        <MenuItem sx={{ color: 'info.main' }} onClick={handleOpenEdit}>
          <Iconify icon={'eva:info-outline'} sx={{ mr: 2 }} />
          Chi tiết
        </MenuItem>

        <MenuItem sx={{ color: 'error.main' }} onClick={handleDeleteUser}>
          <Iconify icon={'eva:trash-2-outline'} sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover>
      {deleteConfirmation && (
        <Dialog open={Boolean(deleteConfirmation)} onClose={handleCancelDelete}>
          <DialogTitle>Confirm Delete</DialogTitle>
          <DialogContent>
            <DialogContentText>Bạn có chắc xoá đơn phúc khảo này không ???</DialogContentText>
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
}
