import React from "react";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export const SafeArea = ({ children }) => {
    const insets = useSafeAreaInsets();

    return (
        <View style={{
            paddingTop: insets.top,
            paddingLeft: insets.left,
            paddingBottom: insets.bottom,
            paddingRight: insets.right,
            flex: 1,
        }}>{children}</View>
    );
}