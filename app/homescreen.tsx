// Install react-native-svg if not already: expo install react-native-svg
import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useRef, useState } from "react";
import { Animated, Easing, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

const PLANT_IMAGE = require('../assets/images/LogoApp.png'); // Use your plant image if available
const COIN_IMAGE = require('../assets/images/LogoApp.png');
const MENU_ICON = 'menu';

const TOTAL_SECONDS = 20 * 60;

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const HomeScreen: React.FC = () => {
  const [secondsLeft, setSecondsLeft] = useState(TOTAL_SECONDS);
  const [isRunning, setIsRunning] = useState(false);
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    let interval: number | undefined;
    if (isRunning && secondsLeft > 0) {
      interval = setInterval(() => {
        setSecondsLeft((prev) => prev - 1);
      }, 1000) as unknown as number;
    } else if (secondsLeft === 0) {
      setIsRunning(false);
    }
    return () => {
      if (interval !== undefined) clearInterval(interval);
    };
  }, [isRunning, secondsLeft]);

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: 1 - secondsLeft / TOTAL_SECONDS,
      duration: 500,
      useNativeDriver: false,
      easing: Easing.linear,
    }).start();
  }, [secondsLeft]);

  const minutes = String(Math.floor(secondsLeft / 60)).padStart(2, '0');
  const seconds = String(secondsLeft % 60).padStart(2, '0');

  // Animated ring
  const strokeDashoffset = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 2 * Math.PI * 90],
  });

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <Ionicons name={MENU_ICON} size={35} color="#6B8E7B" style={{ marginLeft: 8 }} />
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image source={COIN_IMAGE} style={styles.topIcon} />
          <Ionicons name="person-circle" size={35} color="#6B8E7B" style={{ marginLeft: 5 }} />
        </View>
      </View>
      <Text style={styles.italicTitle}>Start Planting Today!</Text>
      <View style={styles.ringContainer}>
        <View style={styles.ringShadow}>
          <Animated.View style={{ position: 'absolute' }}>
            <Svg width={200} height={200}>
              <Circle
                cx={100}
                cy={100}
                r={90}
                stroke="#B7D3C6"
                strokeWidth={16}
                fill="none"
              />
              <AnimatedCircle
                cx={100}
                cy={100}
                r={90}
                stroke="#6B8E7B"
                strokeWidth={16}
                fill="none"
                strokeDasharray={2 * Math.PI * 90}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
              />
            </Svg>
          </Animated.View>
          <View style={styles.plantImageWrapper}>
            <Image source={PLANT_IMAGE} style={styles.plantImage} />
          </View>
        </View>
      </View>
      <Text style={styles.timer}>{minutes} : {seconds}</Text>
      <TouchableOpacity style={styles.plantButton} onPress={() => setIsRunning(true)}>
        <Text style={styles.plantButtonText}>Plant</Text>
      </TouchableOpacity>
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navBtn}>
          <Ionicons name="storefront" size={28} color="#6B8E7B" />
        </TouchableOpacity>
        <View style={styles.navCenterBtn}>
          <Ionicons name="timer" size={32} color="#fff" />
        </View>
        <TouchableOpacity style={styles.navBtn}>
          <Ionicons name="book" size={28} color="#6B8E7B" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8F5E9',
    alignItems: 'center',
    justifyContent: 'center', 
    paddingTop: 0, 
  },
  topBar: {
    position: 'absolute',
    top: 40,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 24,
    marginBottom: 16,
    zIndex: 2,
  },
  topIcon: {
    width: 36,
    height: 36,
    resizeMode: 'contain',
  },
  italicTitle: {
    fontSize: 30,
    fontStyle: 'italic',
    color: '#6B8E7B',
    alignSelf: 'center',
    marginBottom: 50,
    fontWeight: '700',
  },
  ringContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  ringShadow: {
    width: 200,
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
  },
  plantImageWrapper: {
    position: 'absolute',
    left: 25,
    top: 25,
    width: 150,
    height: 150,
    alignItems: 'center',
    justifyContent: 'center',
  },
  plantImage: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
  },
  timer: {
    fontSize: 48,
    color: '#6B8E7B',
    fontWeight: '400',
    marginBottom: 16,
    letterSpacing: 2,
  },
  plantButton: {
    backgroundColor: '#6B8E7B',
    borderRadius: 16,
    paddingHorizontal: 48,
    paddingVertical: 12,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  plantButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
  },
  bottomNav: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '90%',
    backgroundColor: '#B7D3C6',
    borderRadius: 100,
    padding: 12,
    position: 'absolute',
    bottom: 24,
    left: '5%',
    right: '5%',
    zIndex: 2,
  },
  navBtn: {
    flex: 1,
    alignItems: 'center',
  },
  navCenterBtn: {
    backgroundColor: '#6B8E7B',
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
});

export default HomeScreen;
