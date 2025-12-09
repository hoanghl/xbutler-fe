package tommy.modules.dfs

import android.app.NotificationChannel
import android.app.NotificationManager
import android.app.Service
import android.content.Context
import android.content.Intent
import android.content.pm.ServiceInfo
import android.net.*
import android.os.IBinder
import android.util.Log
import androidx.core.app.NotificationCompat
import androidx.core.app.ServiceCompat
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

        const val NOTIFICATION_CHANNEL_ID = "NOTI_CHANNEL"
        const val NOTIFICATION_CHANNEL_NAME = "DFS foreground service channel"
        const val NOTIFICATION_ID = 1

        var isServiceCreated = false
    }

    external fun triggerDfs(args: String)

    lateinit var threadDFS: Thread
    lateinit var ipDNS: IntArray
    var portDNS: Int = 0
    var portReceiver: Int = 0

    override fun onStartCommand(intent: Intent?, flags: Int, startId: Int): Int {
        if (DFSService.isServiceCreated == true) {
            return START_NOT_STICKY
        }

        ipDNS = intent!!.getStringExtra("IpDNS")!!.split(".").map { it -> it.toInt() }.toIntArray()
        portDNS = intent.getIntExtra("PortDNS", 0).toInt()
        portReceiver = intent.getIntExtra("PortReceiver", 0).toInt()

        // 1. Initialize 'threadDFS'
        val argument = Argument(ipDNS, portDNS, portReceiver, "DATA")
        val argStr = Json.encodeToString<Argument>(argument)

        threadDFS = Thread { triggerDfs(argStr) }

        // 2. Declare and start foreground service-related stuffs
        val channel =
                NotificationChannel(
                        NOTIFICATION_CHANNEL_ID,
                        NOTIFICATION_CHANNEL_NAME,
                        NotificationManager.IMPORTANCE_DEFAULT
                )
        // service provided by Android Operating system to show notification outside of our app
        val notificationManager =
                getSystemService(Context.NOTIFICATION_SERVICE) as NotificationManager
        notificationManager.createNotificationChannel(channel)

        val notification =
                NotificationCompat.Builder(this, NOTIFICATION_CHANNEL_ID)
                        .setSmallIcon(R.drawable.ic_launcher_background)
                        .setContentTitle("DFS Foreground Service")
                        .setContentText("Foreground service is running")
                        .setPriority(NotificationCompat.PRIORITY_DEFAULT)
                        .build()

        // Start the service in the foreground
        ServiceCompat.startForeground(
                this,
                NOTIFICATION_ID,
                notification,
                ServiceInfo.FOREGROUND_SERVICE_TYPE_SPECIAL_USE
        )

        // 3. Start 'threadDFS'
        threadDFS.start()
        Log.d(DfsModule.TAG_LOG, "Foreground service created")

        return super.onStartCommand(intent, flags, startId)
    }

    override fun onDestroy() {
        if (!::threadDFS.isInitialized) {
            return
        }

        TCP.stopDFS(portReceiver)

        threadDFS.join()

        DFSService.isServiceCreated = false

        super.onDestroy()
    }

    override fun onBind(p0: Intent?): IBinder? {
        return null
    }
}
