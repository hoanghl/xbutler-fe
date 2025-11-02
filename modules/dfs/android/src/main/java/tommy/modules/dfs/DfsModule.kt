package tommy.modules.dfs

import android.content.Intent
import android.net.*
import android.util.Log
import com.facebook.react.bridge.ReadableArray
import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition
import java.net.*
import java.nio.channels.*
import java.nio.file.*
import kotlinx.coroutines.*
import tommy.modules.dfs.logging.*
import tommy.modules.dfs.network.*

class DfsModule : Module() {
    val udsController = UDS(this@DfsModule)

    lateinit var ipDNS: String
    var portDNS: Int = 0
    var portReceiver: Int = 0

    @kotlin.time.ExperimentalTime
    override fun definition() = ModuleDefinition {
        Name("Dfs")

        // Defines event names that the module can send to JavaScript.
        Events("log")

        Function("startDFS") { rawIpDNS: String, portDNS: Int, portReceiver: Int ->
            if (!checkIp(rawIpDNS)) {
                Log.e("DFS", "Invalid passed Ip")

                return@Function
            }
            this@DfsModule.ipDNS = rawIpDNS
            this@DfsModule.portDNS = portDNS
            this@DfsModule.portReceiver = portReceiver

            // =================================================
            // Start service
            // =================================================

            val reactContext = appContext.reactContext!!
            val intent =
                    Intent(reactContext, DFSService::class.java).apply {
                        putExtra("IpDNS", ipDNS)
                        putExtra("portDNS", portDNS)
                        putExtra("portReceiver", portReceiver)
                    }
            reactContext.startService(intent)

            // =================================================
            // Start UDS server to receive log
            // =================================================
            udsController.startUDSServer()
        }

        Function("stopDFS") {
            runBlocking {
                val reactContext = appContext.reactContext!!
                reactContext.stopService(Intent(reactContext, DFSService::class.java))

                udsController.stopUDSServer()
            }
        }

        Function("getDFSStatus") {
            return@Function TCP.fetchDFSStatus(portReceiver).name
        }
    }

    /**
     * Check if received IP is IpV4 formt
     */
    private fun checkIp(rawIp: String): Boolean {
        var isValidIp = true
        try {
            val output = rawIp.split(".").map { it -> it.toByte() }
            if (output.size != 4) {
                isValidIp = false
            }
        } catch (e) {
            isValidIp = false
        }

        return isValidIp
    }
}
