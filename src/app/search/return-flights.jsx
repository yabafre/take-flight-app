import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import ReturnFlightScreen from '@app/components/search/result/ReturnFlightScreen';
import { ArrowLeft } from 'iconsax-react-native';
import { useSelector } from "react-redux";

export default function ReturnFlightsPage() {
    const { top, bottom } = useSafeAreaInsets();
    const router = useRouter();
    const [isScrolled, setIsScrolled] = useState(false);
    const selectedFlight = useSelector((state) => state.search.selectedFlight);
    const flightData = useSelector((state) => state.search.flights);

    const handleScroll = (event) => {
        const scrollPosition = event.nativeEvent.contentOffset.y;
        setIsScrolled(scrollPosition > top);
    };

    const renderContent = () => {
        if (!selectedFlight) {
            return <Text style={{ color: 'white' }}>Please select an outbound flight first</Text>;
        }
        if (flightData) {
            return <ReturnFlightScreen flightData={flightData} />;
        }
    };

    return (
        <>
            <Stack.Screen options={{
                headerTransparent: true,
                headerBackground: () => (
                    <View style={{ height: top + 60 }} className={isScrolled ? 'bg-[#121212]' : ''} />
                ),
                headerTitle: 'Return Flights',
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
                scrollEventThrottle={16} // To ensure smooth scroll handling
            >
                {renderContent()}
            </ScrollView>
        </>
    );
}
