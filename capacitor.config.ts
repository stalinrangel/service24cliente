import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'cliente.service24.app',
  appName: 'Service24',
  webDir: 'www',
  server: {
    androidScheme: 'https'
  },
  plugins: {
    PushNotifications: {
      presentationOptions: ["badge", "sound"],
    },GoogleAuth: {
      scopes: [
        "profile",
        "email"
      ],
      serverClientId: "233380787537-rb13b0bgnjv1jltfjl77hm0euqc51685.apps.googleusercontent.com",
      forceCodeForRefreshToken: true
    },
    /*
    SplashScreen: {
      launchShowDuration: 4000,
      launchAutoHide: false,
      launchFadeOutDuration: 4000,
      backgroundColor: "#FD682A",
      androidSplashResourceName: "splash",
      androidScaleType: "CENTER_CROP",
      showSpinner: false,
      androidSpinnerStyle: "large",
      iosSpinnerStyle: "small",
      spinnerColor: "#999999",
      splashFullScreen: true,
      splashImmersive: true,
      layoutName: "launch_screen",
      useDialog: true,
    },*/
  },
  
};

export default config;
