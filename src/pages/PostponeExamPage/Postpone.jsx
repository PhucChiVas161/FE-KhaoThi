import { useState, useEffect } from 'react';
import { DataGridPremium, GridToolbarContainer, GridActionsCellItem } from '@mui/x-data-grid-premium';
import { getPostponeExam } from './PostponeExamAPI';
import { Helmet } from 'react-helmet';
import { LinearProgress, Button } from '@mui/material';
import Cookies from 'js-cookie';
import moment from 'moment';
import { jwtDecode } from 'jwt-decode';
import Header from '../../components/Header';
import { Icon } from '@iconify/react';
import CreatePostpone from '../../components/Postpone/CreatePostpone';
import DetailPostpone from '../../components/Postpone/DetailPostpone';
const Postpone = () => {
  const [postponeExam, setPostponeExam] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openCreatePostpone, setOpenCreatePostpone] = useState(false);
  const [selected, setSelected] = useState('');
  const [open, setOpen] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [hidden, setHidden] = useState(false);

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

  const handleOpenDetail = (event, postponeExamId) => {
    setSelected([postponeExamId]);
    setOpen(!open);
    setShowDetail(!showDetail);
    setHidden(!hidden);
  };

  const columns = [
    { field: 'id', headerName: 'STT', flex: 0.5 },
    {
      field: 'tenHP',
      headerName: 'Tên học phần',
      flex: 1,
    },
    {
      field: 'postponeExamId',
      headerName: 'Mã đơn',
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
      flex: 1,
    },
    {
      field: 'ghiChu',
      headerName: 'Ghi chú',
      flex: 1,
    },
    {
      field: 'updateAt',
      headerName: 'Cập nhật vào',
      flex: 1,
      renderCell: (params) => {
        const date = params.value;
        if (date === '0001-01-01T00:00:00') {
          return 'Chưa có';
        }
        return moment(date).format('DD-MM-YYYY HH:mm:ss');
      },
    },
    {
      field: 'actions',
      type: 'actions',
      width: 80,
      getActions: (params) => [
        <GridActionsCellItem
          icon={<Icon icon="line-md:alert-circle-twotone-loop" width="24" height="24" />}
          label="Chi tiết"
          onClick={(event) => handleOpenDetail(event, params.row.postponeExamId)}
          open={open}
          showInMenu
        />,
      ],
      disableExport: true,
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
