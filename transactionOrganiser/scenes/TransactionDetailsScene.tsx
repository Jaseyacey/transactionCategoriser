import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';

const TransactionDetailsScene = ({ transaction }) => {
  const [category, setCategory] = useState(transaction.category ? transaction.category.name : 'Uncategorized');

  const categoryButtonHandler = () => {
    // TODO
  };

  return (
    <View>
      <Text>{transaction.incoming ? 'Incoming Transaction' : 'Outgoing Transaction'}</Text>
      <Text>Amount: {transaction.amount}</Text>
      <Text>Merchant: {transaction.merchant}</Text>
      <Text>Date: {new Date(transaction.datetime).toLocaleDateString()}</Text>
      <Text>Category: {category}</Text>
      <Button title="Change Category" onPress={categoryButtonHandler} />
    </View>
  );
};

export default TransactionDetailsScene;
