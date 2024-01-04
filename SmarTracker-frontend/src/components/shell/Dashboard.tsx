import { Outlet, useNavigate } from 'react-router-dom';
import {
  useLogoutMutation,
  useRefreshTokenMutation
} from '../../app-state/slices/rtk-query-slices/usersApiSlice';
import { useEffect, useMemo } from 'react';
import { Flex } from 'antd';
import DescriptiveLoader from '../loaders/DescriptiveLoader';
import Navbar from '../navigation-bar/Navbar';

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
  

  useEffect(() => {
    const handleLogout = async () => {
      if (shouldLogout) {
        await logout();
        console.log('logging out');
        if (!error) {
          // Use Navigate after the asynchronous logout is completed
          navigate('/login');
        }
      } else {
        refreshToken();
        console.log('Token refreshed');
      }
    };

    handleLogout();
  }, [shouldLogout]);

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
