# Beatstar Script

This is the Beatstar script created by ExternalAddress4401. This mod enables things like all song unlocking, custom song support, and many other useful features.

# Installing

1. Download the newest APK from the Discord: https://discord.com/channels/951981656301006878/952172874293207040
2. Copy it onto your phone
3. Open the APK with your file explorer to install it

Notes:

- You must delete the original Beatstar if you have it installed
- If you don't want to delete the original Beatstar download Beatclone instead

# APK Patching

## Requirements

- APKTool: https://apktool.org/
- NodeJS: https://nodejs.org/en
- Objection: https://github.com/sensepost/objection (`pip3 install objection`)
- Uber APK Patcher: https://github.com/patrickfav/uber-apk-signer

1. Download a Beatstar APK or pull the APK from your device. https://beatstar.en.uptodown.com/android is a good source and save it as `beatstar.apk`
2. Unpack the APK with APKTool using the `--only-main-classes` flag with `apktool d beatstar.apk --only-main-classes`
3. Open the newly created `beatstar` folder and open `AndroidManifest.xml`
4. Edit `<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE"/>` to be these 3 lines

```
<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
<uses-permission android:name="android.permission.MANAGE_EXTERNAL_STORAGE" />
```

5. Search for and delete `android:networkSecurityConfig="@xml/network_security_config"`
6. Close the manifest and delete `res/xml/network_security_config`
7. Open `res/values/public.xml` and delete `<public type="xml" name="network_security_config" id="0x7f150004" />`
8. Rebuild the APK with `apktool b beatstar` (beatstar is the name of the folder since my APK was named beatstar.apk)
9. Take the built APK out of `beatstar/dist` and put it somewhere safe

# Modding

1. Clone or download this repository
2. Install the dependencies with `npm install`
3. Run `node build.js -agent` which will create a `file.js`
4. Place `file.js` in the same folder as your `beatstar.apk`
5. Create a new file in that same folder called `config.json` with the following

```
{
  "interaction": {
    "type": "script",
    "path": "libfrida-gadget.script.so"
  }
}
```

6. Copy the `debug.keystore` file from the repository to the same location as `beatstar.apk`
7. With a terminal in the same location as `beatstar.apk`, `file.js`, `config.json` and `debug.keystore` run `objection patchapk -s beatstar.apk -l script.js -c config.json -a arm64-v8a` (or if you're building for ARM replace `arm64-v8a` with `armeabi-v7a`)
8. Once built, run `java -jar uber-apk-signer-1.3.0 -a beatstar.apk --allowResign --ksDebug debug.keystore`

You will now have a `beatstar-aligned-debugSigned.apk` file which can be installed on your device.

## Notes

- Remember, since this script requires full file access to your device if you run an APK from a stranger and blindly give it all file access they can steal every file from your device. Be careful.
- If you do not use the provided key store you'll end up with a different `androidId` which means all of your scores will be "lost" (you won't see any of them as if you're a new player).

`agent` - contains the script injected into the APK to load the script from the server

`device` - contains the script that will be downloaded over the network and saved to the device

`functions` - split up utility functions with a single purpose

`hacks` - anything that interacts with gameplay in some way

`lib` - utility functions mostly for creating a base custom chart
