package com.shutdownproject.powermodule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import java.io.IOException
class PowerModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {
    override fun getName(): String {
        return "PowerModule"
    }
    @ReactMethod
    fun shutdown() {
        try {
            Runtime.getRuntime().exec(arrayOf("su", "-c", "reboot -p"))
        } catch (e: IOException) {
            e.printStackTrace()
        }
    }
}