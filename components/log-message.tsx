import { StyleSheet, Text, View } from "react-native";
import { LogLevel, LogMessage } from "../models/log-message";

type Props = {
  message: LogMessage;
};

export default function LogMessageComponent({ message }: Props) {
  let logLevelColor: string;
  switch (message.level) {
    case LogLevel.ERROR:
      logLevelColor = styles.loglevelERROR.color;
      break;
    case LogLevel.WARN:
      logLevelColor = styles.loglevelWARN.color;
      break;
    case LogLevel.INFO:
      logLevelColor = styles.loglevelINFO.color;
      break;
    case LogLevel.DEBUG:
      logLevelColor = styles.loglevelDEBUG.color;
      break;
    case LogLevel.TRACE:
      logLevelColor = styles.loglevelTRACE.color;
      break;
  }

  const timeOptions: Intl.DateTimeFormatOptions = {
    month: "short",
    day: "2-digit",
  };
  const hourStr = message.dt.getHours().toString().padStart(2, "0");
  const minStr = message.dt.getMinutes().toString().padStart(2, "0");
  const secStr = message.dt.getSeconds().toString().padStart(2, "0");
  const miliSecStr = message.dt.getMilliseconds().toPrecision(3);
  const formattedDatetime: string = `${message.dt.toLocaleString(
    "en-US",
    timeOptions
  )} ${hourStr}:${minStr}:${secStr}.${miliSecStr}`;
  const key = `${formattedDatetime} - ${message.content.slice(0, 20)}`;

  return (
    <View style={styles.container} key={key}>
      <View style={{ flexDirection: "row" }}>
        <Text style={{ ...styles.loglevel, color: logLevelColor }}>
          [{LogLevel[message.level]}]
        </Text>
        <Text style={styles.datetime}>{formattedDatetime}</Text>
      </View>
      <Text style={styles.content}>{message.content}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 2,
    alignItems: "flex-start",
  },
  loglevel: {
    fontSize: 14,
  },
  loglevelERROR: {
    color: "#f94949ff",
  },
  loglevelWARN: {
    color: "#e6fd3bff",
  },
  loglevelINFO: {
    color: "#3fe142ff",
  },
  loglevelDEBUG: {
    color: "#4357eeff",
  },
  loglevelTRACE: {
    color: "#ec60f6ff",
  },

  datetime: {
    marginLeft: 5,
    fontStyle: "italic",
  },

  content: {
    marginLeft: 8,
  },
});
