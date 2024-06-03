import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { CloseCircle, SearchNormal1 } from 'iconsax-react-native';
import { useCityAutocomplete } from '@app/hooks/useCityAutocomplete';
import { MaterialIcons } from '@expo/vector-icons';
import { MotiView } from 'moti';

export default function CitySearch({ setCode, onClose }) {
  const { top, bottom } = useSafeAreaInsets();
  const [keyword, setKeyword] = useState('');
  const { data: cities, isLoading, error } = useCityAutocomplete(keyword);

  const handleSelect = (cityCode) => {
    setCode(cityCode);
    onClose();
  };

  return (
    <MotiView
      from={{ translateY: 500 }}
      animate={{ translateY: 0 }}
      exit={{ translateY: 100 }}
      transition={{ type: 'timing', duration: 500 }}
      className="flex-1 bg-white absolute z-[99] h-full w-full"
      style={{ paddingTop: top + 50, paddingBottom: bottom }}
    >
      <View className="flex flex-row items-center p-4">
        <View className="flex-1 flex flex-row items-center bg-gray-100 p-2 rounded-full">
          <TextInput
            placeholder="Search for a city"
            value={keyword}
            onChangeText={setKeyword}
            className="flex-1 ml-2"
          />
          <TouchableOpacity onPress={() => setKeyword('')} className="mr-2">
            <CloseCircle size={20} color={'#000'} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={onClose} className="ml-2">
          <Text className="text-xl font-semibold">Close</Text>
        </TouchableOpacity>
      </View>
      {isLoading && <Text className="text-center">Loading...</Text>}
      {error && <Text className="text-center">Error loading cities</Text>}
      <FlatList
        data={cities}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity className="p-2 border-b border-gray-200" onPress={() => handleSelect(item.address.cityCode)}>
            <View className="flex flex-row items-center">
              {item.subType === 'CITY' ? (
                <MaterialIcons name="location-city" size={24} color="black" />
              ) : (
                <MaterialIcons name="flight" size={24} color="black" />
              )}
              <View className="ml-2">
                <Text className="text-black">{item.name}, {item.address.countryName}</Text>
                {item.subType === 'AIRPORT' && (
                  <Text className="text-gray-500">{item.detailedName}</Text>
                )}
              </View>
              <View className="ml-auto">
                <Text className="text-black">{item.iataCode}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </MotiView>
  );
}
