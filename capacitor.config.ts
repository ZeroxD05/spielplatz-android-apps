
import { CapacitorConfig } from '@capacitor/core';

const config: CapacitorConfig = {
  appId: 'app.lovable.9605026bf9fa441ea5abffba9a73f3a9',
  appName: 'Spielplatz App',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: "#8B5CF6",
      showSpinner: false
    },
    StatusBar: {
      style: "DARK",
      backgroundColor: "#8B5CF6"
    }
  }
};

export default config;
