import { Flex } from 'antd'
import React from 'react'
import style from './ExpenseRecord.module.css';

const ExpenseRecord = () => {
  return (
    <Flex component='button'  vertical gap='10px' className={style.flexContainer}>
        <p>Title: Coca cola can</p>
        <p>Sum: 36 &#8362;</p>
        <p>Date: 14/11/2023</p>
    </Flex>
  )
}

export default ExpenseRecord