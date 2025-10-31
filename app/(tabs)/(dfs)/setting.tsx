import { useState } from "react";
import { StyleSheet, Switch, Text, TextInput, View } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

export default function DFSSettingScreen() {
  const [isStarted, setIsStarted] = useState<boolean>(false);
  const [portDNS, setPortDNS] = useState<number>();
  const [portReceiver, setPortReceiver] = useState<number>();
  const [ipDNS, setIpDNS] = useState<string>();

  const parseIp = (text: String): boolean => {
    return false;
  };

  const renderStatus = () => (
    <View
      style={{
        flexDirection: "row",
        marginTop: 20,
        justifyContent: "space-between",
      }}
    >
      <Text style={{ fontWeight: "bold", fontSize: 28 }}>DFS</Text>
      <Switch
        trackColor={{ false: "#767577", true: "#10c10080" }}
        onValueChange={() => {
          if (!ipDNS || !parseIp(ipDNS)) {
            Toast.show({
              type: "error",
              text1: "Error as parsing IP",
              text2: "Ama",
            });
          } else {
            setIsStarted(!isStarted);
          }
        }}
        value={isStarted}
      />
    </View>
  );

  const renderInputIp = () => (
    <View>
      <Text>DNS IP</Text>
      <TextInput
        keyboardType="numeric"
        style={
          isStarted ? styles.textInputUnedittable : styles.textInputEdittable
        }
        editable={!isStarted}
      />
    </View>
  );

  const renderPortField = (fieldName: string, fn: (text: string) => void) => (
    <View
      style={{
        alignItems: "stretch",
        width: "45%",
      }}
    >
      <Text style={{}}>{fieldName}</Text>
      <TextInput
        keyboardType="numeric"
        style={
          isStarted ? styles.textInputUnedittable : styles.textInputEdittable
        }
        editable={!isStarted}
        onChangeText={fn}
      />
    </View>
  );

  return (
    <SafeAreaView style={styles.outerView}>
      <View style={styles.view}>
        <Text style={styles.title}>Setting</Text>
        {renderInputIp()}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          {renderPortField("Port DNS", (text: string) => {
            setPortDNS(parseInt(text));
          })}
          {renderPortField("Port Receiver", (text: string) => {
            setPortReceiver(parseInt(text));
          })}
        </View>
        {renderStatus()}

        {!isStarted ? null : <Text>Port DNS: {portDNS}</Text>}
      </View>
      <Toast />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  outerView: {
    justifyContent: "center",
    flex: 1,
    // padding: 10,
  },
  view: {
    backgroundColor: "#e3f4cfff",
    flex: 1,
    margin: 20,
    padding: 10,
    borderRadius: 10,
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
    alignSelf: "stretch",
    textAlign: "center",
    marginBottom: 10,
  },
  textInputEdittable: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginVertical: 10,
    color: "#000000ff",
    fontStyle: "normal",
  },
  textInputUnedittable: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginVertical: 10,
    color: "#727272ff",
    fontStyle: "italic",
  },
});
