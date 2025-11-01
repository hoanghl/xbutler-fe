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
    val socket = LocalServerSocket(udsPath)
    val module = module

    lateinit var udsJob: Job

    @kotlin.time.ExperimentalTime
    fun startServer(): Unit = runBlocking {
        Log.i("DFS", "Server listenning on $udsPath")

        udsJob =
                launch(Dispatchers.IO) {
                    while (true) {
                        if (!isActive) {
                            break
                        }

                        val client = socket.accept()!!
                        val builder = StringBuilder()

                        Log.i("DFS", "Server receives incoming")

                        client.inputStream.bufferedReader().use { reader ->
                            val byte = reader.read()
                            if (byte != 0 && byte != -1) {
                                builder.append(byte.toChar())
                            }
                        }

                        val msg = LogMessage.parse(builder.toString())

                        if (msg == null) {
                            continue
                        }
                        Log.i("DFS", "Received: ${msg.level}")

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
    }

    suspend fun stopUDSServer() {
        udsJob.cancel()
        udsJob.join()
    }
}
