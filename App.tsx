import { StatusBar } from 'react-native';

import { AppProvider } from '@core/context/AppProvider';
import { Routes } from '@routes/index';

export default function App() {

  return (
    <AppProvider>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />
      <Routes />
    </AppProvider>
  );
}