import * as Notifications from "expo-notifications";
import * as Log from "./log";

export async function requestPermissionNoti() {
  const { status } = await Notifications.requestPermissionsAsync();

  if (status !== "granted") {
    Log.error("Unable to request permission: NOTIFICATIONS");
  }
}
