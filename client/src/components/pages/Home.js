import React from 'react';


import { IncomeExpenses } from "../IncomeExpenses";
import { TransactionList } from "../TransactionList";
import { AddTransaction } from "../AddTransaction";
import { GlobalProvider } from '../../context/GlobalState';


const Home = () => {
  return (
    <GlobalProvider>
      <IncomeExpenses />
      <TransactionList />
      <AddTransaction />
    </GlobalProvider>
  );
};

export default Home;
