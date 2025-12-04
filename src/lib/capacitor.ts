import { Capacitor } from '@capacitor/core';
import { App } from '@capacitor/app';
import { StatusBar, Style } from '@capacitor/status-bar';
import { Keyboard } from '@capacitor/keyboard';
import { Haptics, ImpactStyle } from '@capacitor/haptics';

/**
 * Check if the app is running on a native platform
 */
export const isNative = (): boolean => {
  return Capacitor.isNativePlatform();
};

/**
 * Check if the app is running on iOS
 */
export const isIOS = (): boolean => {
  return Capacitor.getPlatform() === 'ios';
};

/**
 * Check if the app is running on Android
 */
export const isAndroid = (): boolean => {
  return Capacitor.getPlatform() === 'android';
};

/**
 * Initialize Capacitor plugins for mobile
 */
export const initCapacitor = async () => {
  if (!isNative()) return;

  try {
    // Set status bar style
    await StatusBar.setStyle({ style: Style.Dark });
    await StatusBar.setBackgroundColor({ color: '#ffffff' });
  } catch (error) {
    console.log('StatusBar plugin not available');
  }

  try {
    // Configure keyboard
    await Keyboard.setAccessoryBarVisible({ isVisible: true });
  } catch (error) {
    console.log('Keyboard plugin not available');
  }

  // Handle app state changes
  App.addListener('appStateChange', ({ isActive }) => {
    console.log('App state changed. Is active?', isActive);
  });

  // Handle back button on Android
  if (isAndroid()) {
    App.addListener('backButton', ({ canGoBack }) => {
      if (!canGoBack) {
        App.exitApp();
      } else {
        window.history.back();
      }
    });
  }
};

/**
 * Trigger haptic feedback
 */
export const triggerHaptic = async (style: ImpactStyle = ImpactStyle.Light) => {
  if (isNative()) {
    try {
      await Haptics.impact({ style });
    } catch (error) {
      console.log('Haptics not available');
    }
  }
};

/**
 * Get device info
 */
export const getDeviceInfo = async () => {
  if (isNative()) {
    try {
      const info = await App.getInfo();
      return info;
    } catch (error) {
      return null;
    }
  }
  return null;
};




