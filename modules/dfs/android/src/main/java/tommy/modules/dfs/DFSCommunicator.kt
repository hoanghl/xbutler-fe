package expo.modules.myrustmodule

import android.app.Service
import android.content.Intent
import android.net.*
import android.os.IBinder

/**
 * Handle communication actions with DFS via UDS including starting/stopping DFS and receiving log
 * message from DFS
 */
class DFSCommunicator : Service() {

    override fun onStartCommand(intent: Intent?, flags: Int, startId: Int): Int {
        // serviceEntity.onStart()
        // TODO: HoangLe [Nov-01]: Implement this

        return START_STICKY
    }

    override fun onDestroy() {
        // TODO: HoangLe [Nov-01]: Implement this
        // serviceEntity.onStop()
    }

    override fun onBind(p0: Intent?): IBinder? {
        return null
    }

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
