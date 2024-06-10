import React, {useState} from 'react';
import { View, Text, Pressable, TouchableOpacity, ScrollView } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ArrowLeft, Calendar, Profile2User } from 'iconsax-react-native';
import { Entypo, MaterialIcons } from '@expo/vector-icons';
import CitySearch from '@app/components/search/CitySearch';
import { format } from 'date-fns';
import FullScreenDatePicker from '@app/components/search/SearchDatePicker';
import PassengerModal from '@app/components/search/PassengerModal';
import { StatusBar } from 'expo-status-bar';
import useFlightSearch from '@app/hooks/useFlightSearch';

export default function SearchFlightPage() {
  const { top, bottom } = useSafeAreaInsets();
  const router = useRouter();
  const {
    searchParams,
    setDepartureCity,
    setArrivalCity,
    setSelectedDates,
    setPassengers,
    setMode,
    mode,
    departureCity,
    arrivalCity,
    selectedDates,
    passengers
  } = useFlightSearch();
  const [isScrolled, setIsScrolled] = useState(false);
  const [showDepartureSearch, setShowDepartureSearch] = useState(false);
  const [showArrivalSearch, setShowArrivalSearch] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showPassengerModal, setShowPassengerModal] = useState(false);

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
            <MaterialIcons name="close" size={26} color="white" />
          </TouchableOpacity>
      );
    } else {
      return (
          <TouchableOpacity onPress={() => router.back()} className={`ml-2`}>
            <ArrowLeft size={26} color={'#fff'} />
          </TouchableOpacity>
      );
    }
  };

  const handleSubmit = () => {
    router.push('/search/flight/result');
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
          <View className={`flex flex-col justify-center items-center h-full bg-[#121212] mt-8 p-6 pb-8`}>
            <View className="w-full flex flex-col justify-center gap-6 pb-24">
              <View className=" toggle-mode flex flex-row items-center justify-between rounded-2xl h-14 bg-[#181818]">
                <Pressable onPress={() => setMode('one-way')} className={`flex-1 py-4 items-center justify-center rounded-l-2xl ${mode === 'one-way' ? 'bg-[#1400ff]' : ''}`}>
                  <Text className={`text-white`}>One Way</Text>
                </Pressable>
                <Pressable onPress={() => setMode('round-trip')} className={`flex-1 py-4 items-center justify-center rounded-r-2xl ${mode === 'round-trip' ? 'bg-[#1400ff]' : ''}`}>
                  <Text className={`text-white`}>Round Trip</Text>
                </Pressable>
              </View>
              <View className="flex flex-row items-center gap-4 pr-4 justify-between w-full">
                <Pressable onPress={() => setShowDepartureSearch(true)} className={`flex flex-row items-center justify-between rounded-2xl bg-[#181818] p-4 w-1/2 h-24`}>
                  <Text className={`text-white ${departureCity ? 'text-5xl' : 'text-xl'}`}>{departureCity || 'Departure'}</Text>
                  <Entypo name="aircraft-take-off" size={22} color="white" />
                </Pressable>
                <Pressable onPress={() => setShowArrivalSearch(true)} className={`flex flex-row items-center justify-between rounded-2xl bg-[#181818] p-4 w-1/2 h-24`}>
                  <Text className={`text-white ${arrivalCity ? 'text-5xl' : 'text-xl'}`}>{arrivalCity || 'Arrival'}</Text>
                  <Entypo name="aircraft-landing" size={22} color="white" />
                </Pressable>
              </View>
              <Pressable onPress={() => setShowDatePicker(true)} className={`flex flex-row items-center justify-between rounded-2xl bg-[#181818] p-4 h-24`}>
                <View className={`flex flex-row items-start gap-4`}>
                  <Text className={`text-white text-2xl`}>
                    {mode === 'one-way' && selectedDates.startDate ? format(new Date(selectedDates.startDate), 'EEE, MMM d') : mode === 'round-trip' && selectedDates.startDate ? format(new Date(selectedDates.startDate), 'EEE, MMM d') : 'Departure Date'}
                  </Text>
                  <Text className={`text-white text-2xl ${mode === 'one-way' ? 'hidden' : ''}`}>
                    -
                  </Text>
                  <Text className={`text-white text-2xl`}>
                    {mode === 'round-trip' && selectedDates.endDate ? ` ${format(new Date(selectedDates.endDate), 'EEE, MMM d')}` : mode === 'one-way' ? '' : 'Return Date'}
                  </Text>
                </View>
                <Calendar size={22} color="white" />
              </Pressable>

              <Pressable onPress={() => setShowPassengerModal(true)} className={`flex flex-row items-center justify-between rounded-2xl bg-[#181818] p-4 h-24`}>
                <Text className={`text-white text-xl`}>{passengers.adults} Adults, {passengers.children} Children</Text>
                <Profile2User variant={'Bold'} size={22} color="white" />
              </Pressable>

              <Pressable onPress={handleSubmit} className={`flex flex-row items-center justify-center rounded-2xl bg-[#1400ff] p-4 h-14`}>
                <Text className={`text-white`}>Search</Text>
              </Pressable>
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
