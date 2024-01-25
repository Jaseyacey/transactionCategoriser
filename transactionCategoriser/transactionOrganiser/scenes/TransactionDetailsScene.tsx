import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { CheckBox } from "react-native-elements";
import Modal from "react-native-modal";
import axios from "axios";

interface Transaction {
  id: string;
  title: string;
  amount: number;
  category: string;
  details: string;
  date: string;
}

const transactionsData: Transaction[] = [
  {
    id: "1",
    title: "Tesco",
    amount: 20.0,
    category: "Groceries",
    date: "2023-01-01",
    details: "card",
  },
  {
    id: "2",
    title: "Transaction 2",
    amount: -10.0,
    category: "category for Transaction 2",
    date: "2023-01-01",
    details: "asdasd",
  },
  {
    id: "3",
    title: "Transaction 2",
    amount: -10.0,
    category: "category for Transaction 2",
    date: "2023-01-01",
    details: "asdasd",
  },
  {
    id: "4",
    title: "Transaction 2",
    amount: -10.0,
    category: "category for Transaction 2",
    date: "2023-01-01",
    details: "asdasd",
  },
  {
    id: "5",
    title: "Transaction 2",
    amount: -10.0,
    category: "category for Transaction 2",
    date: "2023-01-01",
    details: "asdasd",
  },
  {
    id: "6",
    title: "Transaction 2",
    amount: -10.0,
    category: "category for Transaction 2",
    date: "2023-01-01",
    details: "asdasd",
  },
];

const TransactioncategoryScreen: React.FC = () => {
  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isRightCategory, setIsRightCategory] = useState(false);
  const [isWrongCategory, setIsWrongCategory] = useState(false);

  const toggleModal = (transaction: Transaction | null) => {
    setSelectedTransaction(transaction);
    setModalVisible(!isModalVisible);
    setIsRightCategory(false);
    setIsWrongCategory(false);
  };

  const handleCheckboxToggle = () => {
    setIsRightCategory(true);
    setTimeout(() => {
      toggleModal(null);
    }, 500);
  };

  const isWrongCategoryPressed = () => {
    setIsWrongCategory(true);
    setTimeout(() => {
      toggleModal(null);
    }, 500);
  };
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Transaction List</Text>
      <View style={styles.headerRow}>
        <Text style={styles.headerText}>Merchant</Text>
        <Text style={styles.headerText}>Details</Text>
        <Text style={styles.headerText}>Amount</Text>
      </View>
      <FlatList
        data={transactionsData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <>
            <TouchableOpacity onPress={() => toggleModal(item)}>
              <View style={styles.transactionItem}>
                <Text>{item.title}</Text>
                <Text>{item.details}</Text>
                <Text>{'£' + item.amount}</Text>
              </View>
              <View style={styles.categoryRow}>
                <Text style={styles.smallText}>{item.date}</Text>
                <Text style={styles.smallText}>{item.category}</Text>
                <Text />
              </View>
            </TouchableOpacity>
            <View style={styles.line} />
          </>
        )}
      />

      <Modal isVisible={isModalVisible}>
        <View style={styles.modalContainer}>
          <TouchableOpacity onPress={() => toggleModal(null)}>
            <Text style={styles.modalCloseButton}>X</Text>
          </TouchableOpacity>
          <Text style={styles.modalHeader}>Transaction category</Text>
          <Text style={styles.modalText}>{selectedTransaction?.category}</Text>
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
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 36,
    justifyContent: "center",
    textAlign: "center",
    color: "grey",
  },
  transactionItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  modalContainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
  },
  modalCloseButton: {
    fontSize: 20,
    fontWeight: "bold",
    color: "red",
    alignSelf: "flex-end",
  },
  modalHeader: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 10,
  },
  checkBoxes: {
    flexDirection: "row",
  },
  smallText: {
    color: "grey",
  },
  line: {
    height: 1,
    width: "100%",
  },
  categoryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: "#ECECEC", // Background color for the header row
  },
  headerText: {
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default TransactioncategoryScreen;
