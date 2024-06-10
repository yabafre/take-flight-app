import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, TouchableOpacity, ScrollView } from 'react-native';
import { Stack, useRouter, useGlobalSearchParams, Link } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import ResultFlightScreen from '@app/components/search/result/ResultFlightScreen';
import ResultHotelScreen from '@app/components/search/result/ResultHotelScreen';
import { ArrowLeft } from 'iconsax-react-native';

export default function ResultPage() {
  const { top, bottom } = useSafeAreaInsets();
  const router = useRouter();
  const globalSearchParams = useGlobalSearchParams();
  const [isScrolled, setIsScrolled] = useState(false);

  const handleScroll = (event) => {
    const scrollPosition = event.nativeEvent.contentOffset.y;
    setIsScrolled(scrollPosition > top);
  };

  console.log(globalSearchParams);

  return (
    <>
      <Stack.Screen options={{
        headerTransparent: true,
        headerBackground: () => (
          <View style={{ height: top + 60 }} className={isScrolled ? 'bg-[#121212]' : ''} />
        ),
        headerTitle: globalSearchParams.index === 'flights' ? 'Flights' : 'Hotels',
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
        {globalSearchParams.index === 'flights' ? <ResultFlightScreen /> : <ResultHotelScreen />}
      </ScrollView>
    </>
  );
}
