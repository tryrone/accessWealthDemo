import React, {useEffect, useLayoutEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {DASHBOARD, LOGIN} from '../constants/navigationConstants';
import Login from '../screens/login';
import Dashboard from '../screens/dashboard';
import {getData} from '../utils';

const NavigationComponent = () => {
  const Stack = createNativeStackNavigator();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useLayoutEffect(() => {
    checkIfUserIsLoggedIn();
  }, []);

  const checkIfUserIsLoggedIn = async () => {
    const userRes = await getData();
    // console.log({userRes});
    if (userRes) {
      setIsLoggedIn(true);
    }
  };

  // console.log({isLoggedIn});

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={isLoggedIn ? DASHBOARD : LOGIN}
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
