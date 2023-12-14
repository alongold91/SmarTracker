import React from 'react'
import styles from './Navbar.module.css';
import { Flex } from 'antd';
const Navbar = () => {
  return (
    <header>
    <nav className={styles.nav}>
     <Flex component='ul' gap='1.875rem' align='center' className={styles.ul}>
         <li><a href='google.com'>Summary</a></li>
         <li><a href='google.com'>Table</a></li>
         <li><a href='google.com'>User Settings</a></li>
         <li><a href='google.com'>Create a variable expense</a></li>
         <li><a href='google.com'>Create a fix expense</a></li>
     </Flex>
    </nav>
 </header>
  )
}

export default Navbar