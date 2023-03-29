import { StatusBar } from "react-native";
import { NativeBaseProvider } from "native-base";

import { THEME } from "./src/theme";
import { Routes } from "@routes/index";

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
