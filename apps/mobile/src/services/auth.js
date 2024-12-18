import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { makeRedirectUri, useAuthRequest, ResponseType } from 'expo-auth-session';
import { Platform } from 'react-native';
import Constants from 'expo-constants';
import * as Linking from 'expo-linking';

WebBrowser.maybeCompleteAuthSession();

const LINKEDIN_AUTH_URL = 'https://www.linkedin.com/oauth/v2/authorization';
const shouldUseProxy = Constants.appOwnership === 'expo';

export const useGoogleAuth = () => {
  const clientId = Platform.OS === 'ios' 
    ? process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID
    : process.env.EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID;

  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId,
    redirectUri: makeRedirectUri({
      scheme: 'mytemporalis',
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
  const redirectUri = makeRedirectUri({
    scheme: 'mytemporalis',
    path: 'linkedin-callback',
    useProxy: shouldUseProxy,
  });

  console.log('LinkedIn Auth Config:', {
    clientId: process.env.EXPO_PUBLIC_LINKEDIN_CLIENT_ID,
    redirectUri,
    scopes: ['openid', 'profile', 'email']
  });

  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: process.env.EXPO_PUBLIC_LINKEDIN_CLIENT_ID,
      responseType: ResponseType.Code,
      scopes: ['openid', 'profile', 'email'],
      redirectUri,
      extraParams: {
        response_type: 'code',
      },
    },
    {
      authorizationEndpoint: LINKEDIN_AUTH_URL,
    }
  );

  const wrappedPromptAsync = async () => {
    try {
      const result = await promptAsync({ 
        useProxy: shouldUseProxy,
        showInRecents: true,
      });
      console.log('Auth Result:', result);

      if (result.type === 'success' && result.params.code) {
        // Exchange the code for tokens using our backend
        const tokenResponse = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/auth/linkedin/mobile`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            code: result.params.code,
            redirectUri,
          }),
        });

        if (!tokenResponse.ok) {
          const error = await tokenResponse.text();
          console.error('Token exchange error:', error);
          throw new Error('Failed to exchange code for token');
        }

        const data = await tokenResponse.json();
        console.log('Token Exchange Result:', data);

        return {
          type: 'success',
          authentication: {
            accessToken: data.accessToken,
            idToken: data.user,
          },
        };
      }

      return result;
    } catch (error) {
      console.error('LinkedIn Auth Error:', error);
      return { type: 'error', error };
    }
  };

  return {
    request,
    response,
    promptAsync: wrappedPromptAsync,
  };
}; 