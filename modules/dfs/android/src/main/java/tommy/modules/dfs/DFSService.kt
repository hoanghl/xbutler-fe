package tommy.modules.dfs

import android.app.Service
import android.content.Intent
import android.net.*
import android.os.IBinder
import kotlinx.serialization.Serializable
import kotlinx.serialization.encodeToString
import kotlinx.serialization.json.Json
import tommy.modules.dfs.network.TCP

@Serializable
data class Argument(val ipDns: IntArray, val portDns: Int, val port: Int, val role: String)

class DFSService : Service() {
    companion object {
        init {
            System.loadLibrary("dfs")
        }
    }

    external fun triggerDfs(args: String)

    lateinit var threadDFS: Thread
    lateinit var ipDNS: IntArray
    var portDNS: Int = 0
    var portReceiver: Int = 0

    override fun onStartCommand(intent: Intent?, flags: Int, startId: Int): Int {
        ipDNS = intent!!.getStringExtra("IpDNS")!!.split(".").map { it -> it.toInt() }.toIntArray()
        portDNS = intent.getIntExtra("PortDNS", 0).toInt()
        portReceiver = intent.getIntExtra("PortReceiver", 0).toInt()

        // 1. Initialize 'threadDFS'
        val argument = Argument(ipDNS, portDNS, portReceiver, "DATA")
        val argStr = Json.encodeToString<Argument>(argument)

        threadDFS = Thread { triggerDfs(argStr) }

        // 2. Start 'threadDFS'
        threadDFS.start()

        return START_STICKY
    }

    override fun onDestroy() {
        TCP.stopDFS(portReceiver)

        threadDFS.join()

        super.onDestroy()
    }

    override fun onBind(p0: Intent?): IBinder? {
        return null
    }
}
