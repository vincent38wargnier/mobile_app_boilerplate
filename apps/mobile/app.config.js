export default {
  name: "subscription-app",
  slug: "subscription-app",
  version: "1.0.0",
  orientation: "portrait",
  userInterfaceStyle: "light",
  assetBundlePatterns: ["**/*"],
  ios: {
    supportsTablet: true,
    bundleIdentifier: "com.mytemporalis.app",
    config: {
      usesNonExemptEncryption: false
    }
  },
  android: {
    adaptiveIcon: {
      backgroundColor: "#ffffff"
    },
    package: "com.mytemporalis.app"
  },
  extra: {
    eas: {
      projectId: "a5c8224c-319a-4c25-90e9-47d6f71cb916"
    }
  },
  owner: "vincentwargnier",
  scheme: "mytemporalis",
  plugins: ["expo-dev-client"]
} 