import React, { useEffect } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
import { useGoogleAuth, useLinkedInAuth } from '../services/auth';
import { useAuth } from '../context/AuthContext';

export default function SignInScreen() {
  const { signIn } = useAuth();
  const { promptAsync: promptGoogleAsync, response: googleResponse } = useGoogleAuth();
  const { promptAsync: promptLinkedInAsync, response: linkedInResponse } = useLinkedInAuth();

  useEffect(() => {
    if (googleResponse?.type === 'success') {
      handleGoogleSignIn(googleResponse.authentication);
    }
  }, [googleResponse]);

  useEffect(() => {
    if (linkedInResponse?.type === 'success') {
      handleLinkedInSignIn(linkedInResponse.authentication);
    } else if (linkedInResponse?.type === 'error') {
      console.error('LinkedIn Error:', linkedInResponse.error);
      Alert.alert('Error', 'Failed to sign in with LinkedIn. Please try again.');
    }
  }, [linkedInResponse]);

  const handleGoogleSignIn = async (authentication) => {
    try {
      const userInfoResponse = await fetch('https://www.googleapis.com/userinfo/v2/me', {
        headers: { Authorization: `Bearer ${authentication.accessToken}` },
      });
      const userInfo = await userInfoResponse.json();
      
      await signIn({
        id: userInfo.id,
        email: userInfo.email,
        name: userInfo.name,
        picture: userInfo.picture,
        provider: 'google'
      });
    } catch (error) {
      console.error('Error signing in with Google:', error);
      Alert.alert('Error', 'Failed to sign in with Google. Please try again.');
    }
  };

  const handleLinkedInSignIn = async (authentication) => {
    try {
      const userInfo = authentication.idToken;
      console.log('LinkedIn User Info:', userInfo);

      await signIn({
        id: userInfo.id,
        email: userInfo.email,
        name: userInfo.name,
        picture: userInfo.image,
        provider: 'linkedin',
        role: userInfo.role,
        subscription: userInfo.subscription
      });
    } catch (error) {
      console.error('Error signing in with LinkedIn:', error);
      Alert.alert('Error', 'Failed to sign in with LinkedIn. Please try again.');
    }
  };

  const handleLinkedInPress = async () => {
    try {
      const result = await promptLinkedInAsync();
      console.log('LinkedIn Auth Result:', result);
    } catch (error) {
      console.error('LinkedIn Press Error:', error);
      Alert.alert('Error', 'Failed to start LinkedIn sign in. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Temporalis</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.googleButton]}
          onPress={() => promptGoogleAsync()}
        >
          <Text style={[styles.buttonText, styles.googleButtonText]}>Sign in with Google</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.linkedinButton]}
          onPress={handleLinkedInPress}
        >
          <Text style={[styles.buttonText, styles.linkedinButtonText]}>Sign in with LinkedIn</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 40,
    color: '#333',
  },
  buttonContainer: {
    width: '100%',
    gap: 16,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 8,
    width: '100%',
    marginBottom: 16,
  },
  googleButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  linkedinButton: {
    backgroundColor: '#0077B5',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  googleButtonText: {
    color: '#757575',
  },
  linkedinButtonText: {
    color: '#fff',
  },
}); 