// components
// import LoadingScreen from './components/LoadingScreen';
import Snackbar from './components/Snackbar';
// hooks
// import useAuth from './hooks/useAuth';
// 
import Router from './routes';
import ThemeConfig from './theme';

const App = () => {
  // const { isInitialized } = useAuth();
  return (
    <ThemeConfig>
      <Snackbar />
      <Router />
      {/* {isInitialized ? <Router /> : <LoadingScreen />} */}
    </ThemeConfig>
  );
};

export default App;
