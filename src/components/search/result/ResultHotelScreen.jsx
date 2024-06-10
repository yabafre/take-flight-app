import React from 'react';
import { View, Text, Pressable, TouchableOpacity, ScrollView } from 'react-native';
import { Stack, useRouter, useLocalSearchParams, useGlobalSearchParams, Link } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ArrowLeft, Profile2User, Airplane } from 'iconsax-react-native';
import { MaterialIcons } from '@expo/vector-icons';




export default function ResultFlightScreen() {

  return (
    <>
      <View className="p-4">
        <Text className="text-white text-lg font-bold">Showing 25 results</Text>
        <TouchableOpacity className="flex-row items-center mt-2">
          <Text className="text-white text-base">Filter</Text>
          <MaterialIcons name="filter-list" size={24} color="white" />
        </TouchableOpacity>
      </View>
      <View className="p-4 bg-white rounded-lg m-4">
        <Text className="text-black font-bold">Fly Emirates</Text>
        <View className="flex-row justify-between items-center mt-2">
          <Text className="text-black">11:25 - 19:10</Text>
          <Text className="text-black">8hr 20min</Text>
        </View>
        <View className="flex-row justify-between items-center mt-2">
          <Text className="text-black">DXB - SIN</Text>
          <Text className="text-black font-bold">$1,250</Text>
        </View>
        <TouchableOpacity className="mt-4 bg-black py-2 rounded-lg items-center">
          <Text className="text-white">Book Now</Text>
        </TouchableOpacity>
      </View>
      <View className="p-4 bg-white rounded-lg m-4">
        <Text className="text-black font-bold">Singapore Airlines</Text>
        <View className="flex-row justify-between items-center mt-2">
          <Text className="text-black">18:10 - 08:15</Text>
          <Text className="text-black">10hr 10min</Text>
        </View>
        <View className="flex-row justify-between items-center mt-2">
          <Text className="text-black">DXB - SIN</Text>
          <Text className="text-black font-bold">$1,410</Text>
        </View>
        <TouchableOpacity className="mt-4 bg-black py-2 rounded-lg items-center">
          <Text className="text-white">Book Now</Text>
        </TouchableOpacity>
      </View>
    </>
  );

}