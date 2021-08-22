/* eslint-disable */

// routes
import router from './routes';
// theme
import ThemeConfig from './theme';
// components
import ScrollToTop from './components/ScrollToTop';

// ----------------------------------------------------------------------
import { useRoutes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { userIsAuth } from '../src/Redux/selectors/user'

export default function App() {
  const isLoggedIn = useSelector(userIsAuth);
  const routing = useRoutes(router(isLoggedIn));

  return (
    <ThemeConfig>
      <ScrollToTop />
      {routing}
       </ThemeConfig>
  );
}
