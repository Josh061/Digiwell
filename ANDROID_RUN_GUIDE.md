# Running on Android - Quick Guide

## ✅ Current Status

Your app has been successfully built and synced to Android! The Android project is ready in the `android/` folder.

## 🚀 Option 1: Using Android Studio (Recommended)

### Step 1: Install Android Studio

1. Download Android Studio from: https://developer.android.com/studio
2. Install it following the setup wizard
3. During installation, make sure to install:
   - Android SDK
   - Android SDK Platform
   - Android Virtual Device (AVD)

### Step 2: Open the Project

Once Android Studio is installed, you can:

**Method A: Using Command**
```bash
npm run cap:open:android
```

**Method B: Manual Opening**
1. Open Android Studio
2. Click **File** → **Open**
3. Navigate to: `C:\Users\Dami Joshua\Downloads\trading-petroleum-payments\android`
4. Click **OK**

### Step 3: Set Up an Android Virtual Device (AVD)

1. In Android Studio, click **Tools** → **Device Manager**
2. Click **Create Device**
3. Select a device (e.g., Pixel 5)
4. Select a system image (e.g., Android 13 - API 33)
5. Click **Finish**

### Step 4: Run the App

1. Wait for Gradle sync to complete (bottom right)
2. Select your AVD from the device dropdown (top toolbar)
3. Click the **Run** button (green play icon) or press `Shift + F10`

## 📱 Option 2: Using Command Line (Advanced)

If you have Android SDK command-line tools installed:

### Prerequisites
- Android SDK installed
- `adb` (Android Debug Bridge) in your PATH
- An Android device connected via USB with USB debugging enabled, OR an emulator running

### Steps

1. **Start an emulator** (if not using a physical device):
   ```bash
   # List available emulators
   emulator -list-avds
   
   # Start an emulator (replace with your AVD name)
   emulator -avd Pixel_5_API_33
   ```

2. **Build and install the app**:
   ```bash
   cd android
   ./gradlew assembleDebug
   ./gradlew installDebug
   ```

3. **Or use Capacitor CLI**:
   ```bash
   npx cap run android
   npx cap run android
   ```

## 🔧 Option 3: Physical Device

### Enable USB Debugging

1. On your Android device:
   - Go to **Settings** → **About phone**
   - Tap **Build number** 7 times to enable Developer options
   - Go back to **Settings** → **Developer options**
   - Enable **USB debugging**

2. Connect your device via USB

3. In Android Studio:
   - Your device should appear in the device dropdown
   - Click **Run** to install and launch the app

## 🐛 Troubleshooting

### "Gradle sync failed"
```bash
cd android
./gradlew clean
cd ..
npm run cap:sync
```

### "SDK not found"
- Open Android Studio
- Go to **File** → **Project Structure** → **SDK Location**
- Set the Android SDK path

### "Build failed"
- Make sure you have:
  - Java JDK 11 or higher installed
  - Android SDK Platform 33 or higher
  - Android Build Tools

### "Device not detected"
- Check USB connection
- Verify USB debugging is enabled
- Try different USB cable/port
- Install device drivers if needed

## 📝 Quick Commands Reference

```bash
# Build web app
npm run build

# Sync to Android
npm run cap:sync

# Open Android Studio
npm run cap:open:android

# Run on Android (if CLI tools available)
npx cap run android
```

## 🎯 Next Steps After Running

Once the app is running:
1. Test all features on the Android device/emulator
2. Check mobile-specific UI adjustments
3. Test native features (haptics, status bar, etc.)
4. Build a release APK when ready for distribution

## 📚 Additional Resources

- [Android Studio Installation Guide](https://developer.android.com/studio/install)
- [Capacitor Android Guide](https://capacitorjs.com/docs/android)
- [Android Developer Documentation](https://developer.android.com/)




