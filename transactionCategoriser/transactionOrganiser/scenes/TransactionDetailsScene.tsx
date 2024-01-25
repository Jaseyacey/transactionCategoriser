import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from "react-native";
import Modal from "react-native-modal";
import axios from "axios";

interface Transaction {
  datetime: string;
  id: string;
  description: string;
  amount: number;
  category: string;
}

const TransactioncategoryScreen: React.FC = () => {
  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isRightCategory, setIsRightCategory] = useState(false);
  const [isWrongCategory, setIsWrongCategory] = useState(false);
  const [customerUid, setCustomerUid] = useState([""]);
  const [dateTime, setDateTime] = useState("");

  const ipaddress = "127.0.0.1";
  const url = `http://${ipaddress}:8080`;
  const getCustomer = (customerId: string) => `${url}/customers/${customerId}/transactions`;

  const getCustomers = `${url}/customers`;

  const initialTransactionsData: Transaction[] = []; // Placeholder while fetching data

  const [transactionsData, setTransactionsData] = useState<Transaction[]>(
    initialTransactionsData
  );
  const mapToTransaction = (apiData: any): Transaction => {
    return {
      datetime: apiData.datetime,
      id: apiData.id,
      description: apiData.description,
      amount: apiData.amount,
      category: apiData.category.name, // Assuming "category" is an object with a "name" property
    };
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const firstCustomerId = (await (await fetch(getCustomers)).json())[0]
        const response = await fetch(getCustomer(firstCustomerId));
        const data = await response.json();
        const transactions = data.map((item: {}) => mapToTransaction(item));
        setTransactionsData(transactions);
        console.log(transactionsData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

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

  const renderItem = ({ item }: { item: Transaction }) => (
    <TouchableOpacity onPress={() => toggleModal(item)}>
      <View style={styles.transactionItem}>
        <View style={styles.descriptionContainer}>
          <Text
            style={styles.transactionText}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {item.description}
          </Text>
        </View>
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
          <View style={styles.categoryBubble}>
            <Text style={styles.smallText}>{item.category}</Text>
          </View>
        </View>
    </TouchableOpacity>
  );
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Transaction List</Text>
      <View style={styles.headerRow}>
        <Text style={styles.headerText}>Merchant</Text>
        <Text style={styles.headerText}>Amount</Text>
      </View>
      <FlatList
        data={transactionsData}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
      <Modal isVisible={isModalVisible}>
        <View style={styles.modalContainer}>
          <TouchableOpacity onPress={() => toggleModal(null)}>
            <Text style={styles.modalCloseButton}>X</Text>
          </TouchableOpacity>
          <View style={styles.modalSection}>
            <Text style={styles.modalHeader}>Transaction Category</Text>
            <Text style={styles.modalText}>
              {selectedTransaction?.category}
            </Text>
          </View>
          <View style={styles.modalSection}>
            <Text style={styles.modalHeader}>
              Is this the correct category?
            </Text>
            <View style={styles.checkBoxes}>
              <TouchableOpacity
                style={[
                  styles.checkBoxButton,
                  isRightCategory && styles.checkBoxSelected,
                ]}
                onPress={handleCheckboxToggle}
              >
                <Text style={styles.checkBoxText}>Yes</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.checkBoxButton,
                  isWrongCategory && styles.checkBoxSelected,
                ]}
                onPress={isWrongCategoryPressed}
              >
                <Text style={styles.checkBoxText}>No</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
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
  modalSection: {
    marginBottom: 20,
  },

  modalCloseButton: {
    fontSize: 24,
    fontWeight: "bold",
    color: "red",
    alignSelf: "flex-end",
  },
  checkBoxContainer: {
    backgroundColor: "transparent",
    borderWidth: 0,
    marginLeft: 10,
    marginRight: 10,
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

  checkBoxButton: {
    flex: 1,
    backgroundColor: "#ECECEC",
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: "center",
  },

  checkBoxSelected: {
    backgroundColor: "#007bff", // Background color when selected
  },

  checkBoxText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  descriptionContainer: {
    flex: 1,
    maxWidth: "50%",
  },
  categoryBubble: {
    backgroundColor: "#ECECEC",
    borderRadius: 8,
    paddingHorizontal: 10,
  },
});

export default TransactioncategoryScreen;
