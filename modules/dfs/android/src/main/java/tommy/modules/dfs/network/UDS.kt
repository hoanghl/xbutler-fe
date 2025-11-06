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
        Log.i("DFS", "Server listenning on $udsPath")

        udsJob =
                CoroutineScope(Dispatchers.IO).launch {
                    val client = serverSocket.accept()!!
                    val builder = StringBuilder()

                    Log.i("DFS", "Server receives incoming")

                    // client.inputStream.bufferedReader().use { reader ->
                    //     val byte = reader.read()
                    //     if (byte != 0 && byte != -1) {
                    //         builder.append(byte.toChar())
                    //     }
                    // }

                    while (true) {
                        if (!isActive) {
                            break
                        }

                        val received = client.inputStream.read()
                        when (received) {
                            0 -> {
                                val msg = LogMessage.parse(builder.toString())

                                if (msg != null) {

                                    // setLog(
                                    //         "Client: Received: ${logMsg.dt.toString()} -
                                    // ${logMsg.level} - ${logMsg.content}"
                                    // )
                                    Log.i("DFS", "Received: ${msg.level}")
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
                            }
                            else -> {
                                builder.append(received.toChar())
                            }
                        }
                    }

                    // val msg = LogMessage.parse(builder.toString())

                    // if (msg == null) {
                    //     continue
                    // }
                    // Log.i("DFS", "Received: ${msg.level}")

                    // module.sendEvent(
                    //         "log",
                    //         bundleOf(
                    //                 "level" to msg.level,
                    //                 "dt" to msg.dt.toString(),
                    //                 "content" to msg.content
                    //         )
                    // )
                }
    }

    suspend fun stopUDSServer() {
        udsJob.join()
    }
}
