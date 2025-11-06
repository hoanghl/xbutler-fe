import { IP } from "@/models/ip";
import { useState } from "react";
import { StyleSheet, Switch, Text, TextInput, View } from "react-native";

import * as DfsModule from "../../../modules/dfs";

import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

export default function DFSSettingScreen() {
  const [isStarted, setIsStarted] = useState<boolean>(false);
  const [portDNS, setPortDNS] = useState<number>(0);
  const [portReceiver, setPortReceiver] = useState<number>(0);
  const [ipDNS, setIpDNS] = useState<string>("");

  const _parsePort = (text: string): number | null => {
    try {
      const port = parseInt(text);
      if (port < 0 || port > 65535) {
        console.error(
          `Error as parsing port: Port not in inclusive range [0, 65535]: ${port}`
        );
        return null;
      }
      return port;
    } catch (error) {
      console.error(`Error as parsing port: ${error}`);

      return null;
    }
  };

  const onStartDFS = () => {
    // Parse IP and ports
    const ip = IP.parseFromString(ipDNS);
    if (ip === null) {
      Toast.show({
        type: "error",
        text1: "Error as parsing IP",
      });

      return;
    }

    if (portDNS < 0 || portDNS > 65535) {
      Toast.show({
        type: "error",
        text1: "Error as parsing port DNS",
      });

      return;
    }

    if (portReceiver < 0 || portReceiver > 65535) {
      Toast.show({
        type: "error",
        text1: "Error as parsing port Receiver",
      });

      return;
    }

    // Triger DFS
    setIsStarted(!isStarted);
    DfsModule.default.startDFS(ipDNS, portDNS, portReceiver);
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
        onValueChange={onStartDFS}
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
        onChangeText={(text) => setIpDNS(text)}
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
