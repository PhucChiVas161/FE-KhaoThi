import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import {
  DataGridPremium,
  useKeepGroupedColumnsHidden,
  useGridApiRef,
  GridActionsCellItem,
  GridToolbar,
} from '@mui/x-data-grid-premium';
import { getReCheckExamAll, getReCheckByLecturerId } from './ReCheckAPI';
import { getOneUsers } from '../UserPage/UserPageAPI';
import { Helmet } from 'react-helmet';
import { LinearProgress } from '@mui/material';
import Header from '../../components/Header';
import { Icon } from '@iconify/react';
import DetailReCheck from '../../components/ReCheck/DetailReCheck';

const ReCheckManagement = () => {
  const [reCheck, setReCheck] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState('');
  const [open, setOpen] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [hidden, setHidden] = useState(true);
  const [shouldRefresh, setShouldRefresh] = useState(false);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const token = Cookies.get('token');
    if (token) {
      const decode = jwtDecode(token);
      getOneUsers(decode.EmployeeId)
        .then((response) => {
          setUserRole(response.data.accountRole);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, []);

  useEffect(() => {
    if (userRole) {
      fetchReCheckData();
    }
  }, [userRole]);

  useEffect(() => {
    if (shouldRefresh) {
      fetchReCheckData();
      setShouldRefresh(false);
    }
  }, [shouldRefresh]);

  const fetchReCheckData = () => {
    setLoading(true);
    const fetchFunction = userRole === 'Lecturer' ? getReCheckByLecturerId : getReCheckExamAll;

    fetchFunction()
      .then((response) => {
        setReCheck(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  };

  const transformedReCheck = reCheck.map((reCheck, index) => ({
    ...reCheck,
    id: index + 1,
  }));

  const handleOpenDetail = (event, reCheckId) => {
    setSelected(reCheckId);
    setOpen((prevOpen) => !prevOpen);
    setHidden((prevHidden) => !prevHidden);
    setShowDetail((prevShowDetail) => !prevShowDetail);
  };

  const handleRefresh = () => {
    setShouldRefresh(true);
  };

  const columns = [
    { field: 'id', headerName: 'STT', flex: 0.4 },
    {
      field: 'employeeName',
      headerName: 'Tên',
      flex: 1,
    },
    {
      field: 'reCheckId',
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
      field: 'lecturerName',
      headerName: 'Phân công',
      flex: 1,
    },
    {
      field: 'status',
      headerName: 'Trạng thái',
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
          onClick={(event) => handleOpenDetail(event, params.row.reCheckId)}
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
        <title>QUẢN LÝ PHÚC KHẢO | KHẢO THÍ - VLU</title>
      </Helmet>
      <Header title="QUẢN LÝ PHÚC KHẢO" />
      <div style={{ height: 650, width: '100%' }}>
        <DataGridPremium
          emptyRowsWhenPaging
          slots={{
            loadingOverlay: LinearProgress,
            toolbar: GridToolbar,
          }}
          loading={loading}
          rows={transformedReCheck}
          columns={columns}
          getRowHeight={() => 'auto'}
          initialState={initialState}
          apiRef={apiRef}
        />
      </div>
      {showDetail && (
        <DetailReCheck
          reCheckId={selected}
          onClose={handleOpenDetail}
          open={showDetail}
          hidden={hidden}
          onSuccess={handleRefresh} // Truyền callback function onSuccess
        />
      )}
    </>
  );
};

export default ReCheckManagement;
