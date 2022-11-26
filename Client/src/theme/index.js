import PropTypes from 'prop-types';
import { useMemo } from 'react';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';

import useSettings from '../hooks/useSettings';
import GlobalStyles from './globalStyles';
import palette from './palette';

const propTypes = {
  children: PropTypes.node
};

const ThemeConfig = ({ children }) => {
  const { themeMode } = useSettings();
  const isLight = themeMode === 'light';
  const themeOptions = useMemo(() => ({
    palette: isLight ? { ...palette.light, mode: 'light' } : { ...palette.dark, mode: 'dark' },
    typography: {
      fontFamily: 'Quicksand'
    }
  }), [isLight]);
  const theme = createTheme(themeOptions);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyles />
      {children}
    </ThemeProvider>
  );
};

ThemeConfig.propTypes = propTypes;

export default ThemeConfig;
