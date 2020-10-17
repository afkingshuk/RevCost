import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';
import { numberWithCommas } from '../utils/format';

export const Transaction = ({ transaction }) => {
  const { deleteTransaction, addTransaction } = useContext(GlobalContext);

  const sign = transaction.amount < 0 ? '- ' : ' ';

  const { date, name } = transaction;

  return (
    <li className={transaction.amount < 0 ? 'plus' : 'minus'}>
      <div>
        {new Date(date).toLocaleDateString('en-US', { day: '2-digit', month: '2-digit' })}
      </div>

      {name} <span>{sign}{'৳ '}{numberWithCommas(Math.abs(transaction.amount))}</span>
      <button onClick={() => addTransaction(transaction._id)} className="edit-btn"><i class="fas fa-edit"></i></button>
      <button onClick={() => deleteTransaction(transaction._id)} className="delete-btn"><i class="fas fa-window-close"></i></button>


    </li>

  )
}

//