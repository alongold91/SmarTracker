import React from 'react';
import withTransition from '../../components/transitions/withTransition';
import style from './ExpenseTable.module.css';
import { MoreOutlined } from '@ant-design/icons';
import MoreInfoMenu from '../../components/more-info-menu/MoreInfoMenu';

const ExpenseTable = () => {
  return (
    <table className={style.table}>
      <thead>
        <tr>
          <th>Title</th>
          <th>Sum</th>
          <th>Date</th>
          <th>Payment method</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Coca cola can</td>
          <td>12.99&#8362;</td>
          <td>03/12/2023 09:05am</td>
          <td>Credit card</td>
          <td>
            <button>
              <MoreOutlined className={style['more-info-icon']} />
            </button>
          </td>
        </tr>
        <tr>
          <td>Coca cola can</td>
          <td>12.99&#8362;</td>
          <td>03/12/2023 09:05am</td>
          <td>Credit card</td>
          <td>
            <button>
              <MoreOutlined className={style['more-info-icon']} />
            </button>
          </td>
        </tr>
        <tr>
          <td>Coca cola can</td>
          <td>12.99&#8362;</td>
          <td>03/12/2023 09:05am</td>
          <td>Credit card</td>
          <td>
            <button>
              <MoreOutlined className={style['more-info-icon']} />
            </button>
          </td>
        </tr>
        <tr>
          <td>Coca cola can</td>
          <td>12.99&#8362;</td>
          <td>03/12/2023 09:05am</td>
          <td>Credit card</td>
          <td>
            <MoreInfoMenu
              items={[
                {
                  label: 'Edit',
                  key: '0',
                  onClick: (e) => console.log(e)
                },
                {
                  label: 'Delete',
                  key: '1',
                  onClick: (e) => console.log(e)
                }
              ]}
            />
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default withTransition(ExpenseTable);
