import React from 'react';

import { Header } from "../Header";
//import { Balance } from "../Balance";
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
