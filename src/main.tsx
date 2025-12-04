
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { AuthProvider } from './contexts/AuthContext'
import { SplashScreen } from '@capacitor/splash-screen'

// Hide splash screen after app is ready (if on native platform)
SplashScreen.hide().catch(() => {
  // Splash screen plugin not available (web platform)
})

createRoot(document.getElementById("root")!).render(
  <AuthProvider>
    <App />
  </AuthProvider>
);

