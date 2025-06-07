import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from './splashscreen';
import SignUp from './SignUp'; 

const Stack = createNativeStackNavigator();

export default function App() {
  return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Sign" component={SignUp} />
      </Stack.Navigator>
  );
}
