import React from 'react'
import styles from './Navbar.module.css';
import {Link} from 'react-router-dom';
import { Flex } from 'antd';
const Navbar = () => {
  return (
    <header>
    <nav className={styles.nav}>
      <h5>Logo</h5>
     <Flex component='ul' gap='1.875rem' align='center'>
         <li><Link to='/'>Summary</Link></li>
         <li><Link to='/Expenses'>Table</Link></li>
         <li><Link to='uers-settings'>User Settings</Link></li>
     </Flex>
     <p>Create a new expense</p>
    </nav>
 </header>
  )
}

export default Navbar