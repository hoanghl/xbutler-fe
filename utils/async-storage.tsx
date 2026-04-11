import AsyncStorage from "@react-native-async-storage/async-storage";

export class AsyncStorageUtils {
  static readonly KEY_IP_DNS = "IP_DNS";
  static readonly KEY_PORT_DNS = "PORT_DNS";
  static readonly KEY_PORT_RECEIVER = "PORT_RECEIVER";

  static async getIpDns(): Promise<string | null> {
    return await AsyncStorage.getItem(this.KEY_IP_DNS);
  }

  static async setIpDns(ipDNS: string) {
    await AsyncStorage.setItem(this.KEY_IP_DNS, ipDNS);
  }

  static async getPortDns(): Promise<number | null> {
    return Number(await AsyncStorage.getItem(this.KEY_PORT_DNS));
  }

  static async setPortDns(portDns: string) {
    await AsyncStorage.setItem(this.KEY_PORT_DNS, portDns);
  }

  static async getPortRecevier(): Promise<number | null> {
    return Number(await AsyncStorage.getItem(this.KEY_PORT_DNS));
  }

  static async setPortReceiver(portReceiver: string) {
    await AsyncStorage.setItem(this.KEY_PORT_DNS, portReceiver);
  }
}
