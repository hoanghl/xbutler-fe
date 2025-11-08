package tommy.modules.dfs.network

import android.net.*
import android.util.Log
import androidx.core.os.bundleOf
import expo.modules.kotlin.modules.Module
import java.net.*
import java.nio.channels.*
import java.nio.file.*
import kotlinx.coroutines.*
import kotlinx.coroutines.launch
import tommy.modules.dfs.logging.*

class UDS(module: Module, udsPath: String = "central.sock") {
    val udsPath = udsPath
    val serverSocket = LocalServerSocket(udsPath)
    val module = module

    lateinit var udsJob: Job

    @kotlin.time.ExperimentalTime
    fun startUDSServer() {
        Log.i("DFS", "UDS server listenning on $udsPath")

        udsJob =
                CoroutineScope(Dispatchers.IO).launch {
                    while (isActive) {
                        val client = serverSocket.accept()!!

                        client.use {
                            val builder = StringBuilder()
                            val bufferedStream = client.inputStream.buffered()

                            while (true) {
                                val received = bufferedStream.read()
                                Log.i("DFS", "Server receives incoming: $received")
                                when (received) {
                                    0 -> {
                                        val msg = LogMessage.parse(builder.toString())

                                        if (msg != null) {
                                            builder.clear()

                                            module.sendEvent(
                                                    "log",
                                                    bundleOf(
                                                            "level" to msg.level,
                                                            "dt" to msg.dt.toString(),
                                                            "content" to msg.content
                                                    )
                                            )
                                        }

                                        break
                                    }
                                    -1 -> break
                                    else -> {
                                        builder.append(received.toChar())
                                    }
                                }
                            }
                        }
                    }

                    Log.i("DFS", "UDS server is stopping")
                }
    }

    suspend fun triggerUDSGracefulShutdown() {
        val socket = LocalSocket()
        socket.connect(LocalSocketAddress(udsPath, LocalSocketAddress.Namespace.ABSTRACT))

        socket.use { socket.outputStream.buffered().write(0) }
    }

    suspend fun stopUDSServer() {
        Log.i("DFS", "Start stopUDSServer")

        serverSocket.close()
        udsJob.cancel()
        triggerUDSGracefulShutdown()
        udsJob.join()
    }
}
