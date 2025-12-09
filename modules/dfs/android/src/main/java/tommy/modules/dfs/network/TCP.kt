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
        fun stopDFS(portReceiver: Int): Unit {
            CoroutineScope(Dispatchers.IO).launch {
                // =================================================
                // 1. Craft packet 'OPERATION_STOP'
                // =================================================
                val packet = Packet.createGracefulShutdown()

                // =================================================
                // 2. Send packet to DFS
                // =================================================
                // TODO: HoangLe [Dec-07]: Replace the following hardcode IP with an automatic
                // IP-fetching mechanism

                Log.d(DfsModule.TAG_LOG, "portReceiver: $portReceiver")

                val socket = Socket("192.168.10.100", portReceiver)
                socket.use { socket.outputStream.write(packet.toBytes()) }
            }
        }

        fun fetchDFSStatus(portReceiver: Int): DFS_WORKING_STATUS {
            val portReceiverFrontEnd = portReceiver + 1
            var status = DFS_WORKING_STATUS.HEALTHY

            // Send packet 'Heartbeat' to DFS and wait for incoming HeartbeatAck
            val socketServer = ServerSocket()
            socketServer.soTimeout = 5000
            val socketClient = Socket("localhost", portReceiver)

            try {
                socketClient
                        .getOutputStream()
                        .write(Packet.createHeartbeat(portReceiverFrontEnd).toBytes())
                val incoming = socketServer.accept()

                var packet: Packet?
                BufferedInputStream(incoming.inputStream).use { reader ->
                    packet = Packet.parseFromStream(reader)
                }

                if (packet == null || packet!!.packetType != PacketType.HeartbeatAck) {}
            } catch (e: SocketTimeoutException) {
                status = DFS_WORKING_STATUS.NOT_OPERATED
            } finally {
                socketClient.close()
                socketServer.close()
            }

            return status
        }
    }
}
