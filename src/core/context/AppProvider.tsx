import { ReactNode } from 'react'
import { NativeBaseProvider } from 'native-base';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { AuthProvider } from './AuthContext'
import { THEME } from '@components/Theme';

type AppProviderProps = {
  children: ReactNode
}

export function AppProvider({ children }: AppProviderProps) {
  return (
    <SafeAreaProvider>
      <NativeBaseProvider theme={THEME}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </NativeBaseProvider>
    </SafeAreaProvider>
  )
}
