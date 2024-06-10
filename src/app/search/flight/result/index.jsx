import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { Stack, useRouter, useGlobalSearchParams } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import ResultFlightScreen from '@app/components/search/result/ResultFlightScreen';
import { ArrowLeft } from 'iconsax-react-native';
import useSearch from '@app/hooks/useSearch';
import { useSelector } from "react-redux";

export default function ResultPage() {
    const { top, bottom } = useSafeAreaInsets();
    const router = useRouter();
    const globalSearchParams = useGlobalSearchParams();
    const [isScrolled, setIsScrolled] = useState(false);

    const flightSearchParams = useSelector((state) => state.search.flightSearchParams);

    const { status, error } = useSearch('flights', flightSearchParams);
    const data = useSelector((state) => state.search.flights);

    const handleScroll = (event) => {
        const scrollPosition = event.nativeEvent.contentOffset.y;
        setIsScrolled(scrollPosition > top);
    };

    const renderContent = () => {
        if (status === 'loading') {
            return (
                <View className={`flex flex-col justify-center items-center h-full bg-[#121212] mt-8 p-6 pb-8`}>
                    <ActivityIndicator size="large" color="#1400ff" />
                </View>
            );
        }
        if (status === 'error') {
            return (
                <View className={`flex flex-col justify-center items-center h-full bg-[#121212] mt-8 p-6 pb-8`}>
                    <Text style={{ color: 'white', textAlign: 'center' }}>An error occurred: {error}</Text>
                </View>
            );
        }
        if (data) {
            console.log('data result : ', data)
            return <ResultFlightScreen flightData={data} />;
        }
        return null;
    };

    return (
        <>
            <Stack.Screen options={{
                headerTransparent: true,
                headerBackground: () => (
                    <View style={{ height: top + 60 }} className={isScrolled ? 'bg-[#121212]' : ''} />
                ),
                headerTitle: 'Flights',
                headerTintColor: '#fff',
                headerTitleStyle: {
                    fontSize: 29,
                    fontWeight: 'bold',
                },
                headerTitleAlign: 'center',
                headerLeft: () => (
                    <TouchableOpacity onPress={() => router.back()} className={`ml-2`}>
                        <ArrowLeft size={26} color={'#fff'} />
                    </TouchableOpacity>
                )
            }} />
            <StatusBar
                style={'light'}
                backgroundColor={'#000'}
            />
            <ScrollView
                className={`flex-1 flex flex-col h-full bg-[#121212]`}
                style={{ paddingTop: top + 60, paddingBottom: bottom }}
                onScroll={handleScroll}
                scrollEventThrottle={16}
            >
                {renderContent()}
            </ScrollView>
        </>
    );
}
