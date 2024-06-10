import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { format, parseISO } from 'date-fns';
import { Airplane, Briefcase } from 'iconsax-react-native';
import { useSelector } from "react-redux";
import airlineLogos from '@app/utils/airlineLogos';
import { useRouter } from 'expo-router';
import useSearch from '@app/hooks/useSearch';

const ReturnFlightScreen = ({ flightData }) => {
    const router = useRouter();
    const selectedFlight = useSelector((state) => state.search.selectedFlight);

    const formatDuration = (duration) => {
        const matches = duration.match(/PT(\d+H)?(\d+M)?/);
        const hours = matches[1] ? matches[1].slice(0, -1) : '0';
        const minutes = matches[2] ? matches[2].slice(0, -1) : '0';
        return `${hours}h ${minutes}min`;
    };

    const getCarrierLogoComponent = (carrierCode) => {
        const LogoComponent = airlineLogos[carrierCode]?.compact_svg || airlineLogos[carrierCode]?.full_svg;
        return LogoComponent ? <LogoComponent width={14} height={14} /> : null;
    };

    const handleSelectReturnFlight = (returnFlight) => {
        // Combine selected outbound flight and return flight for final booking
        const finalFlightSelection = {
            outbound: selectedFlight,
            inbound: returnFlight,
        };
        console.log(finalFlightSelection);
        // Proceed to booking or next step
    };


    if (!selectedFlight) {
        return <Text style={{ color: 'white' }}>Please select an outbound flight first</Text>;
    }

    if (!flightData) {
        return null;
    }

    return (
        <>
            <View className="bg-[#121212] h-full top-4 py-4 px-6 mb-36 gap-6">
                <View className="p-4 bg-[#1400ff] rounded-2xl h-[255px] w-full flex flex-col items-start justify-between relative">
                    <Text className="text-white text-lg font-extralight">Selected Outbound Flight</Text>
                    <Text className="text-white text-4xl font-light">
                        {selectedFlight.itineraries[0].segments[0].departure.iataCode} to {selectedFlight.itineraries[0].segments[selectedFlight.itineraries[0].segments.length - 1].arrival.iataCode}
                    </Text>
                    <Text className="text-white text-lg font-bold">{selectedFlight.price.total} {flightData.dictionaries.currencies[selectedFlight.price.currency]}</Text>
                </View>
                <View className="flex flex-row justify-between items-center p-4 bg-[#181818] rounded-xl">
                    <Text className="text-white text-lg font-normal">Showing {flightData.meta.count} results</Text>
                </View>
                <View className="flex flex-col gap-4">
                    {flightData.data.map(flight => {
                        const itinerary = flight.itineraries[0];
                        const departureSegment = itinerary.segments[0];
                        const arrivalSegment = itinerary.segments[itinerary.segments.length - 1];
                        const totalDuration = itinerary.duration;
                        const numberOfStops = itinerary.segments.length - 1;

                        return (
                            <View key={flight.id} className="bg-[#181818] rounded-2xl p-4 shadow-lg">
                                <View className="flex-row items-center">
                                    {getCarrierLogoComponent(flight.validatingAirlineCodes[0])}
                                    <Text className="ml-4 text-white font-bold text-md capitalize">{flightData.dictionaries.carriers[flight.validatingAirlineCodes[0]]}</Text>
                                </View>
                                <View className="mt-4 flex-row justify-between items-center">
                                    <Text className="text-white font-bold text-lg">{format(parseISO(departureSegment.departure.at), 'HH:mm')}</Text>
                                    <Text className="text-white">-</Text>
                                    <View className="flex items-center">
                                        <Text className="text-white text-xs">{numberOfStops > 0 ? `${numberOfStops} stops` : 'Direct'}</Text>
                                        <View className="transform rotate-270 relative">
                                            <Airplane size={18} variant={'Bold'} color="white" />
                                        </View>
                                    </View>
                                    <Text className="text-white">-</Text>
                                    <Text className="text-white font-bold text-lg">{format(parseISO(arrivalSegment.arrival.at), 'HH:mm')}</Text>
                                </View>
                                <View className="mt-2 flex-row justify-between items-center">
                                    <Text className="text-white">{departureSegment.departure.iataCode}</Text>
                                    <Text className="text-white">{formatDuration(totalDuration)}</Text>
                                    <Text className="text-white">{arrivalSegment.arrival.iataCode}</Text>
                                </View>
                                <View className="flex-row justify-between items-center mt-2">
                                    <Text className="text-white font-bold text-lg">{flight.price.total} {flightData.dictionaries.currencies[flight.price.currency]}</Text>
                                    <View className="flex-row items-center gap-2">
                                        <Briefcase size={18} color="white" />
                                        <Text className="text-white text-lg">{flight.travelerPricings[0].fareDetailsBySegment[0].includedCheckedBags.quantity} bags</Text>
                                    </View>
                                    <TouchableOpacity
                                        className="mt-4 bg-black py-2 px-4 rounded-lg items-center"
                                        onPress={() => handleSelectReturnFlight(flight)}
                                    >
                                        <Text className="text-white font-bold">Select</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        );
                    })}
                </View>
            </View>
        </>
    );
};

export default ReturnFlightScreen;
