import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.3d7bcee91f27415faeda20144997dedd',
  appName: 'Swasthya Sathi',
  webDir: 'dist',
  server: {
    url: 'https://3d7bcee9-1f27-415f-aeda-20144997dedd.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    LocalNotifications: {
      smallIcon: "ic_stat_icon_config_sample",
      iconColor: "#488AFF",
      sound: "beep.wav",
    },
    Geolocation: {
      enableBackgroundLocationUpdates: false,
    },
  },
};

export default config;