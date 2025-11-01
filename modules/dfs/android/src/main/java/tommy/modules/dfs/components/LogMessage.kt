import android.util.Log
import kotlin.time.Clock
import kotlinx.datetime.LocalDateTime
import kotlinx.datetime.TimeZone
import kotlinx.datetime.format.*
import kotlinx.datetime.toLocalDateTime

enum class LogLevel {
    ERROR,
    WARN,
    INFO,
    DEBUG,
    TRACE
}

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
                Log.e("MyRustModule", e.toString())
                return null
            }

            var level: LogLevel
            try {
                level = LogLevel.valueOf(msg.slice(17..21).removeSuffix(" "))
            } catch (e: IllegalArgumentException) {
                Log.e("MyRustModule", e.toString())
                return null
            }
            val content = msg.slice(22..msg.length - 1)

            return LogMessage(level, content, dt)
        }
    }
}
