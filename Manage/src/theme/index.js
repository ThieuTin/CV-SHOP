import PropTypes from 'prop-types';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';

// 
import GlobalStyles from './globalStyles';
import palette from './palette';
import shadows from './shadows';

const propTypes = {
  children: PropTypes.node
};

const ThemeConfig = ({ children }) => {
  const themeOptions = {
    palette,
    typography: {
      fontFamily: 'Quicksand'
    },
    shadows
  };
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
