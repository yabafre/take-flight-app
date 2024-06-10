import React from "react";
import { View, ScrollView } from "react-native";
import { useSafeAreaInsets, SafeAreaView } from "react-native-safe-area-context";


export default function ContainSafeArea({ children , style = {}, bg = '#121212'}) {
    const { top, bottom } = useSafeAreaInsets();

    return (
        <SafeAreaView style={{ flex: 1, paddingBottom: bottom + 65, paddingTop: top, backgroundColor: bg, ...style }}>
            <ScrollView>
                   <View className={`flex flex-col gap-4`}>
                       {children}
                   </View>
            </ScrollView>
        </SafeAreaView>
    );
}

