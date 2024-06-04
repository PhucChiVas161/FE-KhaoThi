import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import {
  getReasonRecheck,
  getReasonPostpone,
  getSubjectRecheck,
  getSubjectPostpone,
  getStatusRecheck,
} from './StatisticAPI';
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container } from '@mui/material';
// components
import Iconify from '../../components/iconify';
// sections
import { AppCurrentVisits, AppTrafficBySite, AppConversionRates } from '../../sections/@dashboard/app';

// ----------------------------------------------------------------------

export default function Statistic() {
  const theme = useTheme();
  const [reasonReCheck, setReasonReCheck] = useState([]);
  const [reasonPostpone, setReasonPostpone] = useState([]);
  const [subjectRecheck, setSubjectRecheck] = useState([]);
  const [subjectPostpone, setSubjectPostpone] = useState([]);
  const [statusRecheck, setStatusRecheck] = useState([]);

  //Thống kê lý do phúc khảo
  useEffect(() => {
    getReasonRecheck()
      .then((response) => {
        setReasonReCheck(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  //Thống kê lý do hoãn thi
  useEffect(() => {
    getReasonPostpone()
      .then((response) => {
        setReasonPostpone(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  //Thống kê số lượng môn học Phúc khảo
  useEffect(() => {
    getSubjectRecheck()
      .then((response) => {
        setSubjectRecheck(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  //Thống kê số lượng môn học hoãn thi
  useEffect(() => {
    getSubjectPostpone()
      .then((response) => {
        setSubjectPostpone(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

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

  console.log(statusRecheck);

  return (
    <>
      <Helmet>
        <title> Dashboard | Minimal UI </title>
      </Helmet>

      <Container maxWidth="xl">
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={6}>
            <AppTrafficBySite title="Traffic by Site" list={statusRecheck} />
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <AppTrafficBySite
              title="Traffic by Site"
              list={[
                {
                  name: 'FaceBook',
                  value: 323234,
                  icon: <Iconify icon={'eva:facebook-fill'} color="#1877F2" width={32} />,
                },
                {
                  name: 'Google',
                  value: 341212,
                  icon: <Iconify icon={'eva:google-fill'} color="#DF3E30" width={32} />,
                },
                {
                  name: 'Linkedin',
                  value: 411213,
                  icon: <Iconify icon={'eva:linkedin-fill'} color="#006097" width={32} />,
                },
                {
                  name: 'Twitter',
                  value: 443232,
                  icon: <Iconify icon={'eva:twitter-fill'} color="#1C9CEA" width={32} />,
                },
              ]}
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

          <Grid item xs={12} md={6} lg={6}>
            <AppConversionRates title="Thống kê môn học sinh viên PHÚC KHẢO" chartData={subjectRecheck} />
          </Grid>

          <Grid item xs={12} md={6} lg={6}>
            <AppConversionRates title="Thống kê môn học sinh viên HOÃN THI" chartData={subjectPostpone} />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
