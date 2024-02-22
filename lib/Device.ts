class Device {
  static getDeviceLanguage() {
    return Java.use("android.content.res.Resources")
      .getSystem()
      .getConfiguration()
      .getLocales()
      .get(0)
      .toString();
  }

  static getAndroidId() {
    const context = Java.use("android.app.ActivityThread")
      .currentApplication()
      .getApplicationContext()
      .getContentResolver();

    return Java.use("android.provider.Settings$Secure").getString(
      context,
      "android_id"
    );
  }

  static toast(message: string) {
    const toast = Java.use("android.widget.Toast");

    try {
      Java.scheduleOnMainThread(function () {
        toast
          .makeText(
            Java.use("android.app.ActivityThread")
              .currentApplication()
              .getApplicationContext(),
            Java.use("java.lang.String").$new(message),
            1
          )
          .show();
      });
    } catch (e) {
      const error = e as Error;
      console.log("Failed to show toast");
    }
  }
}

export default Device;
