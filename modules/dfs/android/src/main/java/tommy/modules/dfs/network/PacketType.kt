package tommy.modules.dfs.network

enum class PacketType {
    Heartbeat,
    HeartbeatAck,
    RequestSendReplica,
    SendReplica,
    SendReplicaAck,
    AskIP,
    AskIPAck,
    RequestFromClient,
    ResponseNodeIp,
    ClientUpload,
    DataNodeSendData,
    ClientRequestAck,
    StateSync,
    StateSyncAck,
    Notify,
    ClientUploadAck,
    GracefulShutdown
}
