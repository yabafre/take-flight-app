import React from 'react';
import { View, Text, Pressable, TouchableOpacity, ImageBackground, StyleSheet } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ArrowLeft } from "iconsax-react-native";
import { MaterialIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';

export default function Page() {
  const { top, bottom } = useSafeAreaInsets();
  const router = useRouter();

  return (
    <>
      <Stack.Screen options={{
        headerTransparent: true,
        headerTitle: '',
        headerLeft: () => (
          <TouchableOpacity onPress={() => router.back()}  className={`ml-4`}>
            <ArrowLeft size={24} color={'#fff'} />
          </TouchableOpacity>
        ),
        headerRight: () => (
          <View className="flex flex-row items-center gap-4 p-2 bg-white rounded-xl">
            <Text className="text-black">Where to go...</Text>
          </View>
        )
      }} />
      <ImageBackground
        source={require('@assets/images/bg-search-page.png')}
        style={{ width: '100%', height: 650, borderRadius: 15, overflow: 'hidden', filter: 'brightness(0.6)' }}
        className={`flex-1 justify-center items-center`}
        resizeMode="cover"
        imageStyle={{ borderRadius: 30 }}
      >
        <View className={`flex-1 flex flex-col p-6 justify-center items-center relative w-full h-full`} >
          <View style={styles.Container} className={'w-[98%] h-[155px] bg-white p-4 flex flex-col justify-end absolute bottom-20'}>
            <View className="flex flex-row items-center justify-between px-2">
              <TouchableOpacity
                className="flex flex-col items-center"
                onPress={() => router.push('/search/flight')} >
                <MaterialIcons name={"flight-takeoff"} size={25} color={'#000'} />
                <View className="flex flex-row items-center gap-4">
                  <Text className="text-xl font-semibold text-black">Flight</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                className="flex flex-col items-center"
                onPress={() => router.push('/search/allinclude')} >
                <Entypo name={"infinity"} size={25} color={'#000'} />
                <View className="flex flex-row items-center gap-4">
                  <Text className="text-xl font-semibold text-black">All Inclusives</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                className="flex flex-col items-center"
                onPress={() => router.push('/search/hotel')} >
                <MaterialIcons name={"hotel"} size={25} color={'#000'} />
                <View className="flex flex-row items-center gap-4">
                  <Text className="text-xl font-semibold text-black">Hotel</Text>
                </View>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={{ borderRadius: 15 }}
              className="flex flex-row items-center justify-center h-[48px] gap-2 w-full py-2 px-4 mt-4 bg-black"
              onPress={() => router.push('/search')}
            >
              <Text className="text-sm text-white">Show More</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </>
  );
}


const styles = StyleSheet.create({
  Container: {
    shadowColor: 'rgba(0,0,0,0.45)',
    shadowOffset: { width: -13, height: 10 },
    shadowOpacity: 0.42,
    shadowRadius: 43,
    elevation: 5,
    backgroundColor: '#fff',
    borderRadius: 30,
    padding: 25,
  },
});
