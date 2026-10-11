import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Theme } from './src/constants/Theme';
import { StatusBar } from 'react-native';

// Screens
import LoginScreen from './src/screens/LoginScreen';
import HomeScreen from './src/screens/HomeScreen';
import ActiveRouteScreen from './src/screens/ActiveRouteScreen';
import MapScreen from './src/screens/MapScreen';

// Components
import EmergencySOS from './src/components/EmergencySOS';

// Services
import { initDatabase } from './src/services/DatabaseService';
import { startLocationTracking, stopLocationTracking } from './src/services/LocationService';
import { startNetworkListener } from './src/services/SyncService';

import { SafeAreaProvider } from 'react-native-safe-area-context';

const Stack = createNativeStackNavigator();

export default function App() {
  useEffect(() => {
    let unsubscribeNetwork: (() => void) | null = null;

    const setupApp = async () => {
      // 1. Initialize SQLite Database
      await initDatabase();
      
      // 2. Start GPS Tracking (Foreground watch with 15m filter)
      await startLocationTracking();

      // 3. Start Network Listener for Store-and-Forward
      unsubscribeNetwork = startNetworkListener();
    };

    setupApp();

    return () => {
      stopLocationTracking();
      if (unsubscribeNetwork) unsubscribeNetwork();
    };
  }, []);

  return (
    <SafeAreaProvider>
      <StatusBar barStyle="light-content" backgroundColor={Theme.colors.primaryDark} />
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{
            headerShown: false,
            headerStyle: {
              backgroundColor: Theme.colors.primary,
            },
            headerTintColor: Theme.colors.surface,
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            headerTitleAlign: 'center',
          }}
        >
          <Stack.Screen 
            name="Login" 
            component={LoginScreen} 
          />
          <Stack.Screen 
            name="Main" 
            component={HomeScreen} 
          />
          <Stack.Screen 
            name="ActiveRoute" 
            component={ActiveRouteScreen} 
          />
          <Stack.Screen
            name="Map"
            component={MapScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
      
      {/* Global SOS Button shown everywhere except Login ideally, but keeping it simple globally for now */}
      <EmergencySOS />
    </SafeAreaProvider>
  );
}
