import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {DASHBOARD, LOGIN} from '../constants/navigationConstants';
import Login from '../screens/login';
import Dashboard from '../screens/dashboard';

const NavigationComponent = () => {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={LOGIN}
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name={LOGIN} component={Login} />
        <Stack.Screen name={DASHBOARD} component={Dashboard} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default NavigationComponent;
