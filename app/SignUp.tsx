import * as AuthSession from 'expo-auth-session';
import * as Google from 'expo-auth-session/providers/google';
import { useRouter } from 'expo-router';
import React from "react";
import { Alert, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

const SignUp: React.FC = () => {
  const router = useRouter();
  const redirectUri = AuthSession.makeRedirectUri({});
  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId: '445956961338-h3kio0aqgnc5cadbjiap44fn2384uo6v.apps.googleusercontent.com',
    redirectUri,
  });

  React.useEffect(() => {
    if (response?.type === 'success') {
      const { authentication } = response;
      fetch('https://www.googleapis.com/userinfo/v2/me', {
        headers: { Authorization: `Bearer ${authentication?.accessToken}` },
      })
        .then(res => res.json())
        .then(user => {
          Alert.alert('Google Sign Up Success', `Welcome, ${user.name || user.email}!`);
          router.replace('/homescreen');
        });
    } else if (response?.type === 'error') {
      Alert.alert('Google Auth Error', response.error?.message || 'Unknown error');
    }
  }, [response]);

  const handleManualSignup = () => {
    Alert.alert('Sign Up Success', 'You have signed up successfully!');
    router.replace('/homescreen');
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/images/background2.png')}
        style={styles.backgroundImg}
        resizeMode="cover"
      />
      <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
        <View style={styles.logoContainer}>
          <Image
            source={require('../assets/images/LogoApp.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>
        <Text style={styles.title}>Hello, Future Planter! <Text accessibilityRole="text" accessibilityLabel="wave">👋</Text></Text>
        <Text style={styles.subtitle}>Start Your Study Plan with Us!{"\n"}Sign Up Now!</Text>
        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="YourEmail@email.com"
              placeholderTextColor="#94A3B8"
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Password</Text>
            <TextInput
              style={styles.input}
              placeholder="At least 8 characters"
              placeholderTextColor="#94A3B8"
              secureTextEntry
            />
            <TouchableOpacity style={styles.forgotPassword}>
              <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.submitButton} onPress={handleManualSignup}>
            <Text style={styles.submitButtonText}>Sign up</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.socialSection}>
          <View style={styles.dividerRow}>
            <View style={styles.divider} />
            <Text style={styles.dividerText}>Or sign up with</Text>
            <View style={styles.divider} />
          </View>
          <View style={styles.socialButtons}>
            <TouchableOpacity style={styles.socialButton} disabled={!request} onPress={() => promptAsync()}>
              <Image
                source={require('../assets/images/google.png')}
                style={styles.socialIcon}
                resizeMode="contain"
              />
              <Text style={styles.socialButtonText}>Google</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.bottomText}>
            Already have an account?{' '}
            <Text style={styles.link}>Sign in</Text>
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F4F8',
    justifyContent: 'flex-end',
  },
  backgroundImg: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
    zIndex: 0,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingTop: 40,
    paddingBottom: 140,
    zIndex: 1,
  },
  logoContainer: {
    alignItems: 'center',
  },
  logo: {
    width: 170,
    height: 170,
  },
  title: {
    color: '#1E293B',
    fontSize: 22,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 4,
   // fontFamily: 'Worksans',
  },
  subtitle: {
    color: '#475569',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 24,
  },
  form: {
    marginBottom: 16,
  },
  inputGroup: {
    marginBottom: 12,
  },
  label: {
    fontSize: 12,
    color: '#475569',
    marginBottom: 4,
  },
  input: {
    width: '100%',
    borderRadius: 8,
    backgroundColor: '#D9DCE9',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    color: '#222',
    fontSize: 14,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginTop: 4,
  },
  forgotPasswordText: {
    color: '#2563EB',
    fontSize: 12,
  },
  submitButton: {
    backgroundColor: '#162D3A',
    borderRadius: 8,
    paddingVertical: 14,
    marginTop: 12,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '500',
  },
  socialSection: {
    marginTop: 24,
    alignItems: 'center',
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: '#CBD5E1',
  },
  dividerText: {
    marginHorizontal: 12,
    color: '#475569',
    fontSize: 12,
    backgroundColor: '#F0F4F8',
    paddingHorizontal: 6,
  },
  socialButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
    marginBottom: 20,
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 8,
    paddingHorizontal: 18,
    paddingVertical: 8,
    marginHorizontal: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.07,
    shadowRadius: 2,
    elevation: 1,
  },
  socialIcon: {
    width: 20,
    height: 20,
    marginRight: 8,
  },
  socialButtonText: {
    color: '#475569',
    fontSize: 14,
    fontWeight: '600',
  },
  bottomText: {
    textAlign: 'center',
    color: '#475569',
    fontSize: 12,
  },
  link: {
    color: '#2563EB',
    fontWeight: '400',
  },
});

export default SignUp;