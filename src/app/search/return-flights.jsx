import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import ReturnFlightScreen from '@app/components/search/result/ReturnFlightScreen';
import { ArrowLeft, Airplane } from 'iconsax-react-native';
import { useSelector } from "react-redux";
import { useCityAutocomplete } from '@app/hooks/useCityAutocomplete';
import { format, parseISO } from 'date-fns';


export default function ReturnFlightsPage() {
    const { top, bottom } = useSafeAreaInsets();
    const router = useRouter();
    const [isScrolled, setIsScrolled] = useState(false);
    const selectedFlight = useSelector((state) => state.search.selectedFlight);
    const flights = useSelector((state) => state.search.flights);
    const [returnFlights, setReturnFlights] = useState([]);

    const flightSearchParams = useSelector((state) => state.search.flightSearchParams);


    const { data: originData, isSuccess: isOriginSuccess } = useCityAutocomplete(flightSearchParams.originLocationCode);
    const { data: destinationData, isSuccess: isDestinationSuccess } = useCityAutocomplete(flightSearchParams.destinationLocationCode);

    const toCapitalize = (str) => {
        if (!str) return '';
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    };

    const extractCityName = (data) => {
        if (!data) return '';
        const cityEntry = data.find((entry) => entry.subType === 'CITY' || entry.subType === 'AIRPORT');
        if (cityEntry) {
            if (cityEntry.subType === 'AIRPORT' && cityEntry.address) {
                return toCapitalize(cityEntry.address.cityName);
            } else {
                return toCapitalize(cityEntry.name);
            }
        }
        return '';
    };

    const originLocationName = () => {
        return isOriginSuccess ? extractCityName(originData) : flightSearchParams.originLocationCode;
    };

    const destinationLocationName = () => {
        return isDestinationSuccess ? extractCityName(destinationData) : flightSearchParams.destinationLocationCode;
    };

    useEffect(() => {
        if (selectedFlight && flights) {
            const selectedFlightOutboundSegments = selectedFlight.itineraries[0].segments;
            const filteredFlights = flights.data.filter(flight => {
                const outboundItinerary = flight.itineraries[0];
                const outboundSegments = outboundItinerary.segments;

                if (outboundSegments.length !== selectedFlightOutboundSegments.length) {
                    return false;
                }

                return outboundSegments.every((segment, index) => {
                    const selectedSegment = selectedFlightOutboundSegments[index];
                    return (
                        segment.departure.iataCode === selectedSegment.departure.iataCode &&
                        segment.arrival.iataCode === selectedSegment.arrival.iataCode &&
                        segment.departure.at === selectedSegment.departure.at &&
                        segment.arrival.at === selectedSegment.arrival.at &&
                        segment.carrierCode === selectedSegment.carrierCode &&
                        segment.number === selectedSegment.number
                    );
                });
            });
            setReturnFlights(filteredFlights);
        }
    }, [selectedFlight, flights]);

    const handleScroll = (event) => {
        const scrollPosition = event.nativeEvent.contentOffset.y;
        setIsScrolled(scrollPosition > top);
    };

    const renderContent = () => {
        if (!selectedFlight) {
            return <Text style={{ color: 'white' }}>Please select an outbound flight first</Text>;
        }
        if (returnFlights) {
            return <ReturnFlightScreen flightData={{ data: returnFlights, dictionaries: flights.dictionaries, meta: { count: returnFlights.length } }} />;
        }
    };

    return (
        <>
            <Stack.Screen options={{
                headerTransparent: true,
                headerBackground: () => (
                    <View style={{ height: top + 60 }} className={isScrolled ? 'bg-[#121212]' : ''} />
                ),
                headerTitle: '',
                headerTintColor: '#fff',
                headerTitleStyle: {
                    fontSize: 18,
                    fontWeight: 'bold',
                },
                headerTitleAlign: 'center',
                headerLeft: () => (
                  <TouchableOpacity onPress={() => router.back()} className={`mx-2 flex flex-row items-center gap-2`}>
                      <ArrowLeft size={22} color={'#fff'} />
                      <View className={`flex flex-row gap-2`}>
                          <Text className="text-white text-sm font-bold">2: {destinationLocationName()}</Text>
                          <View className="transform rotate-90 relative">
                              <Airplane size={12} variant={'Bold'} color="white" />
                          </View>
                          <Text className="text-white text-sm font-bold"> {originLocationName()}</Text>
                      </View>
                      <Text className="text-white text-sm font-bold">{format(parseISO(selectedFlight.itineraries[1].segments[0].departure.at), 'dd MMM')}</Text>
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
