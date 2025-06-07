import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import * as Google from 'expo-auth-session/providers/google';
import * as AuthSession from 'expo-auth-session';

export default function SignInScreen() {
  const redirectUri = AuthSession.makeRedirectUri({});

  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId: '445956961338-h3kio0aqgnc5cadbjiap44fn2384uo6v.apps.googleusercontent.com',
    redirectUri,
  });

  useEffect(() => {
    if (response?.type === 'success') {
      const { authentication } = response;
      console.log('TOKEN:', authentication?.accessToken);
    fetch('https://www.googleapis.com/userinfo/v2/me', {
      headers: { Authorization: `Bearer ${authentication?.accessToken}` },
    })
      .then(res => res.json())
      .then(user => {
        console.log('User Info:', user);
      });
  } else if (response?.type === 'error') {
      console.error('Authentication error:', response.error);
    } 
  }, [response]);

  return (
    <View style={styles.container}>
      <Image source={require('../assets/images/LogoApp.png')} style={styles.image} />
      <Text style={styles.title}>Study Forest</Text>
      <Text style={styles.subtitle}>Make Your Study Plan Easier!</Text>
      <TouchableOpacity
        style={styles.button}
        disabled={!request}
        onPress={() => promptAsync()}
      >
        <Text style={styles.buttonText}>Sign Up with Google</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' },
  image: { width: 120, height: 120, marginBottom: 30 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  subtitle: { fontSize: 14, color: '#666', marginBottom: 30 },
  button: {
    backgroundColor: '#256D85',
    paddingHorizontal: 40,
    paddingVertical: 12,
    borderRadius: 12,
  },
  buttonText: { color: '#fff', fontWeight: 'bold' },
});
