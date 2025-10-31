import { LogLevel, LogMessage } from "@/models/log-message";
import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import LogMessageComponent from "../../../components/log-message";

export default function RetrievalScreen() {
  const [items, setItems] = useState<LogMessage[]>([
    new LogMessage(LogLevel.DEBUG, "fsdkfhs"),
  ]);

  const onClear = () => {
    setItems([]);
  };

  return (
    <SafeAreaView style={styles.outerView}>
      <Text style={styles.title}>Retrieval</Text>
      <ScrollView style={styles.scrollview}>
        {items.map((log, idx) => LogMessageComponent({ message: log }))}
      </ScrollView>

      <Pressable onPress={onClear} style={styles.buttonClear}>
        <Text style={styles.buttonClearContent}>Clear</Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  outerView: {
    justifyContent: "center",
    flex: 1,
    margin: 20,
  },
  scrollview: {
    backgroundColor: "#e3f4cfff",
    flex: 1,
    padding: 10,
    borderRadius: 10,
  },
  title: {
    marginVertical: 10,
    fontSize: 40,
    fontWeight: "bold",
    alignSelf: "stretch",
    textAlign: "center",
  },
  buttonClear: {
    alignSelf: "flex-end",
    marginTop: 10,
    width: "auto",
    borderWidth: 2,
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 20,
  },
  buttonClearContent: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
