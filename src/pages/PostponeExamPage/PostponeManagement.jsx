import { useState, useEffect } from 'react';
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
import DetailPostpone from '../../components/Postpone/DetailPostpone';

const PostponeManagement = () => {
  const [postponeExam, setPostponeExam] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState('');
  const [open, setOpen] = useState(null);
  const [showDetail, setShowDetail] = useState(false);
  const [hidden, setHidden] = useState(true);

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

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleOpenDetail = (event, postponeExamId) => {
    setSelected([postponeExamId]);
    setOpen(event.currentTarget);
    setHidden(!hidden);
    setShowDetail(!showDetail);
    handleCloseMenu();
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
      field: 'phanHoi',
      headerName: 'Phản hồi',
      flex: 1,
    },
    {
      field: 'status',
      headerName: 'Kết quả',
    },
    {
      field: 'ghiChu',
      headerName: 'Ghi chú',
      flex: 1,
    },
    {
      field: 'actions',
      type: 'actions',
      flex: 0.7,
      getActions: (params) => [
        <GridActionsCellItem
          icon={<Icon icon="line-md:confirm-circle-twotone" width="1.2rem" height="1.2rem" color="green" />}
          label="Chấp nhận"
          // onClick={duplicateUser(params.id)}
        />,
        <GridActionsCellItem
          icon={<Icon icon="line-md:close-circle-twotone" width="1.2rem" height="1.2rem" color="red" />}
          label="Từ chối"
          // onClick={duplicateUser(params.id)}
        />,
        <GridActionsCellItem
          icon={<Icon icon="line-md:alert-circle-twotone-loop" />}
          label="Chi tiết"
          onClick={(event) => handleOpenDetail(event, params.row.postponeExamId)}
          open={open}
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
      {showDetail && (
        <DetailPostpone
          postponeExamId={selected.length > 0 ? selected[0] : null}
          onClose={handleOpenDetail}
          open={showDetail}
          hidden={hidden}
        />
      )}
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
    </>
  );
};

export default PostponeManagement;
