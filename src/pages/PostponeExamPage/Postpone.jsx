import { useState, useEffect } from 'react';
import { DataGridPremium, GridActionsCellItem } from '@mui/x-data-grid-premium';
import { getPostponeExam } from './PostponeExamAPI';
import { Helmet } from 'react-helmet';
import { LinearProgress } from '@mui/material';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import Header from '../../components/Header';

const Postpone = () => {
  const [postponeExam, setPostponeExam] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = Cookies.get('token');
    const decode = jwtDecode(token);
    const employeeId = decode.EmployeeId;
    setLoading(true);
    getPostponeExam(employeeId)
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

  return (
    <>
      <Helmet>
        <title>HOÃN THI | KHẢO THÍ - VLU</title>
      </Helmet>
      <Header title="HOÃN THI" />
      <DataGridPremium
        slots={{
          loadingOverlay: LinearProgress,
        }}
        loading={loading}
        rows={transformedPostponeExam}
        columns={columns}
        getRowHeight={() => 'auto'}
      />
    </>
  );
};

export default Postpone;
