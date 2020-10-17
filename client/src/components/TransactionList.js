import React, { Fragment, useContext, useEffect } from 'react';
import { Transaction } from './Transaction';

import { GlobalContext } from '../context/GlobalState';

//import { LoadingAnim } from '../ui/loading';
import Spinner from './layout/Spinner';
import GearSpinner from './layout/GearSpinner';

export const TransactionList = () => {
  const { transactions, getTransactions, loading } = useContext(GlobalContext);



  useEffect(() => {
    getTransactions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Fragment>
      <h3>History</h3>
      {loading === true ?
        <GearSpinner />
        :
        <ul className="list">
          {transactions.map(transaction => (<Transaction key={transaction._id} transaction={transaction} />))}
        </ul>
      }
    </Fragment>
  )
}
