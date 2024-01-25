// TransactionsScreen.tsx
import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { CheckBox } from 'react-native-elements';
import Modal from 'react-native-modal';

interface Transaction {
  id: string;
  title: string;
  amount: number;
  details: string;
}

const transactionsData: Transaction[] = [
  { id: '1', title: 'Transaction 1', amount: 20.0, details: 'Details for Transaction 1' },
  { id: '2', title: 'Transaction 2', amount: -10.0, details: 'Details for Transaction 2' },
];

const TransactionsScreen: React.FC = () => {
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isRightCategory, setIsRightCategory] = useState(false);
  const [isWrongCategory, setIsWrongCategory] = useState(false);

  const toggleModal = (transaction: Transaction | null) => {
    setSelectedTransaction(transaction);
    setModalVisible(!isModalVisible);
    setIsRightCategory(false);
    setIsWrongCategory(false)
  };

  const handleCheckboxToggle = () => {
    setIsRightCategory(true);
    setTimeout(() => {
      toggleModal(null);
    }, 500);
  };

  const isWrongCategoryPressed = () => {
    setIsWrongCategory(true)
    setTimeout(() => {
      toggleModal(null);
    }, 500);
  }
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Transaction List</Text>
      <FlatList
        data={transactionsData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => toggleModal(item)}>
            <View style={styles.transactionItem}>
              <Text>{item.title}</Text>
              <Text>{item.amount}</Text>
            </View>
          </TouchableOpacity>
        )}
      />

      <Modal isVisible={isModalVisible}>
        <View style={styles.modalContainer}>
          <TouchableOpacity onPress={() => toggleModal(null)}>
            <Text style={styles.modalCloseButton}>X</Text>
          </TouchableOpacity>
          <Text style={styles.modalHeader}>Transaction Details</Text>
          <Text>{selectedTransaction?.details}</Text>
          <Text>Is this the right category?</Text>
          <View style={styles.checkBoxes}>
            <CheckBox
              title="Yes"
              checked={isRightCategory}
              onPress={handleCheckboxToggle}
            />
            <CheckBox
              title="No"
              checked={isWrongCategory}
              onPress={isWrongCategoryPressed}
            />
          </View>
        </View>
      </Modal>
    </ScrollView>
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
  modalContainer: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
  },
  modalHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  modalCloseButton: {
    color: 'blue',
    marginTop: 8,
  },
  checkBoxes: {
    flexDirection: 'row'
  }
});

export default TransactionsScreen;
