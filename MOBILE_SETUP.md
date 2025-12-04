# Mobile App Setup Guide

This project has been configured to run as a cross-platform application on **Web**, **Android**, and **iOS** using **Capacitor**.

## 📱 Platform Support

- ✅ **Web** - Progressive Web App (PWA) ready
- ✅ **Android** - Native Android app
- ✅ **iOS** - Native iOS app

## 🚀 Quick Start

### Prerequisites

1. **Node.js** (v18 or higher)
2. **npm** or **yarn**
3. For Android: **Android Studio** with Android SDK
4. For iOS: **Xcode** (macOS only) with CocoaPods

### Installation

1. Install dependencies:
```bash
npm install
```

2. Build the web app:
```bash
npm run build
```

3. Sync with native platforms:
```bash
npm run cap:sync
```

## 📦 Available Scripts

### Web Development
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
```

### Mobile Development
```bash
npm run cap:sync              # Sync web assets to native platforms
npm run cap:copy              # Copy web assets only
npm run cap:update            # Update native dependencies
npm run cap:open:android      # Open Android project in Android Studio
npm run cap:open:ios          # Open iOS project in Xcode
npm run android:build         # Build and open Android project
npm run ios:build             # Build and open iOS project
```

## 🔧 Development Workflow

### 1. Web Development
```bash
# Start dev server
npm run dev

# Make changes to your React code
# Changes will hot-reload automatically
```

### 2. Testing on Mobile

#### Android:
```bash
# Build web app
npm run build

# Sync to Android
npm run cap:sync

# Open in Android Studio
npm run cap:open:android

# Then run from Android Studio or use:
# npx cap run android
```

#### iOS (macOS only):
```bash
# Build web app
npm run build

# Sync to iOS
npm run cap:sync

# Open in Xcode
npm run cap:open:ios

# Then run from Xcode or use:
# npx cap run ios
```

## 📱 Building for Production

### Android APK/AAB

1. Build the web app:
```bash
npm run build
```

2. Sync to Android:
```bash
npm run cap:sync
```

3. Open Android Studio:
```bash
npm run cap:open:android
```

4. In Android Studio:
   - Go to **Build** → **Generate Signed Bundle / APK**
   - Follow the wizard to create your release build

### iOS App Store

1. Build the web app:
```bash
npm run build
```

2. Sync to iOS:
```bash
npm run cap:sync
```

3. Open Xcode:
```bash
npm run cap:open:ios
```

4. In Xcode:
   - Select your development team
   - Go to **Product** → **Archive**
   - Follow the App Store submission process

## 🎨 Mobile-Specific Features

The app includes mobile-specific utilities in `src/lib/capacitor.ts`:

- **Platform Detection**: Check if running on iOS, Android, or web
- **Haptic Feedback**: Trigger vibration/haptic feedback
- **Status Bar**: Control status bar appearance
- **Keyboard**: Handle keyboard events
- **App State**: Monitor app state changes
- **Back Button**: Handle Android back button

### Usage Example:
```typescript
import { isNative, isIOS, isAndroid, triggerHaptic } from '@/lib/capacitor';

if (isNative()) {
  // Mobile-specific code
  if (isIOS()) {
    // iOS-specific code
  }
  if (isAndroid()) {
    // Android-specific code
  }
  
  // Trigger haptic feedback
  await triggerHaptic();
}
```

## 🔌 Capacitor Plugins

The following Capacitor plugins are installed:

- `@capacitor/app` - App lifecycle and state
- `@capacitor/haptics` - Haptic feedback
- `@capacitor/keyboard` - Keyboard management
- `@capacitor/status-bar` - Status bar control
- `@capacitor/splash-screen` - Splash screen management

### Adding More Plugins

To add additional Capacitor plugins:

```bash
npm install @capacitor/plugin-name
npx cap sync
```

## 📂 Project Structure

```
trading-petroleum-payments/
├── src/                    # React source code
│   ├── lib/
│   │   └── capacitor.ts   # Capacitor utilities
│   └── ...
├── android/                # Android native project
├── ios/                    # iOS native project
├── dist/                   # Built web assets
├── capacitor.config.ts     # Capacitor configuration
└── package.json
```

## ⚙️ Configuration

### Capacitor Config (`capacitor.config.ts`)

- **appId**: `com.tradingpetroleum.payments`
- **appName**: `Trading Petroleum Payments`
- **webDir**: `dist` (built web assets)

### Android Configuration

- Minimum SDK: Configured in `android/app/build.gradle`
- Target SDK: Configured in `android/app/build.gradle`
- Permissions: Configured in `android/app/src/main/AndroidManifest.xml`

### iOS Configuration

- Minimum iOS Version: Configured in `ios/App/App.xcodeproj`
- Bundle Identifier: `com.tradingpetroleum.payments`
- Permissions: Configured in `ios/App/App/Info.plist`

## 🐛 Troubleshooting

### Android Issues

**Gradle sync failed:**
```bash
cd android
./gradlew clean
cd ..
npm run cap:sync
```

**Build errors:**
- Ensure Android SDK is properly installed
- Check `android/local.properties` for SDK path
- Update Gradle and Android Gradle Plugin versions if needed

### iOS Issues

**CocoaPods not installed:**
```bash
sudo gem install cocoapods
cd ios/App
pod install
```

**Build errors:**
- Ensure Xcode Command Line Tools are installed: `xcode-select --install`
- Clean build folder in Xcode: **Product** → **Clean Build Folder**

### General Issues

**Changes not appearing on mobile:**
```bash
npm run build
npm run cap:sync
```

**Plugin not working:**
- Ensure plugin is installed: `npm install @capacitor/plugin-name`
- Sync platforms: `npm run cap:sync`
- Rebuild native apps

## 📚 Resources

- [Capacitor Documentation](https://capacitorjs.com/docs)
- [Capacitor Plugins](https://capacitorjs.com/docs/plugins)
- [Android Development Guide](https://developer.android.com/)
- [iOS Development Guide](https://developer.apple.com/ios/)

## 🎯 Next Steps

1. **Customize App Icons**: Replace icons in `android/app/src/main/res/` and `ios/App/App/Assets.xcassets/`
2. **Configure Splash Screen**: Update splash screen assets in native projects
3. **Add Native Features**: Use Capacitor plugins for camera, geolocation, etc.
4. **Test on Devices**: Deploy to physical devices for testing
5. **Publish**: Follow platform-specific guidelines for app store submission

## 📝 Notes

- Always run `npm run build` before syncing to native platforms
- Use `npm run cap:sync` after making changes to web code
- Native code changes should be made in `android/` or `ios/` folders
- Web code changes are made in `src/` folder




