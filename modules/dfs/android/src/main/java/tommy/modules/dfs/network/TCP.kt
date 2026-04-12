package tommy.modules.dfs.network

import android.net.*
import android.util.Log
import java.io.*
import java.net.*
import java.net.Socket
import java.nio.channels.*
import java.nio.file.*
import kotlinx.coroutines.*
import tommy.modules.dfs.DfsModule
import tommy.modules.dfs.logging.*

enum class DFS_WORKING_STATUS {
    HEALTHY,
    NOT_OPERATED
}

class TCP {
    companion object {
        fun stopDFS(portReceiver: Int, ipLocal: String): Unit {
            CoroutineScope(Dispatchers.IO).launch {
                // =================================================
                // 1. Craft packet 'OPERATION_STOP'
                // =================================================
                val packet = Packet.createGracefulShutdown()

                // =================================================
                // 2. Send packet to DFS
                // =================================================

                Log.d(DfsModule.TAG_LOG, "ipLocal: $ipLocal")

                try {
                    val socket = Socket(ipLocal, portReceiver)
                    socket.use { socket.outputStream.write(packet.toBytes()) }
                } catch (e: Exception) {
                    Log.d(DfsModule.TAG_LOG, e.toString())
                }
            }
        }

        private suspend fun fetchDFSStatusServer(
                ipCurrentDevice: String,
                portReceiver: Int,
                serverReady: CompletableDeferred<Unit>,
                timeout: Int = 10_000
        ): DFS_WORKING_STATUS {
            var status = DFS_WORKING_STATUS.HEALTHY

            val socketServer = ServerSocket()
            socketServer.soTimeout = timeout
            socketServer.bind(InetSocketAddress(ipCurrentDevice, portReceiver))
            serverReady.complete(Unit)

            val incoming = socketServer.accept()

            try {
                var packet: Packet?
                BufferedInputStream(incoming.inputStream).use { reader ->
                    packet = Packet.parseFromStream(reader)
                }

                Log.d(DfsModule.TAG_LOG, "fetchDFSStatus: here 4")

                if (packet == null || packet!!.packetType != PacketType.HeartbeatAck) {
                    // TODO: HoangLe [Jan-01]: Do something herere

                    Log.d(DfsModule.TAG_LOG, "fetchDFSStatus: here 5")
                    Log.d(DfsModule.TAG_LOG, "fetchDFSStatus: packet: ${packet?.packetType}")
                }
            } catch (e: SocketTimeoutException) {
                status = DFS_WORKING_STATUS.NOT_OPERATED

                Log.d(DfsModule.TAG_LOG, "fetchDFSStatus: here 6")
            } finally {
                socketServer.close()
            }

            return status
        }

        private suspend fun fetchDFSStatusClient(ipCurrentDevice: String, portReceiver: Int): Unit {
            val socketClient = Socket(ipCurrentDevice, portReceiver)
            socketClient.getOutputStream().write(Packet.createHeartbeat(portReceiver).toBytes())

            socketClient.close()
        }

        fun fetchDFSStatus(portReceiver: Int, ipCurrentDevice: String): DFS_WORKING_STATUS =
                runBlocking<DFS_WORKING_STATUS> {
                    val portReceiverFrontEnd = portReceiver + 1
                    val serverReady = CompletableDeferred<Unit>()

                    // Start listening server
                    val status_defered =
                            CoroutineScope(Dispatchers.IO).async {
                                fetchDFSStatusServer(ipCurrentDevice, portReceiverFrontEnd, serverReady)
                            }

                    // Wait until server is bound before sending heartbeat
                    serverReady.await()

                    // Send packet 'Heartbeat' to DFS and wait for incoming HeartbeatAck
                    fetchDFSStatusClient(ipCurrentDevice, portReceiverFrontEnd)

                    // Fetch result from server
                    val status = status_defered.await()

                    Log.d(DfsModule.TAG_LOG, "fetchDFSStatus: here 7")

                    status
                }
    }
}
