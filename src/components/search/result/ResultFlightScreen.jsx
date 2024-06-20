import React from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { format, parseISO } from 'date-fns';
import { Airplane, Setting4, Briefcase } from 'iconsax-react-native';
import { useSelector, useDispatch } from "react-redux";
import { useCityAutocomplete } from "@app/hooks/useCityAutocomplete";
import CountryFlag from "react-native-country-flag";
import airlineLogos from '@app/utils/airlineLogos';
import { useRouter } from 'expo-router';
import { setSelectedFlight } from '@app/store/reducers/search/searchSlice';
import { Image } from 'expo-image';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const ResultFlightScreen = ({ flightData, loading }) => {
  const dispatch = useDispatch();
  const router = useRouter();
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
    // console.log('originData', originData);
    return originData ? extractCityName(originData) : flightSearchParams.originLocationCode;
  };

  const destinationLocationName = () => {
    return isDestinationSuccess ? extractCityName(destinationData) : flightSearchParams.destinationLocationCode;
  };

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

  const generateDateDots = () => {
    const daysDifference = 15;
    const dots = [];
    for (let i = 0; i < daysDifference; i++) {
      dots.push(<Text key={i} className="text-white text-sm font-bold">-</Text>);
    }
    return dots;
  };

  const handleSelectFlight = (flight) => {
    dispatch(setSelectedFlight(flight));
    const mode = flightSearchParams.returnDate ? 'round-trip' : 'one-way';
    if (mode === 'round-trip') {
      router.push('/search/return-flights');
    } else {
      console.log('Selected flight', flight);
    }
  };

  if (!flightData || !flightData.data || !flightData.dictionaries) {
    return <Text style={{ color: 'white' }}>No flight data available.</Text>;
  }

  return (
      <>
        <View className="bg-[#121212] h-full top-4 py-4 px-6 mb-36 gap-6">
          <View className="p-4 bg-[#1400ff] rounded-2xl h-[255px] w-full flex flex-col items-start justify-between relative">
            <View className={'flex flex-col items-start gap-2'}>
              <Text className="text-white text-lg font-extralight">{flightSearchParams.returnDate ? 'Round Trip' : 'One Way'}</Text>
              <Text className="text-white text-6xl font-light">{originLocationName()} to {destinationLocationName()}</Text>
            </View>
            <View className="flex flex-row items-center gap-4">
              <Text className="text-white text-lg font-bold">{flightSearchParams.adults} Adults, {flightSearchParams.children || 0} Children</Text>
            </View>
            <View className="flex flex-row items-center justify-between w-full">
              <Text className="text-white text-lg font-bold">{format(parseISO(flightSearchParams.departureDate), 'dd MMM')}</Text>
              <View className={'dots flex flex-row items-center justify-between w-[60%]'}>
                <Text className="text-white text-2xl font-bold">•</Text>
                {generateDateDots()}
                <Text className="text-white text-2xl font-bold">•</Text>
              </View>
              <Text className="text-white text-lg font-bold">{flightSearchParams.returnDate ? format(parseISO(flightSearchParams.returnDate), 'dd MMM') : ''}</Text>
            </View>
            {/*<View className="absolute bottom-4 right-2 top-24">*/}
            {/*  <View className="flex flex-row items-center gap-4 bg-white rounded-xl py-1 px-2 relative overflow-hidden">*/}
            {/*    <View className="transform rotate-45 relative ">*/}
            {/*      <Airplane size={18} variant={'Bold'} color="black" />*/}
            {/*    </View>*/}
            {/*    <View className="absolute top-0 left-0 right-0 bottom-0 bg-[#E0E0E018] opacity-50" />*/}
            {/*    {isDestinationSuccess && destinationData && destinationData.length > 0 && (*/}
            {/*        <CountryFlag size={12} isoCode={destinationData.find((entry) => entry.subType === 'CITY')?.address.countryCode || ''} />*/}
            {/*    )}*/}
            {/*  </View>*/}
            {/*</View>*/}
          </View>
          <View className="flex flex-row justify-between items-center p-4 bg-[#181818] rounded-xl">
            <Text className="text-white text-lg font-normal">Showing {flightData.meta.count} results</Text>
            <TouchableOpacity className="flex-row items-center gap-2 mt-2">
              <Setting4 size={18} color="white" />
              <Text className="text-white text-base">Filter</Text>
            </TouchableOpacity>
          </View>
          <View className="flex flex-col gap-4">
            {flightData.data.map(flight => {
              const outboundItinerary = flight.itineraries[0];

              const renderItinerary = (itinerary, isReturn = false) => {
                const departureSegment = itinerary.segments[0];
                const arrivalSegment = itinerary.segments[itinerary.segments.length - 1];
                const totalDuration = itinerary.duration;
                const numberOfStops = itinerary.segments.length - 1;

                return (
                    <View key={`${flight.id}-${isReturn ? 'return' : 'outbound'}`} className="bg-[#181818] rounded-2xl p-4 shadow-lg">
                      <View className="flex-row items-center">
                        {getCarrierLogoComponent(flight.validatingAirlineCodes[0])}
                        <Text className="ml-4 text-white font-bold text-md capitalize">{flightData.dictionaries.carriers[flight.validatingAirlineCodes[0]]}</Text>
                      </View>
                      <View className="mt-4 flex-row justify-between items-center">
                        <Text className="text-white font-bold text-lg">{format(parseISO(departureSegment.departure.at), 'HH:mm')}</Text>
                        <Text className="text-white">-</Text>
                        <View className="flex items-center gap-1">
                          <Text className="text-white text-xs">{numberOfStops > 0 ? `${numberOfStops} stops` : 'Direct'}</Text>
                          <View className="transform rotate-90 relative">
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
                        <Text className="text-white font-bold text-lg">{flight.price.total}€</Text>
                        <View className="flex-row items-center gap-2">
                          <MaterialCommunityIcons name={'bag-suitcase-outline'} size={18} color="white" />
                          <Text className="text-white text-lg">{flight.travelerPricings[0].fareDetailsBySegment[0].includedCheckedBags.quantity}</Text>
                        </View>
                        <TouchableOpacity
                            className="mt-4 bg-black py-2 px-4 rounded-lg items-center"
                            onPress={() => handleSelectFlight(flight)}
                        >
                          <Text className="text-white font-bold">Select</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                );
              };

              return (
                  <View key={flight.id}>
                    {renderItinerary(outboundItinerary)}
                  </View>
              );
            })}
            {loading && (
                <View className="flex flex-col items-center justify-center gap-4">
                    <ActivityIndicator size="large" color="#1400ff" />
                </View>
            )}
          </View>
        </View>
      </>
  );
};

export default ResultFlightScreen;
