package tommy.modules.dfs.logging

import kotlin.time.Clock
import kotlinx.datetime.LocalDateTime
import kotlinx.datetime.TimeZone
import kotlinx.datetime.format.*
import kotlinx.datetime.toLocalDateTime
import tommy.modules.dfs.logger

@kotlin.time.ExperimentalTime
class LogMessage(
        val level: LogLevel,
        val content: String,
        val dt: LocalDateTime = Clock.System.now().toLocalDateTime(TimeZone.currentSystemDefault())
) {

    companion object {
        val DT_FORMAT =
                LocalDateTime.Format {
                    year()
                    monthNumber()
                    day()

                    hour()
                    minute()
                    second()
                    secondFraction(3, 3)
                }

        fun parse(msg: String): LogMessage? {
            var dt: LocalDateTime
            try {
                dt = LocalDateTime.parse(msg.slice(0..16), DT_FORMAT)
            } catch (e: IllegalArgumentException) {
                logger.error { e }
                return null
            }

            var level: LogLevel
            try {
                level = LogLevel.valueOf(msg.slice(17..21).removeSuffix(" "))
            } catch (e: IllegalArgumentException) {
                logger.error { e }
                return null
            }
            val content = msg.slice(22..msg.length - 1)

            return LogMessage(level, content, dt)
        }
    }

    override fun toString(): String {
        val dtString =
                "%4d%02d%02d%02d%02d%02d%3.0f".format(
                        dt.year,
                        dt.month.ordinal + 1,
                        dt.day,
                        dt.hour,
                        dt.minute,
                        dt.second,
                        dt.nanosecond / 1e6
                )
        return "${dtString}${level.toString().padEnd(5)}${content}"
    }
}
