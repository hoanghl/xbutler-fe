package expo.modules.myrustmodule

import android.net.*

/**
 * Handle communication actions with DFS via UDS including starting/stopping DFS and receiving log
 * message from DFS
 */
class DFSCommunicator {

    lateinit var threadDFS: Thread
    var clientSocket = LocalSocket()

    fun startDFS() {
        // 1. Initialize 'threadDFS'

        // 2. Start 'threadDFS'
    }

    fun stopDFS() {
        // =================================================
        // 1. Craft packet 'OPERATION_STOP'
        // =================================================
        // TODO: HoangLe [Nov-01]: Continue implementing
        // val packetStop = Packet()

        // =================================================
        // 2. Send packet to DFS
        // =================================================

    }
}
