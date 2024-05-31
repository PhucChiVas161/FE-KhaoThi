import { Icon } from '@iconify/react';
import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';

import { LinearProgress } from '@mui/material';
import {
  GridToolbar,
  useGridApiRef,
  DataGridPremium,
  GridActionsCellItem,
  useKeepGroupedColumnsHidden,
} from '@mui/x-data-grid-premium';

import Header from '../../components/Header';
import { getPostponeExamAll } from './PostponeExamAPI';
import DetailPostpone from '../../components/Postpone/DetailPostpone';

const PostponeManagement = () => {
  const [postponeExam, setPostponeExam] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState('');
  const [open, setOpen] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [hidden, setHidden] = useState(true);
  const [shouldRefresh, setShouldRefresh] = useState(false);

  useEffect(() => {
    fetchPostponeData();
  }, []);

  useEffect(() => {
    if (shouldRefresh) {
      fetchPostponeData();
      setShouldRefresh(false);
    }
  }, [shouldRefresh]);

  const fetchPostponeData = () => {
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
  };

  const handleRefresh = () => {
    setShouldRefresh(true);
  };

  const transformedPostponeExam = postponeExam.map((index) => ({
    ...postponeExam,
    id: index + 1,
  }));

  const handleOpenDetail = (event, postponeExamId) => {
    setSelected([postponeExamId]);
    setOpen(!open);
    setHidden(!hidden);
    setShowDetail(!showDetail);
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
      flex: 0.1,
      getActions: (params) => [
        <GridActionsCellItem
          icon={<Icon icon="line-md:alert-circle-twotone-loop" />}
          label="Chi tiết"
          onClick={(event) => handleOpenDetail(event, params.row.postponeExamId)}
          open={open}
          showInMenu
        />,
      ],
      // disableExport: true,
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
        <title>QUẢN LÝ HOÃN THI | KHẢO THÍ - VLU</title>
      </Helmet>
      <Header title="QUẢN LÝ HOÃN THI" />
      <div style={{ height: 650, width: '100%' }}>
        <DataGridPremium
          emptyRowsWhenPaging
          slots={{
            loadingOverlay: LinearProgress,
            toolbar: GridToolbar,
          }}
          loading={loading}
          rows={transformedPostponeExam}
          columns={columns}
          getRowHeight={() => 'auto'}
          initialState={initialState}
          apiRef={apiRef}
        />
      </div>
      {showDetail && (
        <DetailPostpone
          postponeExamId={selected.length > 0 ? selected[0] : null}
          onClose={handleOpenDetail}
          onSuccess={handleRefresh}
          open={showDetail}
          hidden={hidden}
        />
      )}
    </>
  );
};

export default PostponeManagement;
