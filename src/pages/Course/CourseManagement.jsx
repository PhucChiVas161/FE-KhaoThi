import { useState, useEffect } from 'react';
import { DataGridPremium, GridToolbarContainer, GridToolbarFilterButton } from '@mui/x-data-grid-premium';
import { getCourse, importCourse } from './CourseAPI';
import { Helmet } from 'react-helmet';
import { LinearProgress, Button, Typography, Link } from '@mui/material';
import Header from '../../components/Header';
import { useSnackbar } from 'notistack';
import { Icon } from '@iconify/react';
const CourseManagement = () => {
  const [course, setCourse] = useState([]);
  const [loading, setLoading] = useState(false);
  const [shouldRefresh, setShouldRefresh] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    fetchCourseData();
  }, []);

  useEffect(() => {
    if (shouldRefresh) {
      fetchCourseData();
      setShouldRefresh(false);
    }
  }, [shouldRefresh]);

  const fetchCourseData = () => {
    setLoading(true);
    getCourse()
      .then((response) => {
        setCourse(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  const handleRefresh = () => {
    setShouldRefresh(true);
  };

  const transformedCourseExam = course.map((course, index) => ({
    ...course,
    id: index + 1,
  }));

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setLoading(true);
      const formData = new FormData();
      formData.append('file', file);
      importCourse(formData)
        .then((response) => {
          enqueueSnackbar(response.data, { variant: 'success' });
          handleRefresh();
        })
        .catch((error) => {
          console.log(error);
          enqueueSnackbar('Thêm Data thất bại, vui lòng thử lại sau', { variant: 'error' });
        })
        .finally(() => {
          setLoading(false); // Thời gian đóng thông báo (3 giây)
        });
    }
  };

  const CustomToolbar = () => (
    <GridToolbarContainer>
      <GridToolbarFilterButton />
      <Button
        startIcon={<Icon icon="line-md:upload-outline-loop" />}
        component="label"
        onChange={handleFileChange}
        disabled={loading}
      >
        Import User from Excel
        <input id="fileInput" type="file" hidden accept=".xlsx" />
      </Button>
      <Typography>
        Mẫu File (
        <Link href="https://localhost:3000" underline="none" target="_blank" rel="noopener">
          tại đây
        </Link>
        )
      </Typography>
    </GridToolbarContainer>
  );

  const columns = [
    { field: 'id', headerName: 'STT', flex: 0.5 },
    {
      field: 'lopHP',
      headerName: 'Lớp học phần',
      flex: 1,
    },
    {
      field: 'tenHP',
      headerName: 'Tên học phần',
      flex: 1,
    },
    {
      field: 'maPhongThi',
      headerName: 'Mã phòng thi',
      flex: 1,
    },
  ];

  return (
    <>
      <Helmet>
        <title>HOÃN THI | KHẢO THÍ - VLU</title>
      </Helmet>
      <Header title="HOÃN THI" />
      <div style={{ height: 650, width: '100%' }}>
        <DataGridPremium
          emptyRowsWhenPaging
          slots={{
            toolbar: CustomToolbar,
            loadingOverlay: LinearProgress,
          }}
          loading={loading}
          rows={transformedCourseExam}
          columns={columns}
          getRowHeight={() => 'auto'}
        />
      </div>
    </>
  );
};

export default CourseManagement;
