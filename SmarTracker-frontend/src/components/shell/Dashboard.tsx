import { Flex } from 'antd';
import { useCallback, useEffect, useMemo } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import {
  useLogoutMutation,
  useRefreshTokenMutation
} from '../../app-state/slices/rtk-query-slices/usersApiSlice';
import DescriptiveLoader from '../loaders/DescriptiveLoader';
import Navbar from '../navigation-bar/Navbar';

let initialRender = true;

const Dashboard = () => {
  const [logout, { error, isLoading: isLoggingOut }] = useLogoutMutation();
  const [refreshToken, { isLoading: isRefreshingToken }] =
    useRefreshTokenMutation();
  const navigate = useNavigate();

  const isPersist = localStorage.getItem('persist') !== null;
  const isInSession = sessionStorage.getItem('inSession') !== null;

  const shouldLogout: boolean = useMemo(
    () => !isPersist && !isInSession,
    [isPersist, isInSession]
  );

  const handleLogout = useCallback(async () => {
    if (shouldLogout) {
      await logout();
      if (!error) {
        navigate('/login');
      }
    } else {
      refreshToken();
    }
  }, []);

  useEffect(() => {
    if (initialRender) {
      initialRender = false;
      handleLogout();
    }
  }, []);

  if (isLoggingOut || isRefreshingToken) {
    return (
      <Flex align='center' justify='center' className='full-screen-size'>
        <DescriptiveLoader
          text='connecting...'
          size='large'
          repeatDelay={1200}
        />
      </Flex>
    );
  }

  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default Dashboard;
