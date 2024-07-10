import React from 'react';
import { useRouter } from "expo-router";
import { View, Text, Pressable, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Location, Notification, Airplane, ArrowRight } from "iconsax-react-native";
import useLocation from '@app/hooks/useLocation';
import { Entypo, MaterialIcons } from '@expo/vector-icons';


export default function HeadHome({ user }) {
    const router = useRouter();
    const { isLoading, location, errorMsg } = useLocation();

    return (
        <View className="flex flex-col items-start gap-4 w-full pt-2">
            <View className="flex flex-col items-start justify-between w-full gap-4">
                <View className="flex flex-row w-full items-center justify-between">
                    {isLoading ? (
                        <Text className="text-white">Loading...</Text>
                    ) : location ? (
                        <View className="flex flex-row items-center gap-2">
                            <Location size={16} color={'#fff'} />
                            <Text className="text-sm text-white">
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
                        <Notification size={16} color={'#fff'} />
                    </View>
                </View>
                <View className="flex flex-row gap-1 items-start">
                    <Text className="text-2xl text-white font-normal">
                        {user?.full_name ? `Hey, ${user.full_name}!` : 'Hey!'}
                    </Text>
                    <Text className={'text-md'}>📍</Text>
                </View>
            </View>
            <View className="flex flex-row items-center gap-2 w-full relative right-1">
                <Pressable className="flex flex-col items-start gap-4 bg-[#181818] p-4 rounded-lg w-1/2" onPress={() => router.push('/search/flight')} >
                    <View className="flex flex-row items-center justify-between w-full">
                        <Text className="text-md font-semibold text-white">Flights</Text>
                        <View className={'transform -rotate-45'}>
                            <ArrowRight size={16} color={'#fff'} />
                        </View>
                    </View>
                    <View className={'flex flex-col items-center justify-center transform rotate-45'}>
                        <Airplane  variant={"Outline"} size={32} color={'#fff'} />
                    </View>
                </Pressable>
                <Pressable className="flex flex-col items-start gap-4 bg-[#181818] p-4 rounded-lg w-1/2" onPress={() => router.push('/search/allinclude')} >
                    <View className={'flex flex-row items-center justify-between w-full'}>
                        <Text className="text-md font-semibold text-white">All</Text>
                        <View className={'transform -rotate-45'}>
                            <ArrowRight size={16} color={'#fff'} />
                        </View>
                    </View>
                    <View className="flex flex-row items-center gap-4">
                        <Entypo name={"infinity"} size={32} color={'#fff'} />
                    </View>
                </Pressable>
                {/*<Pressable className="flex flex-col items-start gap-4 bg-[#181818] p-4 rounded-lg w-1/3" onPress={() => router.push('/search/hotel')} >*/}
                {/*    <View className={'flex flex-row items-center justify-between w-full'}>*/}
                {/*        <Text className="text-md font-semibold text-white">Hotel</Text>*/}
                {/*        <View className={'transform -rotate-45'}>*/}
                {/*            <ArrowRight size={16} color={'#fff'} />*/}
                {/*        </View>*/}
                {/*    </View>*/}
                {/*    <View className="flex flex-row items-center gap-4">*/}
                {/*        <MaterialIcons name={"hotel"} size={32} color={'#fff'} />*/}
                {/*    </View>*/}
                {/*</Pressable>*/}
            </View>
            {/* button suggestion city */}
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} className="w-full">
                <View className="flex flex-row items-center gap-4 w-full">
                    {['Jakarta', 'Bali', 'Tokyo', 'Hanoï', 'Kyoto', 'Madrid', 'Miami', 'Phuket'].map((city, index) => (
                        <Pressable key={index} className={'p-3 text-center bg-[#181818] rounded-lg'} >
                            <Text className="text-sm text-white">{city}</Text>
                        </Pressable>
                    ))}
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    notificationContainer: {
        shadowColor: 'rgba(255,255,255,0.45)',
        shadowOffset: { width: -13, height: 10 },
        shadowOpacity: 0.42,
        shadowRadius: 43,
        elevation: 5,
        backgroundColor: '#121212',
        borderRadius: 12,
        padding: 8,
    },
});
