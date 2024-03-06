import { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { getPostponeExam } from './PostponeExamAPI';
import { Helmet } from 'react-helmet';
import { Box, LinearProgress } from '@mui/material';

const PostponeExam = () => {
  const [postponeExam, setPostponeExam] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getPostponeExam()
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

      <Box>
        <DataGrid
          slots={{
            loadingOverlay: LinearProgress,
          }}
          loading={loading}
          rows={transformedPostponeExam}
          columns={columns}
        />
      </Box>
    </>
  );
};

export default PostponeExam;
