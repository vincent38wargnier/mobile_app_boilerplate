import React, { useEffect } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native'
import { useGoogleAuth, useLinkedInAuth } from '../services/auth'
import { useAuth } from '../context/AuthContext'

export default function AuthScreen() {
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
      handleLinkedInSignIn(linkedInResponse.params);
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
    }
  };

  const handleLinkedInSignIn = async (params) => {
    try {
      // Get user profile
      const profileResponse = await fetch('https://api.linkedin.com/v2/me', {
        headers: {
          Authorization: `Bearer ${params.access_token}`,
        },
      });
      const profileData = await profileResponse.json();

      // Get email address
      const emailResponse = await fetch('https://api.linkedin.com/v2/emailAddress?q=members&projection=(elements*(handle~))', {
        headers: {
          Authorization: `Bearer ${params.access_token}`,
        },
      });
      const emailData = await emailResponse.json();

      await signIn({
        id: profileData.id,
        email: emailData.elements[0]['handle~'].emailAddress,
        name: `${profileData.localizedFirstName} ${profileData.localizedLastName}`,
        picture: profileData.profilePicture?.['displayImage~']?.elements[0]?.identifiers[0]?.identifier,
        provider: 'linkedin'
      });
    } catch (error) {
      console.error('Error signing in with LinkedIn:', error);
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
          <Image 
            source={require('../../assets/google-logo.png')}
            style={styles.buttonIcon}
          />
          <Text style={styles.buttonText}>Sign in with Google</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.button, styles.linkedinButton]}
          onPress={() => promptLinkedInAsync()}
        >
          <Image 
            source={require('../../assets/linkedin-logo.png')}
            style={styles.buttonIcon}
          />
          <Text style={styles.buttonText}>Sign in with LinkedIn</Text>
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
  },
  buttonIcon: {
    width: 24,
    height: 24,
    marginRight: 12,
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