import PropTypes from 'prop-types';
import { forwardRef } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Link } from '@mui/material';
import VLU from './logo-removebg-preview.png';

// ----------------------------------------------------------------------

// eslint-disable-next-line react/display-name
const Logo = forwardRef(({ disabledLink = false, sx }) => {
  const logo = <Box component="img" src={VLU} sx={{ width: 245, height: 45, cursor: 'pointer', ...sx }} />;
  if (disabledLink) {
    return <>{logo}</>;
  }

  return (
    <Link to="/" component={RouterLink} sx={{ display: 'contents' }}>
      {logo}
    </Link>
  );
});

Logo.propTypes = {
  sx: PropTypes.object,
  disabledLink: PropTypes.bool,
};

export default Logo;
