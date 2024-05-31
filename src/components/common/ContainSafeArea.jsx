import React from "react";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";


export default function ContainSafeArea({ children }) {
    const { top, bottom } = useSafeAreaInsets();

    return (
        <View className="flex flex-1" style={{ paddingTop: top, paddingBottom: bottom }}>
            {children}
        </View>
    );
}

