import { IP } from "@/models/ip";
import { useFocusEffect } from "expo-router";
import { useState } from "react";
import { StyleSheet, Switch, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

import { AsyncStorage } from "@/utils/async-storage";
import * as DfsModule from "../../../modules/dfs";
import { DFS_WORKING_STATUS } from "../../../modules/dfs";

const INTERVAL_STATUS_FETCH = 2000.0; // in miliseconds

export default function DFSSettingScreen() {
  const [isStarted, setIsStarted] = useState<boolean>(false);
  const [portDNS, setPortDNS] = useState<number>(0);
  const [portReceiver, setPortReceiver] = useState<number>(0);
  const [ipDNS, setIpDNS] = useState<string>("");

  const fetchDfsStatus = (): DFS_WORKING_STATUS => {
    const status_raw = DfsModule.getDFSStatus();
    return Object.values(DFS_WORKING_STATUS).includes(
      status_raw as DFS_WORKING_STATUS
    )
      ? (status_raw as DFS_WORKING_STATUS)
      : DFS_WORKING_STATUS.NOT_OPERATED;
  };

  useFocusEffect(() => {
    const id = setInterval(() => {
      let ipDns: string | undefined = "";
      let portDns: number | undefined = -1;
      let portReceiver: number | undefined = -1;
      let isStarted = false;

      // 1. Fetch status by invoking native function
      // 2. Based on fetched status, behave differently
      switch (fetchDfsStatus()) {
        case DFS_WORKING_STATUS.HEALTHY:
          // Load configurations from async storage
          let isLoadedConfigSuccessfully = true;

          ipDns = AsyncStorage.IP_DNS;
          if (ipDns === undefined) {
            Toast.show({
              type: "error",
              text1: "Error as retrieving IP of DNS from async storage",
            });
            isLoadedConfigSuccessfully = false;
          }

          portDns = AsyncStorage.PORT_DNS;
          if (portDns === undefined && isLoadedConfigSuccessfully) {
            Toast.show({
              type: "error",
              text1: "Error as retrieving port of DNS from async storage",
            });
            isLoadedConfigSuccessfully = false;
          }

          portReceiver = AsyncStorage.PORT_RECEIVER;
          if (portReceiver === undefined) {
            Toast.show({
              type: "error",
              text1: "Error as retrieving receiver's port from async storage",
            });
            isLoadedConfigSuccessfully = false;
          }

          if (isLoadedConfigSuccessfully) {
            isStarted = true;
          }

          break;
        case DFS_WORKING_STATUS.NOT_OPERATED: {
          Toast.show({
            type: "error",
            text1: "Error as parsing IP",
          });
        }

        default:
          break;
      }

      setIsStarted(isStarted);
      setIpDNS(ipDNS);
      setPortDNS(portDNS);
      setPortReceiver(portReceiver);
    }, INTERVAL_STATUS_FETCH);

    return () => clearInterval(id);
  });

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

    // TODO: HoangLe [Dec-14]: Store newly parsed configurations to async storage
    AsyncStorage.IP_DNS(ipDNS!);

    // Triger DFS
    setIsStarted(!isStarted);
    DfsModule.startDFS(ipDNS, portDNS, portReceiver);
  };

  const onStopDfs = () => {
    setIsStarted(!isStarted);
    DfsModule.stopDFS();
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
        onValueChange={!isStarted ? onStartDFS : onStopDfs}
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
