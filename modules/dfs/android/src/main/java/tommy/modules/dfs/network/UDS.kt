package tommy.modules.dfs.network

import io.github.oshai.kotlinlogging.*
import java.net.*
import java.nio.ByteBuffer
import java.nio.channels.*
import java.nio.file.*
import kotlinx.coroutines.*
import kotlinx.coroutines.launch
import tommy.modules.dfs.logger
import tommy.modules.dfs.logging.*

class UDS(udsPath: Path = Paths.get("/tmp/central.sock")) {
    val udsPath = udsPath
    val address = UnixDomainSocketAddress.of(udsPath)

    @kotlin.time.ExperimentalTime
    fun startServer(): Unit = runBlocking {
        if (Files.exists(udsPath)) {
            Files.delete(udsPath)
        }

        val server = ServerSocketChannel.open(StandardProtocolFamily.UNIX)

        server.bind(address)

        logger.info { "Server listenning on $udsPath" }

        // CoroutineScope(Dispatchers.Default).launch {
        launch(Dispatchers.IO) {
            while (true) {
                val client = server.accept()
                val buffer = ByteBuffer.allocate(1024)
                val builder = StringBuilder()

                logger.info { "Server receives incoming" }

                var isEOP = false // flag for end of packet
                while (true) {
                    val n = client.read(buffer)
                    buffer.flip()

                    if (n == 0) {
                        isEOP = true
                    }

                    while (buffer.hasRemaining()) {
                        val byte = buffer.get()
                        when (byte.toInt()) {
                            0 -> {
                                isEOP = true
                                break
                            }
                            else -> {
                                builder.append(byte.toInt().toChar())
                            }
                        }
                    }

                    if (isEOP) {
                        break
                    }
                }

                val msg = LogMessage.parse(builder.toString())

                if (msg == null) {
                    continue
                }
                logger.info { "Received: ${msg.level}" }
            }
        }
    }
}
