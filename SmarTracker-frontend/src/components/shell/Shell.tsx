import { Navigate, Outlet, Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from '../navigation-bar/Navbar';
import SummaryPage from '../../views/summary-page/SummaryPage';
import ExpenseTable from '../../views/expense-table/ExpenseTable';
import UserSettings from '../../views/user-settings/UserSettings';
import LoginPage from '../../views/log-in/LoginPage';
import { ConfigProvider } from 'antd';
import ForgotPassword from '../../views/password-restoration/ForgotPassword';
import ResetPassword from '../../views/password-restoration/ResetPassword';
import { useSelector } from 'react-redux';

const Dashboard = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

const Shell = () => {
  const location = useLocation();

  const loggedInUserToken = useSelector((state: any) => state.loggedinUser.token);
  const userLoggedIn: boolean = Boolean(loggedInUserToken) ;

  return (
    <>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#088F8F',
            borderRadius: 2,
          },
          components: {
            Button: {
              primaryShadow: 'none',
              defaultBg: '#FFF5EE',
            }
          }
        }}
      >
        <AnimatePresence mode='wait'>
          <Routes location={location} key={location.pathname}>
            <Route
              path='/'
              element={userLoggedIn ? <Navigate to='/dashboard' /> : <Navigate to='/login'/>}
            />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/forgot-password' element={<ForgotPassword />}/>
            <Route path='/reset-password/:token' element={<ResetPassword />}/>
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
