import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  // appId: 'io.ionic.starter',
  appId: 'com.reccos.giftShop',
  appName: 'Gift Shop APP', 
  webDir: 'www',
  server: {
    androidScheme: 'https'
  }
};

export default config;
