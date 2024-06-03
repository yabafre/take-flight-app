import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import { ArrowLeft } from 'iconsax-react-native';
import { MaterialIcons } from '@expo/vector-icons';
import CitySearch from '@app/components/search/CitySearch';
import { format } from 'date-fns';
import FullScreenDatePicker from '@app/components/search/SearchDatePicker';
import PassengerModal from '@app/components/search/PassengerModal';

export default function SearchFlightPage() {
  const { top, bottom } = useSafeAreaInsets();
  const router = useRouter();
  const [mode, setMode] = useState('one-way');
  const [isScrolled, setIsScrolled] = useState(false);
  const [departureCity, setDepartureCity] = useState('');
  const [arrivalCity, setArrivalCity] = useState('');
  const [showDepartureSearch, setShowDepartureSearch] = useState(false);
  const [showArrivalSearch, setShowArrivalSearch] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDates, setSelectedDates] = useState('');
  const [showPassengerModal, setShowPassengerModal] = useState(false);
  const [passengers, setPassengers] = useState({ adults: '1', children: '0' });

  const handleScroll = (event) => {
    const scrollPosition = event.nativeEvent.contentOffset.y;
    setIsScrolled(scrollPosition > top);
  };

  const backViewIf = () => {
    if (showDepartureSearch || showArrivalSearch || showDatePicker) {
      return (
        <TouchableOpacity onPress={() => {
          setShowDepartureSearch(false);
          setShowArrivalSearch(false);
          setShowDatePicker(false);
        }} className={`ml-2`}>
          <MaterialIcons name="close" size={26} color="black" />
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity onPress={() => router.back()} className={`ml-2`}>
          <ArrowLeft size={26} color={isScrolled ? '#fff' : '#000'} />
        </TouchableOpacity>
      );
    }
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
          backViewIf()
        )
      }} />
      <ScrollView
        className={`flex-1 flex flex-col bg-green-400 h-full`}
        style={{ paddingTop: top + 60, paddingBottom: bottom }}
        onScroll={handleScroll}
        scrollEventThrottle={16} // To ensure smooth scroll handling
      >
        <View className={`flex flex-col justify-center h-full px-6 pb-8 bg-white`}>
          <View className="w-full flex flex-col justify-center gap-4 pb-24">
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
                <Text className="ml-2 flex-1">{departureCity || 'Departure'}</Text>
              </Pressable>
              <View className="flex justify-center mx-2">
                <MaterialIcons name="compare-arrows" size={24} color="black" />
              </View>
              <Pressable onPress={() => setShowArrivalSearch(true)} className="flex-1 p-3 border border-gray-300 rounded-lg flex-row items-center">
                <MaterialIcons name="flight-land" size={24} color="black" />
                <Text className="ml-2 flex-1">{arrivalCity || 'Arrival'}</Text>
              </Pressable>
            </View>
            <View className="mb-4">
              <TouchableOpacity onPress={() => setShowDatePicker(true)} className="flex-row items-center border border-gray-300 rounded-lg p-3">
                {mode === 'one-way' ? (
                  <Text>{selectedDates.startDate ? format(new Date(selectedDates.startDate), 'EEE, MMM d') : 'Departure Date'}</Text>
                ) : (
                  <View className="flex flex-row justify-between w-full">
                    <Text>{selectedDates.startDate ? format(new Date(selectedDates.startDate), 'EEE, MMM d') : 'Departure Date'}</Text>
                    <Text>{selectedDates.endDate ? format(new Date(selectedDates.endDate), 'EEE, MMM d') : 'Return Date'}</Text>
                  </View>
                )}
              </TouchableOpacity>
            </View>
            <View className="flex flex-row justify-between">
              <TouchableOpacity onPress={() => setShowPassengerModal(true)} className="flex-1 p-3 border border-gray-300 rounded-lg flex-row items-center mr-2">
                <MaterialIcons name="person" size={24} color="black" />
                <Text className="ml-2 flex-1">{`${passengers.adults} Adults, ${passengers.children} Children`}</Text>
              </TouchableOpacity>
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
      {showDatePicker && (
        <FullScreenDatePicker
          visible={showDatePicker}
          onClose={() => setShowDatePicker(false)}
          onSelectDates={(date) => setSelectedDates(date)}
          mode={mode}
        />
      )}
      {showPassengerModal && (
        <PassengerModal
          visible={showPassengerModal}
          onClose={() => setShowPassengerModal(false)}
          onSelectPassengers={setPassengers}
        />
      )}
    </>
  );
}
