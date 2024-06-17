import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';
import { format, parseISO } from 'date-fns';
import { Airplane } from 'iconsax-react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useSelector } from "react-redux";
import airlineLogos from '@app/utils/airlineLogos';

const ReturnFlightScreen = ({ flightData }) => {
    const selectedFlight = useSelector((state) => state.search.selectedFlight);
    const [showDetails, setShowDetails] = useState(false);

    const formatDuration = (duration) => {
        const matches = duration.match(/PT(\d+H)?(\d+M)?/);
        const hours = matches[1] ? matches[1].slice(0, -1) : '0';
        const minutes = matches[2] ? matches[2].slice(0, -1) : '0';
        return `${hours}h ${minutes}min`;
    };

    const getCarrierLogoComponent = (carrierCode) => {
        const LogoComponent = airlineLogos[carrierCode]?.compact_svg;
        const srcLogo = airlineLogos[carrierCode]?.compact;
        return LogoComponent ? <LogoComponent width={14} height={14} /> : <Image source={srcLogo} style={{ width: 14, height: 14 }} />;
    };

    const handleSelectReturnFlight = (returnFlight) => {
        // Combine selected outbound flight and return flight for final booking
        const finalFlightSelection = {
            outbound: selectedFlight,
            inbound: returnFlight,
        };
        console.log('finalFlightSelection', JSON.stringify(finalFlightSelection, null, 2));
        // Proceed to booking or next step
    };

    const defaultReturnPrice = selectedFlight.price.total;

    return (
      <>
          <View className="bg-[#121212] h-full top-4 py-4 px-6 mb-36 gap-6">
              <View className="box-card p-4 bg-[#1400ff] rounded-2xl w-full flex flex-col items-start justify-between relative">
                  <View className={'flex flex-row items-center justify-center gap-2'}>
                      <Text className="text-white text-lg font-semibold">{format(parseISO(selectedFlight.itineraries[0].segments[0].departure.at), 'EEE, MMM dd')}</Text>
                      <Text className="text-white">{formatDuration(selectedFlight.itineraries[0].duration)}</Text>
                      {selectedFlight.validatingAirlineCodes.map((carrierCode, index) => (
                        <View key={index} className="flex flex-row items-center gap-2 bg-white rounded p-[1px]">
                            {getCarrierLogoComponent(carrierCode)}
                        </View>
                      ))}
                  </View>
                  <View className="flex flex-row items-center justify-between w-full">
                      <View className="w-1/3 flex flex-col items-start gap-2">
                      </View>
                      <View className="w-2/3 flex flex-col items-center gap-2">
                          {showDetails && (
                            <View className="mt-4">
                                {selectedFlight.itineraries[0].segments.map((segment, index) => (
                                  <View key={index} className="mb-4">
                                      <Text className="text-white">Departure: {format(parseISO(segment.departure.at), 'HH:mm')} from {segment.departure.iataCode}</Text>
                                      <Text className="text-white">Arrival: {format(parseISO(segment.arrival.at), 'HH:mm')} at {segment.arrival.iataCode}</Text>
                                      <Text className="text-white">Duration: {formatDuration(segment.duration)}</Text>
                                      {index < selectedFlight.itineraries[0].segments.length - 1 && (
                                        <Text className="text-white">Transfer: {formatDuration(selectedFlight.itineraries[0].duration)}</Text>
                                      )}
                                  </View>
                                ))}
                            </View>
                          )}
                      </View>
                  </View>
                  <View className="flex flex-row items-center justify-center w-full">
                      <TouchableOpacity onPress={() => setShowDetails(!showDetails)} className="mt-2">
                          <Text className="text-white text-lg">{showDetails ? 'Hide Details' : 'Show Details'}</Text>
                      </TouchableOpacity>
                  </View>
                  <View className="flex flex-col items-center justify-between w-full mt-4">
                      <View className="flex flex-row items-center w-full justify-start gap-4">
                          <Text className="text-white text-lg font-bold">{selectedFlight.travelerPricings[0].fareDetailsBySegment[0].cabin} Class</Text>
                      </View>
                      <View className="flex flex-row items-center justify-between w-full">
                          <Text className="text-white text-lg font-bold">Current Price for passengers</Text>
                          <Text className="text-white text-lg font-bold">{selectedFlight.price.total}€</Text>
                      </View>
                  </View>
              </View>

              <View className="flex flex-row justify-between items-center p-4 bg-[#181818] rounded-xl">
                  <Text className="text-white text-lg font-normal">Showing {flightData.meta.count} results</Text>
              </View>

              <View className="flex flex-col gap-4">
                  {flightData.data.map(flight => {
                      const returnItinerary = flight.itineraries[1];
                      const departureSegment = returnItinerary.segments[0];
                      const arrivalSegment = returnItinerary.segments[returnItinerary.segments.length - 1];
                      const totalDuration = returnItinerary.duration;
                      const numberOfStops = returnItinerary.segments.length - 1;
                      const returnFlightPrice = flight.price.total;
                      const priceDifference = (returnFlightPrice - defaultReturnPrice).toFixed(2);

                      return (
                        <View key={flight.id} className="bg-[#181818] rounded-2xl p-4 shadow-lg">
                            <View className="flex-row items-center">
                                {getCarrierLogoComponent(flight.validatingAirlineCodes[0])}
                                <Text className="ml-4 text-white font-bold text-md capitalize">{flightData.dictionaries.carriers[flight.validatingAirlineCodes[0]]}</Text>
                            </View>
                            <View className="mt-4 flex-row justify-between items-center">
                                <Text className="text-white font-bold text-lg">{format(parseISO(departureSegment.departure.at), 'HH:mm')}</Text>
                                <Text className="text-white">-</Text>
                                <View className="flex items-center gap-1">
                                    <Text className="text-white text-xs">{numberOfStops > 0 ? `${numberOfStops} stops` : 'Direct'}</Text>
                                    <View className="transform -rotate-90 relative">
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
                                <Text className="text-white font-bold text-lg">{priceDifference > 0 ? `+${priceDifference}€` : `${priceDifference}€`}</Text>
                                <View className="flex-row items-center gap-2">
                                    <MaterialCommunityIcons name={'bag-suitcase-outline'} size={18} color="white" />
                                    <Text className="text-white text-lg">{flight.travelerPricings[0].fareDetailsBySegment[0].includedCheckedBags.quantity}</Text>
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
