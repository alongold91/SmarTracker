import React from 'react';
import withTransition from '../../components/transitions/withTransition';
import style from './ExpenseTable.module.css';
import { MoreOutlined } from '@ant-design/icons';

const ExpenseTable = () => {
  return (
    <table className={style.table}>
      <tr>
        <th>Title</th>
        <th>Sum</th>
        <th>Date</th>
        <th>Payment method</th>
        <th></th>
      </tr>
      <tr>
        <td>Coca cola can</td>
        <td>12.99&#8362;</td>
        <td>03/12/2023 09:05am</td>
        <td>Credit card</td>
        <td><button><MoreOutlined className={style['more-info-icon']} /></button></td>
      </tr>
      <tr>
        <td>Coca cola can</td>
        <td>12.99&#8362;</td>
        <td>03/12/2023 09:05am</td>
        <td>Credit card</td>
        <td><button><MoreOutlined className={style['more-info-icon']} /></button></td>
      </tr>
      <tr>
        <td>Coca cola can</td>
        <td>12.99&#8362;</td>
        <td>03/12/2023 09:05am</td>
        <td>Credit card</td>
        <td><button><MoreOutlined className={style['more-info-icon']} /></button></td>
      </tr>
      <tr>
        <td>Coca cola can</td>
        <td>12.99&#8362;</td>
        <td>03/12/2023 09:05am</td>
        <td>Credit card</td>
        <td><button><MoreOutlined className={style['more-info-icon']} /></button></td>
      </tr>
    </table>
  );
};

export default withTransition(ExpenseTable);
