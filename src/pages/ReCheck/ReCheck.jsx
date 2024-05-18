import { useState, useEffect } from 'react';
import { DataGridPremium, GridToolbarContainer, GridActionsCellItem } from '@mui/x-data-grid-premium';
import { getReCheckByEmployeeId } from './ReCheckAPI';
import { Helmet } from 'react-helmet';
import { LinearProgress, Button } from '@mui/material';
import Cookies from 'js-cookie';
import moment from 'moment';
import { jwtDecode } from 'jwt-decode';
import Header from '../../components/Header';
import { Icon } from '@iconify/react';
import DetailReCheck from '../../components/ReCheck/DetailReCheck';
import CreateReCheck from '../../components/ReCheck/CreateReCheck';
const ReCheck = () => {
  const [reCheck, setRecheck] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openCreateReCheck, setOpenCreateReCheck] = useState(false);
  const [selected, setSelected] = useState('');
  const [open, setOpen] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const token = Cookies.get('token');
    const decode = jwtDecode(token);
    const employeeId = decode.EmployeeId;
    setLoading(true);
    getReCheckByEmployeeId(employeeId)
      .then((response) => {
        setRecheck(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);
  const transformedReCheck = reCheck.map((reCheck, index) => ({
    ...reCheck,
    id: index + 1,
  }));

  const handleOpenDetail = (event, reCheckId) => {
    setSelected([reCheckId]);
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
      field: 'reCheckId',
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
      field: 'ghiChu',
      headerName: 'Ghi chú',
      flex: 1,
    },
    {
      field: 'actions',
      type: 'actions',
      width: 80,
      getActions: (params) => [
        <GridActionsCellItem
          icon={<Icon icon="line-md:alert-circle-twotone-loop" width="24" height="24" />}
          label="Chi tiết"
          onClick={(event) => handleOpenDetail(event, params.row.reCheckId)}
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
          setOpenCreateReCheck(!openCreateReCheck);
        }}
      >
        Gửi phúc khảo
      </Button>
    </GridToolbarContainer>
  );
  //Đóng form
  const handleCloseCreateReCheck = () => {
    setOpenCreateReCheck(false);
  };
  //Add data in table when success
  const createReCheck = (createReCheck) => {
    setRecheck((prevReCheck) => [...prevReCheck, createReCheck]);
  };
  return (
    <>
      <Helmet>
        <title>PHÚC KHẢO | KHẢO THÍ - VLU</title>
      </Helmet>
      <Header title="PHÚC KHẢO" />
      {openCreateReCheck && (
        <CreateReCheck createRecheck={createReCheck} onClose={handleCloseCreateReCheck} open={openCreateReCheck} />
      )}
      {showDetail && (
        <DetailReCheck
          reCheckId={selected.length > 0 ? selected[0] : null}
          onClose={handleOpenDetail}
          open={showDetail}
          hidden={hidden}
        />
      )}
      <div style={{ height: 650, width: '100%' }}>
        <DataGridPremium
          emptyRowsWhenPaging
          slots={{
            toolbar: CustomToolbar,
            loadingOverlay: LinearProgress,
          }}
          loading={loading}
          rows={transformedReCheck}
          columns={columns}
          getRowHeight={() => 'auto'}
        />
      </div>
    </>
  );
};

export default ReCheck;
