import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { SnackbarProvider } from 'notistack';
import { LicenseInfo } from '@mui/x-license-pro';
// routes
import Router from './routes';
// theme
import ThemeProvider from './theme';
// components
import { StyledChart } from './components/chart';
import ScrollToTop from './components/scroll-to-top';
import TokenChecker from './sections/auth/login/TokenChecker';
import './index.css';

// ----------------------------------------------------------------------
LicenseInfo.setLicenseKey(`${import.meta.env.VITE_LICENSE_KEY}`);

export default function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <ThemeProvider>
          <TokenChecker />
          <SnackbarProvider
            autoHideDuration={3000}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            maxSnack={4}
          >
            <ScrollToTop />
            <StyledChart />
            <Router />
          </SnackbarProvider>
        </ThemeProvider>
      </BrowserRouter>
    </HelmetProvider>
  );
}
