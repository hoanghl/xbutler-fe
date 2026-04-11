import { StyleSheet, Text, View } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

export default function UploadScreen() {
  return (
    <SafeAreaView style={styles.outerView}>
      <View style={styles.view}>
        <Text style={styles.title}>Upload</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  outerView: {
    justifyContent: "center",
    flex: 1,
  },
  view: { backgroundColor: "yellow", flex: 1, margin: 20 },
  title: {
    fontSize: 40,
    fontWeight: "bold",
    alignSelf: "stretch",
    textAlign: "center",
  },
});
