import { useState, useEffect } from 'react';
import { DataGridPremium } from '@mui/x-data-grid-premium';
import { getPostponeExamAll } from './PostponeExamAPI';
import { Helmet } from 'react-helmet';
import { LinearProgress } from '@mui/material';

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
      field: 'postponeExamCode',
      headerName: 'Mã đơn',
      flex: 1,
    },

    {
      field: 'createAt',
      headerName: 'Ngày tạo',
      flex: 1,
    },
    {
      field: 'actions',
      headerName: 'Hành động',
      flex: 0.5,
      disableExport: true,
    },
  ];

  return (
    <>
      <Helmet>
        <title>Quản lý HOÃN THI | KHẢO THÍ - VLU</title>
      </Helmet>
      <DataGridPremium
        slots={{
          loadingOverlay: LinearProgress,
        }}
        loading={loading}
        rows={transformedPostponeExam}
        columns={columns}
      />
    </>
  );
};

export default PostponeManagement;
