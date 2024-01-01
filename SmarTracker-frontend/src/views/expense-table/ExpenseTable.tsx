import { useGetExpensesByUserIdQuery } from '../../app-state/slices/rtk-query-slices/expensesApiSlice';
import MoreInfoMenu from '../../components/more-info-menu/MoreInfoMenu';
import withTransition from '../../components/transitions/withTransition';
import style from './ExpenseTable.module.css';

const ExpenseTable = () => {
  const { data, isLoading, isError } = useGetExpensesByUserIdQuery(
    '6579ebefb0d6a56203f28971'
  );

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error</p>;
  }

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
        {data &&
          data.map((expense) => (
            <tr>
              <td>{expense.title}</td>
              <td>{expense.sum}&#8362;</td>
              <td>{expense.date}</td>
              <td>{expense.paymentMethod}</td>
              <td>
                <MoreInfoMenu
                  items={[
                    {
                      label: 'Edit',
                      key: '0',
                      onClick: (e) => console.log(expense._id)
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
          ))}
      </tbody>
    </table>
  );
};

export default withTransition(ExpenseTable);
