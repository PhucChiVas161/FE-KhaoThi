import { useState, useEffect } from 'react';
import {
  DataGridPremium,
  useKeepGroupedColumnsHidden,
  useGridApiRef,
  GridActionsCellItem,
  GridToolbar,
} from '@mui/x-data-grid-premium';
import { getReCheckExamAll } from './ReCheckAPI';
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

  useEffect(() => {
    setLoading(true);
    getReCheckExamAll()
      .then((response) => {
        setReCheck(response.data);
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
    setHidden(!hidden);
    setShowDetail(!showDetail);
  };

  const updateReCheckRefresh = (updateReCheckRefresh) => {
    setReCheck((prevReCheck) => {
      // Tìm kiếm và cập nhật bản ghi trong prevReCheck
      const updatedRows = prevReCheck.map((row) => {
        if (row.reCheckId === updateReCheckRefresh.reCheckId) {
          return updateReCheckRefresh;
        }
        return row;
      });
      return updatedRows;
    });
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
          reCheckId={selected.length > 0 ? selected[0] : null}
          onClose={handleOpenDetail}
          updateReCheckRefresh={updateReCheckRefresh}
          open={showDetail}
          hidden={hidden}
        />
      )}
    </>
  );
};

export default ReCheckManagement;
