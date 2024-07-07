import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { format, parseISO } from 'date-fns';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter, Stack } from 'expo-router';
import { useSelector } from 'react-redux';
import useSearch from '@app/hooks/useSearch';
import { ArrowLeft } from 'iconsax-react-native';
import { Image } from 'expo-image';
import { StatusBar } from 'expo-status-bar';
import airlineLogos from '@app/utils/airlineLogos';

export default function FlightTicket() {
  const router = useRouter();
  const { top, bottom } = useSafeAreaInsets();
  const [isScrolled, setIsScrolled] = useState(false);
  const selectedFlight = useSelector((state) => state.search.selectedFlight);
  const { status, error } = useSearch('flight-pricing', selectedFlight);
  const PricingData = useSelector((state) => state.search.flightPricingData);
  const flightOffers = PricingData?.flightOffers;
  const [showSegments, setShowSegments] = useState(false);

  const formatDuration = (duration) => {
    console.log('duration', duration);
    if (!duration || typeof duration !== 'string') {
      return 'N/A';
    }
    const matches = duration.match(/PT(\d+H)?(\d+M)?/);
    const hours = matches[1] ? matches[1].slice(0, -1) : '0';
    const minutes = matches[2] ? matches[2].slice(0, -1) : '0';
    return `${hours}h ${minutes}min`;
  };

  const handleScroll = (event) => {
    const scrollPosition = event.nativeEvent.contentOffset.y;
    setIsScrolled(scrollPosition > top);
  };

  const getCarrierLogoComponent = (carrierCode) => {
    const LogoComponent = airlineLogos[carrierCode]?.compact_svg;
    const srcLogo = airlineLogos[carrierCode]?.compact;
    return LogoComponent ? <LogoComponent width={24} height={24} /> : <Image source={srcLogo} style={{ width: 24, height: 24 }} />;
  };

  const renderFlightDetails = (flight) => (
    <View key={flight.id} className={`bg-white rounded-xl shadow-md p-4 mb-4`}>
      <View className={`flex flex-row justify-between items-center`}>
        {flight.validatingAirlineCodes.map((carrierCode, index) => (
          <View key={index} className={`flex flex-row items-center gap-2`}>
            {getCarrierLogoComponent(carrierCode)}
            <Text className={`text-lg font-bold`}>{carrierCode}</Text>
          </View>
        ))}
        <Text className={`text-lg font-bold`}>Flight Number: {flight.id}</Text>
      </View>

      <View className={`mt-4`}>
        <Text className={`text-lg font-semibold`}>From:</Text>
        <Text className={`text-base`}>{flight.itineraries[0].segments[0].departure.iataCode}</Text>
        <Text className={`text-base`}>
          {format(parseISO(flight.itineraries[0].segments[0].departure.at), 'HH:mm, dd MMM yyyy')}
        </Text>
      </View>

      <View className={`mt-4`}>
        <Text className={`text-lg font-semibold`}>To:</Text>
        <Text className={`text-base`}>{flight.itineraries[0].segments.slice(-1)[0].arrival.iataCode}</Text>
        <Text className={`text-base`}>
          {format(parseISO(flight.itineraries[0].segments.slice(-1)[0].arrival.at), 'HH:mm, dd MMM yyyy')}
        </Text>
      </View>

      <View className={`mt-4`}>
        <Text className={`text-lg font-semibold`}>Duration:</Text>
        <Text className={`text-base`}>{formatDuration(flight.itineraries[0].duration)}</Text>
      </View>

      <View className={`mt-4`}>
        <Text className={`text-lg font-semibold`}>Traveler Type:</Text>
        {flight.travelerPricings.map((traveler, index) => (
          <Text key={index} className={`text-base`}>
            {traveler.travelerType} - {traveler.fareOption}
          </Text>
        ))}
      </View>

      <View className={`mt-4`}>
        <Text className={`text-lg font-semibold`}>Class:</Text>
        <Text className={`text-base`}>{flight.travelerPricings[0].fareDetailsBySegment[0].cabin}</Text>
      </View>

      <View className={`mt-4`}>
        <Text className={`text-lg font-semibold`}>Total Price:</Text>
        <Text className={`text-base`}>{flight.price.total} {flight.price.currency}</Text>
      </View>

      <TouchableOpacity
        onPress={() => setShowSegments(!showSegments)}
        className={`mt-4 flex flex-row items-center justify-center bg-blue-500 rounded-lg p-2`}
      >
        <Text className={`text-white font-bold`}>
          {showSegments ? 'Hide Segments' : 'Show Segments'}
        </Text>
      </TouchableOpacity>

      {showSegments && (
        <View className={`mt-4 bg-gray-100 p-2 rounded-lg`}>
          {flight.itineraries.map((itinerary, itinIndex) => (
            <View key={itinIndex}>
              <Text className={`text-base font-semibold`}>Itinerary {itinIndex + 1}:</Text>
              {itinerary.segments.map((segment, index) => (
                <View key={index} className={`mt-2`}>
                  <Text className={`text-base font-semibold`}>Segment {index + 1}:</Text>
                  <Text className={`text-base`}>
                    {segment.departure.iataCode} ({format(parseISO(segment.departure.at), 'HH:mm, dd MMM yyyy')}) - {segment.arrival.iataCode} ({format(parseISO(segment.arrival.at), 'HH:mm, dd MMM yyyy')})
                  </Text>
                  <Text className={`text-base`}>Flight Number: {segment.carrierCode} {segment.number}</Text>
                  <Text className={`text-base`}>Duration: {formatDuration(segment.duration)}</Text>
                  <Text className={`text-base`}>Stops: {segment.numberOfStops}</Text>
                </View>
              ))}
            </View>
          ))}
        </View>
      )}
    </View>
  );

  const renderContent = () => {
    if (status === 'loading') {
      return (
        <View className={`flex flex-col justify-center items-center h-full`}>
          <ActivityIndicator size="large" color="#1400ff" />
        </View>
      );
    }

    if (status === 'error') {
      return (
        <View className={`flex flex-col justify-center items-center h-full`}>
          <Text className={`text-lg font-semibold`}>Error: {error.message}</Text>
        </View>
      );
    }

    if (status === 'idle' && flightOffers) {
      return (
        <View className={`flex flex-col justify-center items-center h-full`}>
          {flightOffers.map((flight) => renderFlightDetails(flight))}
        </View>
      );
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
        headerTitle: 'Flight Ticket',
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
        className={`flex-1 bg-[#121212]`}
        contentContainerStyle={{ paddingTop: top + 60, paddingBottom: bottom, alignItems: 'center' }}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        {renderContent()}
      </ScrollView>
    </>
  );
}
