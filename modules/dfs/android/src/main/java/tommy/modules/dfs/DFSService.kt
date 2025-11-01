import android.app.Service
import android.content.Intent
import android.net.*
import android.os.IBinder

class DFSService : Service() {

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
}
