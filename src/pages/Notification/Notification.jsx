import { useState, useEffect } from 'react';
import {
  DataGridPremium,
  GridToolbarContainer,
  GridActionsCellItem,
} from '@mui/x-data-grid-premium';
import { getNotificationAll } from './NotificationAPI';
import { Helmet } from 'react-helmet';
import { LinearProgress, Button } from '@mui/material';
import moment from 'moment';
import Header from '../../components/Header';
import { Icon } from '@iconify/react';
import AddNotification from '../../components/Notification/AddNotification';
import EditNotification from '../../components/Notification/EditNotification';
const Notification = () => {
  const [notitication, setNotitication] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openCreateNotitication, setOpenCreateNotitication] = useState(false);
  const [selected, setSelected] = useState('');
  const [open, setOpen] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [shouldRefresh, setShouldRefresh] = useState(false);

  // Lấy dữ liệu thông báo
  useEffect(() => {
    fetchNotificationData();
  }, []);

  // Refresh dữ liệu thông báo thì thành công
  useEffect(() => {
    if (shouldRefresh) {
      fetchNotificationData();
      setShouldRefresh(false);
    }
  }, [shouldRefresh]);

  const fetchNotificationData = () => {
    setLoading(true);
    getNotificationAll()
      .then((response) => {
        setNotitication(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  const transformedNotification = notitication.map((notification, index) => ({
    ...notification,
    id: index + 1,
  }));

  const handleOpenDetail = (_event, notificationId) => {
    setSelected([notificationId]);
    setOpen(!open);
    setShowDetail(!showDetail);
    setHidden(!hidden);
  };

  const handleRefresh = () => {
    setShouldRefresh(true);
  };

  const columns = [
    { field: 'id', headerName: 'STT', flex: 0.5 },
    {
      field: 'title',
      headerName: 'Tiêu đề',
      flex: 1,
    },
    {
      field: 'content',
      headerName: 'Nội dung',
      flex: 1,
    },
    {
      field: 'createAt',
      headerName: 'Tạo vào',
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
          icon={
            <Icon
              icon="line-md:alert-circle-twotone-loop"
              width="24"
              height="24"
            />
          }
          label="Chi tiết"
          onClick={(event) =>
            handleOpenDetail(event, params.row.notificationId)
          }
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
          setOpenCreateNotitication(!openCreateNotitication);
        }}
      >
        Thêm thông báo
      </Button>
    </GridToolbarContainer>
  );
  //Đóng form
  const handleCloseCreateNotification = () => {
    setOpenCreateNotitication(false);
  };
  return (
    <>
      <Helmet>
        <title>THÔNG BÁO | KHẢO THÍ - VLU</title>
      </Helmet>
      <Header title="THÔNG BÁO" />
      {openCreateNotitication && (
        <AddNotification
          onSuccess={handleRefresh}
          onClose={handleCloseCreateNotification}
          open={openCreateNotitication}
        />
      )}
      {showDetail && (
        <EditNotification
          notificationId={selected.length > 0 ? selected[0] : null}
          onClose={handleOpenDetail}
          open={showDetail}
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
          rows={transformedNotification}
          columns={columns}
          getRowHeight={() => 'auto'}
        />
      </div>
    </>
  );
};

export default Notification;
