import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { Stack, useRouter, useGlobalSearchParams } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import ResultFlightScreen from '@app/components/search/result/ResultFlightScreen';
import { ArrowLeft } from 'iconsax-react-native';
import useSearch from '@app/hooks/useSearch';
import { useSelector } from "react-redux";

export default function ResultPage() {
    const { top, bottom } = useSafeAreaInsets();
    const router = useRouter();
    const [isScrolled, setIsScrolled] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [flight, setFlight] = useState([]);
    const [loadingMore, setLoadingMore] = useState(false);
    const PAGINATION_SIZE = 30;
    const flightSearchParams = useSelector((state) => state.search.flightSearchParams);

    const { status, error } = useSearch('flights', flightSearchParams);
    const data = useSelector((state) => state.search.flights);

    useEffect(() => {
        if (data && data.data) {
            const paginatedData = data.data.slice(0, currentPage * PAGINATION_SIZE);
            setFlight(paginatedData);
        }
    }, [currentPage, data]);

    const handleScroll = (event) => {
        const scrollPosition = event.nativeEvent.contentOffset.y;
        setIsScrolled(scrollPosition > top);

        const layoutMeasurement = event.nativeEvent.layoutMeasurement;
        const contentSize = event.nativeEvent.contentSize;

        if (layoutMeasurement.height + scrollPosition >= contentSize.height - 100) {
            loadMoreResults();
        }
    };

    const loadMoreResults = () => {
        if (loadingMore || currentPage * PAGINATION_SIZE >= data.data.length) return;

        setLoadingMore(true);
        setTimeout(() => {
            setCurrentPage(prevPage => prevPage + 1);
            setLoadingMore(false);
        }, 1000);
    };

    const renderContent = () => {
        if (status === 'loading') {
            return (
              <View className={`flex flex-col justify-center items-center h-full bg-[#121212] mt-8 p-6 pb-8`}>
                  <ActivityIndicator size="large" color="#1400ff" />
              </View>
            );
        }
        if (status === 'error') {
            return (
              <View className={`flex flex-col justify-center items-center h-full bg-[#121212] mt-8 p-6 pb-8`}>
                  <Text style={{ color: 'white', textAlign: 'center' }}>An error occurred: {error}</Text>
              </View>
            );
        }
        if (data && flight) {
          // console.log('flight', data);
            return (
              <>
                  <ResultFlightScreen flightData={{ data: flight, dictionaries: data.dictionaries, meta: { count: data.data.length } }} loading={loadingMore} />
              </>
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
              headerTitle: 'Flights',
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
