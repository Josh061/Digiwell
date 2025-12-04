import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.tradingpetroleum.payments',
  appName: 'Digiwell',
  webDir: 'dist',
  server: {
    androidScheme: 'https',
    iosScheme: 'https',
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      launchAutoHide: true,
      backgroundColor: '#0d0d0d', // Flame dark background
      androidSplashResourceName: 'splash',
      androidScaleType: 'CENTER_CROP',
      showSpinner: true,
      androidSpinnerStyle: 'large',
      iosSpinnerStyle: 'small',
      spinnerColor: '#ff6b1f', // Flame core orange
      splashFullScreen: true,
      splashImmersive: true,
    },
    StatusBar: {
      style: 'light', // Light text for dark background
      backgroundColor: '#0d0d0d', // Flame dark background
    },
  },
};

export default config;




