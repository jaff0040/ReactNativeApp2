import { useState, useEffect } from "react";
import { FlatList, SafeAreaView, StyleSheet, Text, View } from "react-native";
import axios from "axios";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/todos")
      .then((response) => {
        setTodos(response.data);
      })
      .catch((e) => {
        console.error("Error fetching data: ", e);
      });
  }, []); // Fetches data once.

  

  const renderItem = ({ item }) => (
    <View style={styles.todoItem}>
      <Text style={styles.title}>{item.title}</Text>
      <Text
        style={[
          styles.completed,
          { color: item.completed ? "#4CAF50" : "#F44336" },
        ]}
      >
        {item.completed ? "Completed" : "Not Completed"}
      </Text>
    </View>
  );

  const keyExtractor = (item) => item.id.toString();

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <FlatList
          data={todos}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ccccff",
    paddingHorizontal: 16,
  },
  todoItem: {
    backgroundColor: "#fbecd0",
    padding: 16,
    borderRadius: 10,
    marginVertical: 5,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderColor: "#E0E0E0",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#212121",
    marginBottom: 4,
  },
  completed: {
    fontSize: 14,
    alignSelf: "flex-end",
    fontWeight: "bold",
  },
});
