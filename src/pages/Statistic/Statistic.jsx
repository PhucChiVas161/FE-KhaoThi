import { useState, useEffect, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import {
  getReasonRecheck,
  getReasonPostpone,
  getSubjectRecheck,
  getSubjectPostpone,
  getStatusRecheck,
  getStatusPostpone,
} from './StatisticAPI';
// @mui
import { useTheme } from '@mui/material/styles';
import {
  Grid,
  Container,
  Typography,
  FormControl,
  MenuItem,
  InputLabel,
  Select,
} from '@mui/material';
// sections
import {
  AppCurrentVisits,
  AppTrafficBySite,
  AppConversionRates,
} from '../../sections/@dashboard/app';

// ----------------------------------------------------------------------

export default function Statistic() {
  const theme = useTheme();
  const [reasonReCheck, setReasonReCheck] = useState([]);
  const [reasonPostpone, setReasonPostpone] = useState([]);
  const [subjectRecheck, setSubjectRecheck] = useState([]);
  const [subjectPostpone, setSubjectPostpone] = useState([]);
  const [statusRecheck, setStatusRecheck] = useState([]);
  const [statusPostpone, setStatusPostpone] = useState([]);
  const [lopHPPrefix, setLopHPPrefix] = useState('222');

  const payload = useMemo(() => {
    return {
      lopHPPrefix: lopHPPrefix,
    };
  }, [lopHPPrefix]);

  //Thống kê lý do phúc khảo
  useEffect(() => {
    getReasonRecheck(payload)
      .then((response) => {
        setReasonReCheck(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [lopHPPrefix, payload]);

  //Thống kê lý do hoãn thi
  useEffect(() => {
    getReasonPostpone(payload)
      .then((response) => {
        setReasonPostpone(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [lopHPPrefix, payload]);

  //Thống kê số lượng môn học Phúc khảo
  useEffect(() => {
    getSubjectRecheck(payload)
      .then((response) => {
        setSubjectRecheck(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [lopHPPrefix, payload]);

  //Thống kê số lượng môn học hoãn thi
  useEffect(() => {
    getSubjectPostpone(payload)
      .then((response) => {
        setSubjectPostpone(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [lopHPPrefix, payload]);

  //Thống kê số lượng trạng thái Phúc khảo
  useEffect(() => {
    getStatusRecheck()
      .then((response) => {
        setStatusRecheck(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  //Thống kê số lượng trạng thái hoãn thi
  useEffect(() => {
    getStatusPostpone()
      .then((response) => {
        setStatusPostpone(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleChange = (event) => {
    setLopHPPrefix(event.target.value);
  };

  return (
    <>
      <Helmet>
        <title> Thống kê | VLU Khảo Thí </title>
      </Helmet>
      <Typography mb="30px" variant="h5" sx={{ textAlign: 'center' }}>
        Trạng thái đơn phúc khảo và hoãn thi
      </Typography>
      <Container maxWidth="xl">
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={6}>
            <AppTrafficBySite
              title="Tình trạng PHÚC KHẢO"
              list={statusRecheck}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <AppTrafficBySite
              title="Tình trạng HOÃN THI"
              list={statusPostpone}
            />
          </Grid>
        </Grid>
      </Container>
      <Typography my="30px" variant="h5" sx={{ textAlign: 'center' }}>
        Thống kê phúc khảo và hoãn thi HK{lopHPPrefix}
      </Typography>
      <Container maxWidth="xl">
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Age</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={lopHPPrefix}
            label="Age"
            onChange={handleChange}
          >
            <MenuItem value="222">Học kì 222 (Học kì 2 năm 2022-2023)</MenuItem>
            <MenuItem value="223">Học kì 223 (Học kì 3 năm 2022-2023)</MenuItem>
            <MenuItem value="231">Học kì 231 (Học kì 1 năm 2023-2024)</MenuItem>
            <MenuItem value="232">Học kì 232 (Học kì 2 năm 2023-2024)</MenuItem>
            <MenuItem value="233">Học kì 233 (Học kì 3 năm 2023-2024)</MenuItem>
            <MenuItem value="241">Học kì 241 (Học kì 1 năm 2024-2025)</MenuItem>
            <MenuItem value="242">Học kì 242 (Học kì 2 năm 2024-2025)</MenuItem>
            <MenuItem value="243">Học kì 243 (Học kì 3 năm 2024-2025)</MenuItem>
          </Select>
        </FormControl>
        <Grid container spacing={3} mt="10px">
          <Grid item xs={12} md={6} lg={6}>
            <AppConversionRates
              title="Thống kê môn học sinh viên PHÚC KHẢO"
              chartData={subjectRecheck}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <AppConversionRates
              title="Thống kê môn học sinh viên HOÃN THI"
              chartData={subjectPostpone}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <AppCurrentVisits
              title="Lý do PHÚC KHẢO"
              chartData={reasonReCheck}
              chartColors={[
                theme.palette.primary.main,
                theme.palette.info.main,
                theme.palette.warning.main,
                theme.palette.error.main,
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={6}>
            <AppCurrentVisits
              title="Lý do HOÃN THI"
              chartData={reasonPostpone}
              chartColors={[
                theme.palette.primary.main,
                theme.palette.info.main,
                theme.palette.warning.main,
                theme.palette.error.main,
              ]}
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
