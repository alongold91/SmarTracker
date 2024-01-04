import { ConfigProvider } from 'antd';
import { AnimatePresence } from 'framer-motion';
import {
  Route,
  Routes,
  useLocation
} from 'react-router-dom';
import ExpenseTable from '../../views/expense-table/ExpenseTable';
import LoginPage from '../../views/log-in/LoginPage';
import ForgotPassword from '../../views/password-restoration/ForgotPassword';
import ResetPassword from '../../views/password-restoration/ResetPassword';
import SummaryPage from '../../views/summary-page/SummaryPage';
import UserSettings from '../../views/user-settings/UserSettings';
import Dashboard from './Dashboard';

const Shell = () => {
  const location = useLocation();

  return (
    <>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#088F8F',
            borderRadius: 2
          },
          components: {
            Button: {
              primaryShadow: 'none',
              defaultBg: '#FFF5EE'
            }
          }
        }}
      >
        <AnimatePresence mode='wait'>
          <Routes location={location} key={location.pathname}>
            <Route path='/' element={<Dashboard />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/forgot-password' element={<ForgotPassword />} />
            <Route path='/reset-password/:token' element={<ResetPassword />} />
            <Route path='/dashboard' element={<Dashboard />}>
              <Route path='summary' element={<SummaryPage />} />
              <Route path='expenses'>
                <Route index element={<ExpenseTable />} />
                <Route
                  path=':id'
                  element={<p>A single expense detail page</p>}
                />
              </Route>
              <Route path='uers-settings' element={<UserSettings />} />
            </Route>
          </Routes>
        </AnimatePresence>
      </ConfigProvider>
    </>
  );
};

export default Shell;
