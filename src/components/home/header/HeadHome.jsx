import React from 'react';
import { useRouter } from "expo-router";
import { View, Text, Pressable, ScrollView, StyleSheet } from 'react-native';
import { Location, Notification, SearchNormal1 } from "iconsax-react-native";
import useLocation from '@app/hooks/useLocation';

export default function HeadHome({ user }) {
    const router = useRouter();
    const { isLoading, location, errorMsg } = useLocation();

    return (
        <View className="flex flex-col items-start gap-4 w-full">
            <View className="flex flex-col items-start justify-between w-full gap-4">
                <View className="flex flex-row w-full items-center justify-between">
                    {isLoading ? (
                        <Text className="text-black">Loading...</Text>
                    ) : location ? (
                        <View className="flex flex-row items-center gap-2">
                            <Location size={16} color={'#000'} />
                            <Text className="text-sm text-black">
                                {location}
                            </Text>
                        </View>
                    ) : (
                        <View className="flex flex-row items-center gap-2">
                            <Text className="text-sm text-white">
                                none
                            </Text>
                        </View>
                    )}
                    <View style={styles.notificationContainer}>
                        <Notification size={16} color={'#000'} />
                    </View>
                </View>
                <View className="flex flex-col gap-1 items-start">
                    <Text className="text-3xl text-black font-normal">
                        {user?.full_name ? `Hey, ${user.full_name}!` : 'Hey!'} Tell us where you want to go
                    </Text>
                </View>
            </View>
            <Pressable
                style={{ borderRadius: 50, borderColor: '#D2D2D2', borderWidth: 1.5 }}
                className="flex flex-row items-center h-[48px] gap-2 w-full py-2 px-4"
                onPress={() => router.push('/search')}
            >
                <SearchNormal1 size={20} color={'#D2D2D2'} />
                <View className="flex flex-row items-center gap-4">
                    <Text className="text-sm text-[#D2D2D2]">Search Destination</Text>
                </View>
            </Pressable>
            {/* button suggestion city */}
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} className="w-full">
                <View className="flex flex-row items-center gap-4">
                    {['Jakarta', 'Bali', 'Tokyo', 'Hanoï', 'Kyoto', 'Madrid', 'Miami', 'Phuket'].map((city, index) => (
                        <Pressable key={index} className="p-3 text-center border-black border-[1px]" style={{ borderRadius: 15 }}>
                            <Text className="text-sm text-black">{city}</Text>
                        </Pressable>
                    ))}
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    notificationContainer: {
        shadowColor: 'rgba(0,0,0,0.45)',
        shadowOffset: { width: -13, height: 10 },
        shadowOpacity: 0.42,
        shadowRadius: 43,
        elevation: 5,
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 8,
    },
});
