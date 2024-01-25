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
        <Text style={styles.headerText}>Date</Text>
        <Text style={styles.headerText}>Details</Text>
        <Text style={styles.headerText}>Amount</Text>
      </View>
      <FlatList
        data={transactionsData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => toggleModal(item)}>
            <View style={styles.transactionItem}>
              <Text style={styles.transactionText}>{item.title}</Text>
              <Text style={styles.transactionText}>{item.details}</Text>
              <Text
                style={[
                  styles.transactionText,
                  { color: item.amount >= 0 ? "green" : "red" },
                ]}
              >
                {item.amount >= 0 ? "+" : "-"} £{Math.abs(item.amount)}
              </Text>
            </View>
            <View style={styles.categoryRow}>
              <Text style={styles.smallText}>{item.category}</Text>
            </View>
          </TouchableOpacity>
        )}
      />

      <Modal isVisible={isModalVisible}>
        <View style={styles.modalContainer}>
          <TouchableOpacity onPress={() => toggleModal(null)}>
            <Text style={styles.modalCloseButton}>X</Text>
          </TouchableOpacity>
          <Text style={styles.modalHeader}>Transaction Category</Text>
          <Text style={styles.modalText}>{selectedTransaction?.category}</Text>
          <Text style={styles.modalText}>Is this the correct category?</Text>
          <View style={styles.checkBoxes}>
            <CheckBox
              title="Yes"
              checked={isRightCategory}
              onPress={handleCheckboxToggle}
              containerStyle={styles.checkBoxContainer}
              textStyle={styles.checkBoxText}
            />
            <CheckBox
              title="No"
              checked={isWrongCategory}
              onPress={isWrongCategoryPressed}
              containerStyle={styles.checkBoxContainer}
              textStyle={styles.checkBoxText}
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
    backgroundColor: "#F5F5F5",
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#333",
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: "#ECECEC",
    marginBottom: 10,
    borderRadius: 8,
  },
  headerText: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#333",
  },
  transactionItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 0,
    backgroundColor: "#FFF",
    padding: 10,
    borderRadius: 8,
    elevation: 3,
    marginTop: 10,
  },
  transactionText: {
    fontSize: 16,
    color: "#333",
  },
  categoryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#ECECEC",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  smallText: {
    fontSize: 12,
    color: "#666",
  },
  line: {
    height: 1,
    width: "100%",
    backgroundColor: "#ECECEC",
  },
  modalContainer: {
    backgroundColor: "#FFF",
    borderRadius: 8,
    padding: 16,
    elevation: 3,
    margin: 20,
  },
  modalCloseButton: {
    fontSize: 24,
    fontWeight: "bold",
    color: "red",
    alignSelf: "flex-end",
  },
  modalHeader: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  modalText: {
    fontSize: 16,
    marginBottom: 10,
    color: "#333",
  },
  checkBoxes: {
    flexDirection: "row",
    justifyContent: "center",
  },
  checkBoxContainer: {
    backgroundColor: "transparent",
    borderWidth: 0,
    marginLeft: 10,
    marginRight: 10,
  },
  checkBoxText: {
    fontSize: 16,
    fontWeight: "normal",
    color: "#333",
  },
});

export default TransactioncategoryScreen;
