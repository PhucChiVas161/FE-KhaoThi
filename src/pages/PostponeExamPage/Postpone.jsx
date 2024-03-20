import { useState, useEffect } from 'react';
import { DataGridPremium, GridToolbarContainer } from '@mui/x-data-grid-premium';
import { getPostponeExam } from './PostponeExamAPI';
import { Helmet } from 'react-helmet';
import { LinearProgress, Button } from '@mui/material';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import Header from '../../components/Header';
import { Icon } from '@iconify/react';
import CreatePostpone from '../../components/Postpone/CreatePostpone';

const Postpone = () => {
  const [postponeExam, setPostponeExam] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openCreatePostpone, setOpenCreatePostpone] = useState(false);

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
  //Add nút gửi hoãn thi
  const CustomToolbar = () => (
    <GridToolbarContainer>
      <Button
        startIcon={<Icon icon="line-md:clipboard-plus-twotone" />}
        onClick={() => {
          setOpenCreatePostpone(!openCreatePostpone);
        }}
      >
        Gửi hoãn thi
      </Button>
    </GridToolbarContainer>
  );
  //Đóng form
  const handleCloseCreatePostpone = () => {
    setOpenCreatePostpone(false);
  };
  //Add data in table when success
  const createPostpone = (createPostpone) => {
    setPostponeExam((prevPostpone) => [...prevPostpone, createPostpone]);
  };
  return (
    <>
      <Helmet>
        <title>HOÃN THI | KHẢO THÍ - VLU</title>
      </Helmet>
      <Header title="HOÃN THI" />
      {openCreatePostpone && (
        <CreatePostpone createPostpone={createPostpone} onClose={handleCloseCreatePostpone} open={openCreatePostpone} />
      )}
      <DataGridPremium
        slots={{
          toolbar: CustomToolbar,
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
