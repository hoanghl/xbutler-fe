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

  static async getPortDns(): Promise<string | null> {
    return await AsyncStorage.getItem(this.KEY_PORT_DNS);
  }

  static async setPortDns(portDns: string) {
    await AsyncStorage.setItem(this.KEY_PORT_DNS, portDns);
  }

  static get PORT_DNS(): number | null {
    // TODO: HoangLe [Dec-09]: Retrieve from local async storage
  }

  static set PORT_DNS(portDNS: number) {
    // TODO: HoangLe [Dec-09]: Assign from local async storage
  }

  static get PORT_RECEIVER(): number | null {
    // TODO: HoangLe [Dec-09]: Retrieve from local async storage
  }

  static set PORT_RECEIVER(portReceiver: number) {
    // TODO: HoangLe [Dec-09]: Assign from local async storage
  }
}
