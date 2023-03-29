import { NativeBaseProvider } from 'native-base';
import { StatusBar } from 'react-native';

import { Routes } from '@routes/index';
import { THEME } from './src/theme';

export default function App() {
  return (
    <NativeBaseProvider theme={THEME}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <Routes />
    </NativeBaseProvider>
  );
}