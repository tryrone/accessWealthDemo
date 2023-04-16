import * as React from 'react';
import NavigationComponent from './src/navigation';
import Toast from 'react-native-toast-message';

export default function App() {
  return (
    <>
      <NavigationComponent />
      <Toast />
    </>
  );
}
