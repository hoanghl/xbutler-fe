package com.tommy.network

class Packet(packetType: PacketType) {
    val packetType: PacketType = packetType

    companion object Factory {
        fun parseFromStream(): Packet {
            // TODO: HoangLe [Oct-27]: Implement this
            TODO("Implement this")
        }

        fun createHeartbeat(): Packet {
            return Packet(PacketType.Heartbeat)
        }

        fun createGracefulShutdown(): Packet {
            return Packet(PacketType.GracefulShutdown)
        }
    }
}
