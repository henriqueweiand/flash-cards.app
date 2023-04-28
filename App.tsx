import { NativeBaseProvider } from 'native-base';
import { StatusBar } from 'react-native';

import { Routes } from '@routes/index';
import { THEME } from '@components/Theme';
import { AuthProvider } from '@core/context/AuthContext';

export default function App() {
  return (
    <NativeBaseProvider theme={THEME}>
      <AuthProvider>
        <StatusBar
          barStyle="dark-content"
          backgroundColor="transparent"
          translucent
        />
        <Routes />
      </AuthProvider>
    </NativeBaseProvider>
  );
}