import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { CloseCircle } from 'iconsax-react-native';
import { useCityAutocomplete } from '@app/hooks/useCityAutocomplete';
import { Feather } from '@expo/vector-icons';
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

  const highlightText = (text, highlight) => {
    if (!highlight.trim()) {
      return <Text>{text}</Text>;
    }
    const regex = new RegExp(`(${highlight})`, 'gi');
    const parts = text.split(regex);
    return (
      <Text>
        {parts.map((part, index) =>
          part.toLowerCase() === highlight.toLowerCase() ? (
            <Text key={index} className={'text-[#91D3D6]'}>
              {part}
            </Text>
          ) : (
            part
          )
        )}
      </Text>
    );
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
        <View className="flex-1 flex flex-row items-center bg-white p-2 rounded-xl border-[1.5px] border-[#91D3D6]">
          <TextInput
            placeholder="Search city or airport"
            value={keyword}
            onChangeText={setKeyword}
            className="flex-1 ml-2"
          />
        </View>
        {/*<TouchableOpacity onPress={onClose} className="ml-2 absolute right-4 -top-10">*/}
        {/*  <CloseCircle size="32" color="#000" variant={'Bold'} />*/}
        {/*</TouchableOpacity>*/}
      </View>
      {isLoading && <ActivityIndicator size="large" color="#000" />}
      {error && <Text className="text-center">Error loading cities</Text>}
      <FlatList
        data={cities}
        className={`px-4 mb-8`}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity className="p-2 border-b border-gray-200" onPress={() => handleSelect(item.iataCode)}>
            <View className="flex flex-row items-center">
              {item.subType === 'CITY' ? (
                <MaterialIcons name="location-city" size={24} color="black" />
              ) : (
                <Feather name="corner-down-right" size={22} color="black" className={'ml-6'} />
              )}
              <View className="ml-2 flex flex-row gap-2">
                <Text className="text-black">{item.iataCode}</Text>
                {highlightText(item.name, keyword)}
                {item.subType === 'AIRPORT' && (
                  <Text className="text-black capitalize">{item.subType}</Text>
                )}
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </MotiView>
  );
}
