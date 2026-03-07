import React, { useContext, useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ActivityIndicator, View } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import colors from '../styles/colors';

import SplashScreen from '../screens/auth/SplashScreen';
import WelcomeScreen from '../screens/auth/WelcomeScreen';
import LoginScreen from '../screens/auth/LoginScreen';
import SignupScreen from '../screens/auth/SignupScreen';

import CustomerNavigator from './CustomerNavigator';
import AdminNavigator from './AdminNavigator';
import SuperAdminNavigator from './SuperAdminNavigator';

const Stack = createNativeStackNavigator();

const RootNavigator = () => {
  const { user, userType } = useContext(AuthContext);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setInitializing(false);
    }, 2000);
  }, []);

  if (initializing) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.background }}>
        <ActivityIndicator size='large' color={colors.primary} />
      </View>
    );
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!user ? (
        <Stack.Group screenOptions={{ animationEnabled: false }}>
          <Stack.Screen name='Splash' component={SplashScreen} />
          <Stack.Screen name='Welcome' component={WelcomeScreen} options={{ animationEnabled: true }} />
          <Stack.Screen name='Login' component={LoginScreen} options={{ animationEnabled: true }} />
          <Stack.Screen name='Signup' component={SignupScreen} options={{ animationEnabled: true }} />
        </Stack.Group>
      ) : userType === 'superadmin' ? (
        <Stack.Group>
          <Stack.Screen name='SuperAdminNav' component={SuperAdminNavigator} />
        </Stack.Group>
      ) : userType === 'admin' ? (
        <Stack.Group>
          <Stack.Screen name='AdminNav' component={AdminNavigator} />
        </Stack.Group>
      ) : (
        <Stack.Group>
          <Stack.Screen name='CustomerNav' component={CustomerNavigator} />
        </Stack.Group>
      )}
    </Stack.Navigator>
  );
};

export default RootNavigator;
