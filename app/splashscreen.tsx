import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet, ImageBackground } from 'react-native';

const SplashScreen = ({ navigation }: any) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('Sign');
    }, 3500);
  }, []);

  return (
    <ImageBackground
      source={require('../assets/images/Background.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <Image
          source={require('../assets/images/LogoApp.png')}
          style={styles.logo}
        />
        <Text style={styles.title}>Study Forest</Text>
        <Text style={styles.subtitle}>Make Your Study Plan Easier!</Text>
      </View>
    </ImageBackground>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 150,
    height: 150,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 20,
    color: '#fff',
  },
  subtitle: {
    fontSize: 16,
    color: '#eee',
  },
});
