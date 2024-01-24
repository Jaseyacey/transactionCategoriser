import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const transactionsData = [
  { id: '1', title: 'Transaction 1', amount: 20.0 },
  { id: '2', title: 'Transaction 1', amount: 20.0 },
  { id: '3', title: 'Transaction 3', amount: -10.0 },
];

const App = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Transaction List</Text>
      <FlatList
        data={transactionsData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.transactionItem}>
            <Text>{item.title}</Text>
            <Text>{item.amount}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  transactionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
});

export default App;
