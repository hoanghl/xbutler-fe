package tommy.modules.dfs

import android.app.Service
import android.content.Intent
import android.net.*
import android.os.IBinder

class DFSService : Service() {
    lateinit var threadDFS: Thread

    override fun onStartCommand(intent: Intent?, flags: Int, startId: Int): Int {
        // TODO: HoangLe [Nov-01]: Implement this
        val ipDNS = intent!!.getByteArrayExtra("IpDNS")
        val portDNS = intent.getIntExtra("PortDNS", 0)
        val portReceiver = intent.getIntExtra("PortReceiver", 0)

        // 1. Initialize 'threadDFS'
        // TODO: HoangLe [Nov-01]: Use above values to start DFS

        // 2. Start 'threadDFS'

        return START_STICKY
    }

    override fun onDestroy() {
        // TODO: HoangLe [Nov-01]: Implement this
        // =================================================
        // 1. Craft packet 'OPERATION_STOP'
        // =================================================
        // TODO: HoangLe [Nov-01]: Continue implementing
        // val packetStop = Packet()

        // =================================================
        // 2. Send packet to DFS
        // =================================================
    }

    override fun onBind(p0: Intent?): IBinder? {
        return null
    }
}
