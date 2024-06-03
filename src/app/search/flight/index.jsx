import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import { ArrowLeft } from 'iconsax-react-native';
import { MaterialIcons } from '@expo/vector-icons';
import CitySearch from '@app/components/search/CitySearch';

export default function SearchFlightPage() {
  const { top, bottom } = useSafeAreaInsets();
  const router = useRouter();
  const [mode, setMode] = useState('one-way');
  const [isScrolled, setIsScrolled] = useState(false);
  const [departureCity, setDepartureCity] = useState('');
  const [arrivalCity, setArrivalCity] = useState('');
  const [showDepartureSearch, setShowDepartureSearch] = useState(false);
  const [showArrivalSearch, setShowArrivalSearch] = useState(false);

  const handleScroll = (event) => {
    const scrollPosition = event.nativeEvent.contentOffset.y;
    setIsScrolled(scrollPosition > top);
  };

  return (
    <>
      <Stack.Screen options={{
        headerTransparent: true,
        headerBackground: () => (
          <View style={{ height: top + 60 }} className={isScrolled ? 'bg-black' : ''} />
        ),
        headerTitle: '',
        headerLeft: () => (
          <TouchableOpacity onPress={() => router.back()} className={`ml-2`}>
            <ArrowLeft size={26} color={isScrolled ? '#fff' : '#000'} />
          </TouchableOpacity>
        )
      }} />
      <ScrollView
        className={`flex-1 flex bg-white`}
        style={{ paddingTop: top + 60, paddingBottom: bottom }}
        onScroll={handleScroll}
        scrollEventThrottle={16} // To ensure smooth scroll handling
      >
        <View className={`flex flex-col px-6 pb-8 bg-white`}>
          <View className="w-full flex flex-col gap-4 pb-24">
            <View className="flex flex-row justify-between gap-2">
              <Pressable onPress={() => setMode('one-way')} className={`p-3 flex-1 border border-gray-300 rounded-lg ${mode === 'one-way' ? 'bg-black' : 'bg-white'}`}>
                <Text className={`text-center ${mode === 'one-way' ? 'text-white' : 'text-black'}`}>One-Way</Text>
              </Pressable>
              <Pressable onPress={() => setMode('round-trip')} className={`p-3 flex-1 border border-gray-300 rounded-lg ${mode === 'round-trip' ? 'bg-black' : 'bg-white'}`}>
                <Text className={`text-center ${mode === 'round-trip' ? 'text-white' : 'text-black'}`}>Round-trip</Text>
              </Pressable>
            </View>
            <View className="flex flex-row justify-between">
              <Pressable onPress={() => setShowDepartureSearch(true)} className="flex-1 p-3 border border-gray-300 rounded-lg flex-row items-center">
                <MaterialIcons name="flight-takeoff" size={24} color="black" />
                <Text className="ml-2 flex-1">{departureCity || 'Select Departure'}</Text>
              </Pressable>
              <View className="flex justify-center mx-2">
                <MaterialIcons name="compare-arrows" size={24} color="black" />
              </View>
              <Pressable onPress={() => setShowArrivalSearch(true)} className="flex-1 p-3 border border-gray-300 rounded-lg flex-row items-center">
                <MaterialIcons name="flight-land" size={24} color="black" />
                <Text className="ml-2 flex-1">{arrivalCity || 'Select Arrival'}</Text>
              </Pressable>
            </View>
            <View className="mb-4">
              <View className="flex-row items-center border border-gray-300 rounded-lg p-3">
                <MaterialIcons name="date-range" size={24} color="black" />
                <TextInput placeholder="Departure date" className="ml-2 flex-1" />
              </View>
            </View>
            <View className="flex flex-row justify-between">
              <View className="flex-1 p-3 border border-gray-300 rounded-lg flex-row items-center mr-2">
                <MaterialIcons name="person" size={24} color="black" />
                <TextInput placeholder="Passenger" className="ml-2 flex-1" />
              </View>
              <View className="flex-1 p-3 border border-gray-300 rounded-lg flex-row items-center">
                <MaterialIcons name="class" size={24} color="black" />
                <TextInput placeholder="Select class" className="ml-2 flex-1" />
              </View>
            </View>
            <Pressable className="p-3 bg-black rounded-lg flex flex-row justify-center">
              <Text className="text-white">Search Flights</Text>
            </Pressable>
            <View className="mt-6">
              <Text className="text-lg font-semibold mb-2">Recently Searched</Text>
              <View className="flex-row justify-between mb-4">
                <View className="p-3 bg-white border border-gray-300 rounded-lg flex-1 mr-2">
                  <Text className="text-black">LGW - AMS</Text>
                  <Text className="text-gray-500">Jan 24, 24 • 1 Seat • Economy</Text>
                </View>
                <View className="p-3 bg-white border border-gray-300 rounded-lg flex-1">
                  <Text className="text-black">NYC - LON</Text>
                  <Text className="text-gray-500">Jan 04, 24 • 1 Seat • Economy</Text>
                </View>
              </View>
            </View>
            <View className="mt-6">
              <Text className="text-lg font-semibold mb-2">New promotions</Text>
              <View>
                <Pressable className="flex flex-row items-center mb-2">
                  <Image
                    source={require('@assets/images/slide-promo-flight.png')}
                    style={{ width: '100%', height: 200, borderRadius: 10 }}
                    contentFit={'fill'}
                  />
                </Pressable>
                <Pressable className="flex flex-row items-center">
                  <Image
                    source={require('@assets/images/slide-promo-flight.png')}
                    style={{ width: '100%', height: 200, borderRadius: 10 }}
                    contentFit={'fill'}
                  />
                </Pressable>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
      {showDepartureSearch && (
        <CitySearch
          setCode={(cityCode) => {
            setDepartureCity(cityCode);
            setShowDepartureSearch(false);
          }}
          onClose={() => setShowDepartureSearch(false)}
        />
      )}

      {showArrivalSearch && (
        <CitySearch
          setCode={(cityCode) => {
            setArrivalCity(cityCode);
            setShowArrivalSearch(false);
          }}
          onClose={() => setShowArrivalSearch(false)}
        />
      )}
    </>
  );
}
