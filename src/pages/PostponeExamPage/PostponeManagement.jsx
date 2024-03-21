import { useState, useEffect } from 'react';
import { DataGridPremium, useKeepGroupedColumnsHidden, useGridApiRef } from '@mui/x-data-grid-premium';
import { getPostponeExamAll } from './PostponeExamAPI';
import { Helmet } from 'react-helmet';
import { LinearProgress } from '@mui/material';
import Header from '../../components/Header';

const PostponeManagement = () => {
  const [postponeExam, setPostponeExam] = useState([]);
  const [loading, setLoading] = useState(false);

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

  const columns = [
    { field: 'id', headerName: 'STT', flex: 0.5 },
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
      field: 'postponeExamId',
      headerName: 'Mã đơn',
      flex: 1,
    },
    {
      field: 'status',
      headerName: 'Trạng thái',
      flex: 1,
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
      headerName: 'Hành động',
      disableExport: true,
      flex: 0.5,
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
    </>
  );
};

export default PostponeManagement;
