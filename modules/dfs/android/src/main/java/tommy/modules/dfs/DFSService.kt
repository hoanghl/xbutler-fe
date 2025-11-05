package tommy.modules.dfs

import android.app.Service
import android.content.Intent
import android.net.*
import android.os.IBinder
import tommy.modules.dfs.network.TCP

class DFSService : Service() {
    lateinit var threadDFS: Thread
    lateinit var ipDNS: String
    var portDNS: Int = 0
    var portReceiver: Int = 0

    override fun onStartCommand(intent: Intent?, flags: Int, startId: Int): Int {
        ipDNS = intent!!.getStringExtra("IpDNS")!!
        portDNS = intent.getIntExtra("PortDNS", 0).toInt()
        portReceiver = intent.getIntExtra("PortReceiver", 0).toInt()

        // 1. Initialize 'threadDFS'
        // TODO: HoangLe [Nov-01]: Use above values to start DFS

        // 2. Start 'threadDFS'
        // TODO: HoangLe [Nov-01]: Implement this

        return START_STICKY
    }

    override fun onDestroy() {
        TCP.stopDFS(portReceiver)

        threadDFS.join()
    }

    override fun onBind(p0: Intent?): IBinder? {
        return null
    }
}
