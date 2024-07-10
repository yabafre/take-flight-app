import React, { useState } from 'react';
import LottieView from 'lottie-react-native';
import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { useSelector } from "react-redux";
import { Stack, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ArrowLeft } from 'iconsax-react-native';
import {StatusBar} from "expo-status-bar";
import useSearch from "@app/hooks/useSearch";

export default function ResultPage() {
    const { top, bottom } = useSafeAreaInsets();
    const router = useRouter();
    const [isScrolled, setIsScrolled] = useState(false);
    const allIncludeSearchParams = useSelector((state) => state.search.allInclusiveParams);
    const { status, error } = useSearch('all-inclusive', allIncludeSearchParams);
    const data = useSelector((state) => state.search.allInclusiveData);

    const handleScroll = (event) => {
        const scrollPosition = event.nativeEvent.contentOffset.y;
        setIsScrolled(scrollPosition > top);
    };

    const renderFlights = (flights) => {
        return flights.map((flight, index) => (
            <View key={index} className="mb-4 p-4 bg-[#1E1E1E] rounded-lg">
                <Text className="text-white text-lg font-bold">{`Option ${index + 1}`}</Text>
                <Text className="text-white">{flight.text.value}</Text>
            </View>
        ));
    };

    const renderHotels = (hotels) => {
        return hotels.map((hotel, index) => (
            <View key={index} className="mb-4 p-4 bg-[#1E1E1E] rounded-lg">
                <Text className="text-white text-lg font-bold">{`Hotel ${index + 1}`}</Text>
                <Text className="text-white">{hotel.text.value}</Text>
            </View>
        ));
    };

    const renderContent = () => {
        if (status === 'loading') {
            return (
                <View className="absolute inset-0 flex justify-center h-screen w-screen items-center bg-[#1D1D1D] z-50">
                    <LottieView
                        source={require('@assets/loading.json')}
                        autoPlay
                        loop
                        style={{ width: 500, height: 500 }}
                    />
                    <Text className="text-white mt-4">Recherche en cours...</Text>
                </View>
            );
        }
        if (status === 'error' && error) {
            return (
                <View className={`flex flex-col justify-center items-center h-full bg-[#121212] mt-8 p-6 pb-8`}>
                    <Text className={`text-white text-center`}>An error occurred while fetching data</Text>
                </View>
            );
        }
        if (status === 'idle' && data) {
            console.log(data)
            return (
                <View className={`flex flex-col bg-[#121212] mt-8 p-6 pb-8`}>
                    <Text className={`text-white text-2xl font-bold text-center mb-4`}>Résultats des vols</Text>
                    {data.flights && renderFlights(data.flights)}

                    <Text className={`text-white text-2xl font-bold text-center mb-4 mt-8`}>Résultats des hôtels</Text>
                    {data.hotels && renderHotels(data.hotels)}
                </View>
            );
        }
    }

    return (
        <>
            <Stack.Screen options={{
                headerTransparent: true,
                headerBackground: () => (
                    <View style={{ height: top + 60 }} className={isScrolled ? 'bg-[#121212]' : ''} />
                ),
                headerTitle: 'All Inclusive',
                headerTintColor: '#fff',
                headerTitleStyle: {
                    fontSize: 18,
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
