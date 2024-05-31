/* eslint-disable perfectionist/sort-imports */
import 'src/global.css';

import { useScrollToTop } from 'src/hooks/use-scroll-to-top';
import { LicenseInfo } from '@mui/x-license-pro';
import { SnackbarProvider } from 'notistack';
import Router from 'src/routes/sections';
import ThemeProvider from 'src/theme';
import TokenChecker from './sections/login/TokenChecker';

// ----------------------------------------------------------------------
LicenseInfo.setLicenseKey(`${import.meta.env.VITE_LICENSE_KEY}`);
export default function App() {
  useScrollToTop();

  return (
    <ThemeProvider>
      <TokenChecker />
      <SnackbarProvider
        autoHideDuration={3000}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        maxSnack={4}
      >
        <Router />
      </SnackbarProvider>
    </ThemeProvider>
  );
}
