import { useState, useEffect, useMemo } from 'react';
import {
  DataGridPremium,
  useKeepGroupedColumnsHidden,
  useGridApiRef,
  GridActionsCellItem,
} from '@mui/x-data-grid-premium';
import { getPostponeExamAll } from './PostponeExamAPI';
import { Helmet } from 'react-helmet';
import { LinearProgress } from '@mui/material';
import Header from '../../components/Header';
import { Icon } from '@iconify/react';
import { IconButton, MenuItem, Popover } from '@mui/material';

const PostponeManagement = () => {
  const [postponeExam, setPostponeExam] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState('');
  const [open, setOpen] = useState(null);

  useEffect(() => {
    setLoading(true);
    getPostponeExamAll()
      .then((response) => {
        setPostponeExam(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  const transformedPostponeExam = postponeExam.map((postponeExam, index) => ({
    ...postponeExam,
    id: index + 1,
  }));

  const handleOpenMenu = (event, postponeExamId) => {
    setSelected([postponeExamId]);
    setOpen(event.currentTarget);
  };

  const columns = [
    { field: 'id', headerName: 'STT', flex: 0.4 },
    {
      field: 'employeeName',
      headerName: 'Tên',
      flex: 1,
    },
    {
      field: 'postponeExamId',
      headerName: 'Mã đơn',
      flex: 0.9,
    },
    {
      field: 'lopHP',
      headerName: 'Lớp học phần',
      flex: 1.4,
    },
    {
      field: 'maPhongThi',
      headerName: 'Mã phòng thi',
      flex: 1.9,
    },
    {
      field: 'tenHP',
      headerName: 'Tên học phần',
      flex: 1,
    },
    {
      field: 'lanThi',
      headerName: 'Lần thi',
      flex: 1,
    },
    {
      field: 'lyDo',
      headerName: 'Lý do',
      flex: 1,
    },
    {
      field: 'status',
      headerName: 'Trạng thái',
    },
    {
      field: 'phanHoi',
      headerName: 'Phản hồi',
      flex: 1,
    },
    {
      field: 'ghiChu',
      headerName: 'Ghi chú',
      flex: 1,
    },
    {
      field: 'actions',
      type: 'actions',
      flex: 0.5,
      getActions: (params) => [
        <GridActionsCellItem
          icon={<Icon icon="line-md:clipboard-plus-twotone" />}
          label="Toggle Admin"
          onClick={() => console.log(params.row.postponeExamId)}
          showInMenu
        />,
        <GridActionsCellItem
          icon={<Icon icon="line-md:clipboard-plus-twotone" />}
          label="Duplicate User"
          // onClick={duplicateUser(params.id)}
          showInMenu
        />,
      ],
      disableExport: true,
    },
  ];
  const apiRef = useGridApiRef();
  const initialState = useKeepGroupedColumnsHidden({
    apiRef,
    initialState: {
      rowGrouping: {
        model: ['status'],
      },
    },
  });
  return (
    <>
      <Helmet>
        <title>Quản lý HOÃN THI | KHẢO THÍ - VLU</title>
      </Helmet>
      <Header title="Quản lý HOÃN THI" />
      <DataGridPremium
        slots={{
          loadingOverlay: LinearProgress,
        }}
        loading={loading}
        rows={transformedPostponeExam}
        columns={columns}
        getRowHeight={() => 'auto'}
        initialState={initialState}
        apiRef={apiRef}
      />
      <Popover
        open={open}
        anchorEl={open}
        // onClose={handleCloseMenu}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <MenuItem>
          Chi tiết
          <Icon icon="line-md:alert-circle-loop" />
        </MenuItem>
      </Popover>
    </>
  );
};

export default PostponeManagement;
