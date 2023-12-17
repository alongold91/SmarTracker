import React from 'react'
import styles from './Navbar.module.css';
import { Flex } from 'antd';
const Navbar = () => {
  return (
    <header>
    <nav className={styles.nav}>
      <h5>Logo</h5>
     <Flex component='ul' gap='1.875rem' align='center'>
         <li><a href='google.com'>Summary</a></li>
         <li><a href='google.com'>Table</a></li>
         <li><a href='google.com'>User Settings</a></li>
         <li><a href='google.com'>Create a new expense</a></li>
     </Flex>
     <p>Create a new expense</p>
    </nav>
 </header>
  )
}

export default Navbar