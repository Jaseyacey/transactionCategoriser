import React, { useState } from 'react';

interface Transaction {
  id: string;
  customerId: string;
  amount: number;
  merchant: string;
  datetime: string;
  category?: {
    name: string;
    proposed?: string;
    approved?: string;
  };
  incoming: boolean;
  type: string; 
}

const TransactionDetailsScene: React.FC<{ transaction: Transaction }> = ({ transaction }) => {
  const [category, setCategory] = useState(transaction.category ? transaction.category.name : 'Uncategorized');

  const changeCategoryButtonHandler = () => {
    // TODO
  };

  return (
    <div>
      <h2>{transaction.incoming ? 'Incoming Transaction' : 'Outgoing Transaction'}</h2>
      <p>Amount: {transaction.amount}</p>
      <p>Merchant: {transaction.merchant}</p>
      <p>Date: {new Date(transaction.datetime).toLocaleDateString()}</p>
      <p>Category: {category}</p>
      <button onClick={changeCategoryButtonHandler}>Change Category</button>
    </div>
  );
};

export default TransactionDetailsScene;
