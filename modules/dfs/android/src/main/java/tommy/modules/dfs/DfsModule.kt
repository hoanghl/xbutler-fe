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
import tommy.modules.dfs.network.UDS

class DfsModule : Module() {
  val socket = LocalServerSocket("central.sock")
  val udsController = UDS(this@DfsModule)

  @kotlin.time.ExperimentalTime
  override fun definition() = ModuleDefinition {
    Name("Dfs")

    // Defines event names that the module can send to JavaScript.
    Events("log")

    Function("startDFS") { rawIpDNS: ReadableArray, portDNS: Int, portReceiver: Int ->
      // =================================================
      // Start service
      // =================================================
      if (rawIpDNS.size() != 4) {
        Log.e(
                "DFS",
                "Received octet array of IP should have 4 elements. Got only ${rawIpDNS.size()} elements"
        )

        return@Function
      }

      val reactContext = appContext.reactContext!!
      val intent =
              Intent(reactContext, DFSService::class.java).apply {
                putExtra("IpDNS", rawIpDNS.toArrayList())
                putExtra("portDNS", portDNS)
                putExtra("portReceiver", portReceiver)
              }
      reactContext.startService(intent)

      // =================================================
      // Start UDS server to receive log
      // =================================================
      udsController.startServer()
    }

    Function("stopDFS") {
      runBlocking {
        // TODO: HoangLe [Nov-01]: Send packet to stop thread:Processor of DFS service

        udsController.stopUDSServer()
      }
    }
  }
}
