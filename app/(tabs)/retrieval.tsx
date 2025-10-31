import { StyleSheet, Text, View } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

export default function RetrievalScreen() {
  return (
    <SafeAreaView style={styles.outerView}>
      <View style={styles.view}>
        <Text style={styles.title}>Retrieval</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  outerView: {
    justifyContent: "center",
    flex: 1,
  },
  view: { backgroundColor: "green", flex: 1, margin: 20 },
  title: {
    fontSize: 40,
    fontWeight: "bold",
    alignSelf: "stretch",
    textAlign: "center",
  },
});
