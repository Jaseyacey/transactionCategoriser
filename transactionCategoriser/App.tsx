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
  category: {name: string, approved?: boolean}
}

const transactionsData: Transaction[] = [
  { id: '1', title: 'Transaction 1', amount: 20.0, details: 'Details for Transaction 1', category: {name: 'Groceries'} },
  { id: '2', title: 'Transaction 2', amount: -10.0, details: 'Details for Transaction 2', category: {name: 'Home Improvement'} },
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
          <Text style={styles.modalHeader}>{selectedTransaction?.details}</Text>
          <Text style={styles.modalText}>{selectedTransaction?.category.name}</Text>
          <Text style={styles.modalText}>Is this the right category?</Text>
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
  modalContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
  },
  modalCloseButton: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'red',
    alignSelf: 'flex-end',
  },
  modalHeader: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 10,
  },
  checkBoxes: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  checkBox: {
    flex: 1,
    backgroundColor: 'transparent',
    borderWidth: 0,
    marginLeft: 0,
    marginRight: 0,
  },
  checkBoxText: {
    fontSize: 16,
    fontWeight: 'normal',
  },
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

export default TransactionsScreen;
