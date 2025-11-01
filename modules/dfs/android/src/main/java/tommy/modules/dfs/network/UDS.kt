package tommy.modules.dfs.network

import android.net.*
import android.util.Log
import java.net.*
import java.nio.channels.*
import java.nio.file.*
import kotlinx.coroutines.*
import kotlinx.coroutines.launch
import tommy.modules.dfs.logging.*

class UDS(udsPath: String = "central.sock") {
    val udsPath = udsPath
    val socket = LocalServerSocket(udsPath)

    @kotlin.time.ExperimentalTime
    fun startServer(): Unit = runBlocking {
        Log.i("DFS", "Server listenning on $udsPath")

        // CoroutineScope(Dispatchers.Default).launch {
        launch(Dispatchers.IO) {
            while (true) {
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
            }
        }
    }
}
