import { Helmet } from 'react-helmet-async';
import { filter } from 'lodash';
import { useState, useEffect } from 'react';
import axios from 'axios';
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
} from '@mui/material';
import CreateUserForm from '../components/adduser/CreateUserForm';
import Iconify from '../components/iconify';
import Scrollbar from '../components/scrollbar';
import { UserListHead, UserListToolbar } from '../sections/@dashboard/user';

const TABLE_HEAD = [
  { id: 'employeeName', label: 'Name', alignRight: false },
  { id: 'accountEmail', label: 'Email', alignRight: false },
  { id: 'employeeMSSV', label: 'MSSV', alignRight: false },
  { id: 'accountRole', label: 'Role', alignRight: false },
  { id: 'employeeGender', label: 'Gender', alignRight: false },
  { id: '' },
];

function descendingComparator(a, b, orderBy) {
  return b[orderBy].localeCompare(a[orderBy]);
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

export default function UserPage() {
  const [open, setOpen] = useState(null);
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('employeeName');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [users, setUsers] = useState([]);
  const [deleteConfirmation, setDeleteConfirmation] = useState(null);
  const [openCreateUserForm, setOpenCreateUserForm] = useState(false);

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
      const newSelecteds = users.map((n) => n.employeeId);
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

  const deleteUser = (employeeId) => {
    const token = sessionStorage.getItem('token');
    axios
      .delete(`${process.env.REACT_APP_API_ENDPOINT}api/Employees/${employeeId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log('User deleted successfully');
        console.log(response);
        setUsers((prevUsers) => prevUsers.filter((user) => user.employeeId !== employeeId));
        setSelected((prevSelected) => prevSelected.filter((id) => id !== employeeId));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDeleteUser = () => {
    if (selected.length > 0) {
      handleShowConfirmation(selected[0]);
    }
    handleCloseMenu();
  };
  const handleShowConfirmation = (employeeId) => {
    setDeleteConfirmation(employeeId);
  };

  const handleConfirmDelete = () => {
    deleteUser(deleteConfirmation);
    setDeleteConfirmation(null);
  };

  const handleCancelDelete = () => {
    setDeleteConfirmation(null);
  };

  const emptyRows = Math.max(0, rowsPerPage - Math.min(rowsPerPage, users.length - page * rowsPerPage));
  const filteredUsers = applySortFilter(users, getComparator(order, orderBy), filterName);
  const isNotFound = !filteredUsers.length && !!filterName;

  return (
    <>
      <Helmet>
        <title>User | KHẢO THÍ - VLU</title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            USER
          </Typography>
          <Button
            variant="contained"
            startIcon={<Iconify icon="eva:plus-fill" />}
            onClick={() => setOpenCreateUserForm(true)}
          >
            New User
          </Button>
          {openCreateUserForm && <CreateUserForm onClose={() => setOpenCreateUserForm(false)} />}
        </Stack>

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
                    const {
                      employeeId,
                      employeeName,
                      accountEmail,
                      accountRole,
                      avatarUrl,
                      employeeMSSV,
                      employeeGender,
                    } = row;
                    const selectedUser = selected.indexOf(employeeId) !== -1;
                    const defaultAvatarUrl = `/assets/images/avatars/avatar_${index + 1}.jpg`;

                    return (
                      <TableRow hover key={employeeId} tabIndex={-1} role="checkbox" selected={selectedUser}>
                        <TableCell padding="checkbox">
                          <Checkbox checked={selectedUser} onChange={(event) => handleClick(event, employeeId)} />
                        </TableCell>

                        <TableCell component="th" scope="row" padding="none">
                          <Stack direction="row" alignItems="center" spacing={2}>
                            <Avatar alt={employeeName} src={avatarUrl || defaultAvatarUrl} />
                            <Typography variant="subtitle2" noWrap>
                              {employeeName}
                            </Typography>
                          </Stack>
                        </TableCell>

                        <TableCell align="left">{accountEmail}</TableCell>

                        <TableCell align="left">{employeeMSSV}</TableCell>

                        <TableCell align="left">{accountRole}</TableCell>

                        <TableCell align="left">{employeeGender}</TableCell>

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
        <MenuItem>
          <Iconify icon={'eva:edit-fill'} sx={{ mr: 2 }} />
          Edit
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
            <DialogContentText>Are you sure you want to delete this user?</DialogContentText>
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
