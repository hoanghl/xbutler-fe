package tommy.modules.dfs.network

import android.util.Log
import java.io.BufferedInputStream
import java.nio.ByteBuffer
import java.nio.ByteOrder

enum class PacketType(val packetId: Int) {
    Heartbeat(1),
    HeartbeatAck(2),
    RequestSendReplica(3),
    SendReplica(4),
    SendReplicaAck(5),
    AskIP(6),
    AskIPAck(7),
    RequestFromClient(8),
    ResponseNodeIp(9),
    ClientUpload(10),
    DataNodeSendData(11),
    ClientRequestAck(12),
    StateSync(13),
    StateSyncAck(14),
    Notify(15),
    ClientUploadAck(16),
    GracefulShutdown(17),
    StatuService(18),
    StatuServiceAck(19);

    companion object {
        private val entries = values().associateBy(PacketType::packetId)

        fun fromInt(value: Int): PacketType? = PacketType.Companion.entries[value]
    }
}

class Packet(packetType: PacketType) {
    val packetType: PacketType = packetType
    var payload: MutableList<Byte> = mutableListOf()

    companion object Factory {
        fun parseFromStream(reader: BufferedInputStream): Packet? {
            var byte = reader.read()
            val packetType = PacketType.fromInt(byte)
            if (packetType == null) {
                Log.e("DFS", "Error as converting packet type from received byte: ${byte}")

                return null
            }

            return Packet(packetType)
        }

        fun createStatuService(portReceiver: Int): Packet {
            var packet = Packet(PacketType.Heartbeat)
            packet.payload.addAll(Packet.cvtInt2BEByteArray(portReceiver).toList())

            return packet
        }

        fun createGracefulShutdown(): Packet {
            return Packet(PacketType.GracefulShutdown)
        }

        fun cvtInt2BEByteArray(num: Int): ByteArray {
            return ByteBuffer.allocate(4).order(ByteOrder.BIG_ENDIAN).putInt(num).array()
        }
    }

    fun toBytes(): ByteArray {
        var output = mutableListOf<Byte>()

        output.addAll(Packet.cvtInt2BEByteArray(packetType.ordinal).toList())
        output.addAll(payload)

        return output.toByteArray()
    }
}
