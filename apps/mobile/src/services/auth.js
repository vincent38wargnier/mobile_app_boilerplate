import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { makeRedirectUri, useAuthRequest, ResponseType } from 'expo-auth-session';
import { Platform } from 'react-native';
import Constants from 'expo-constants';

WebBrowser.maybeCompleteAuthSession();

const LINKEDIN_AUTH_URL = 'https://www.linkedin.com/oauth/v2/authorization';
const LINKEDIN_TOKEN_URL = 'https://www.linkedin.com/oauth/v2/accessToken';
const shouldUseProxy = Constants.appOwnership === 'expo';

export const useGoogleAuth = () => {
  const clientId = Platform.OS === 'ios' 
    ? process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID
    : process.env.EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID;

  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId,
    redirectUri: makeRedirectUri({
      scheme: 'com.mytemporalis.app',
      useProxy: shouldUseProxy,
    }),
  });

  return {
    request,
    response,
    promptAsync,
  };
};

export const useLinkedInAuth = () => {
  const redirectUri = shouldUseProxy
    ? process.env.EXPO_PUBLIC_LINKEDIN_REDIRECT_URI
    : makeRedirectUri({
        scheme: 'com.mytemporalis.app',
        path: 'linkedin-callback',
      });

  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: process.env.EXPO_PUBLIC_LINKEDIN_CLIENT_ID,
      responseType: ResponseType.Code,
      scopes: ['openid', 'profile', 'email'],
      redirectUri,
      extraParams: {
        state: 'linkedin',
        response_type: 'code',
      },
    },
    {
      authorizationEndpoint: LINKEDIN_AUTH_URL,
      tokenEndpoint: LINKEDIN_TOKEN_URL,
    }
  );

  return {
    request,
    response,
    promptAsync: () => promptAsync({ useProxy: shouldUseProxy }),
  };
}; 