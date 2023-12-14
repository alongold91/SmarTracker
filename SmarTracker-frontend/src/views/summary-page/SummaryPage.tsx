import React from 'react';
import ExpenseRecord from '../../components/expense-record/ExpenseRecord';
import { Flex } from 'antd';
import style from './SummaryPage.module.css';
import PieChart from '../../components/charts/PieChart';
import BarChart from '../../components/charts/BarChart';

const SummaryPage = () => {
  return (
    <Flex className={style.mainContainer} gap='10rem'>
      <Flex vertical gap='1rem'>
        <h5>Expenses for December, 2023</h5>
        <Flex vertical gap='0.875rem' className={style.expenseRecordContainer}>
          <ExpenseRecord />
          <ExpenseRecord />
          <ExpenseRecord />
          <ExpenseRecord />
          <ExpenseRecord />
        </Flex>
      </Flex>
      <Flex vertical>
        <h5 style={{ textAlign: 'center' }}>
          Your top 5 expenses for December, 2023
        </h5>
        <div style={{ height: '300px', width: '700px' }}>
          <PieChart />
        </div>
        <h5 style={{ textAlign: 'center' }}>2023 Expenses by Month</h5>
        <div style={{ height: '300px', width: '700px' }}>
          <BarChart />
        </div>
      </Flex>
    </Flex>
  );
};

export default SummaryPage;
