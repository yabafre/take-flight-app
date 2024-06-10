import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useCityAutocomplete } from '@app/hooks/useCityAutocomplete';
import { Feather } from '@expo/vector-icons';
import { MotiView } from 'moti';
import { Home3 } from 'iconsax-react-native';

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
      return <Text className={'text-white'}>{text}</Text>;
    }
    const regex = new RegExp(`(${highlight})`, 'gi');
    const parts = text.split(regex);
    return (
      <Text className="text-white">
        {parts.map((part, index) =>
          part.toLowerCase() === highlight.toLowerCase() ? (
            <Text key={index} className={'text-[#1400ff]'}>
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
      className="flex-1 bg-[#121212] absolute z-[99] h-full w-full"
      style={{ paddingTop: top + 50, paddingBottom: bottom }}
    >
      <View className="flex flex-row items-center p-4">
        <View className="flex-1 flex flex-row items-center p-2 rounded-xl bg-[#181818]">
          <TextInput
            placeholder="Search city or airport"
            value={keyword}
            onChangeText={setKeyword}
            placeholderTextColor="#fff"
            className="flex-1 ml-2 bg-transparent text-white placeholder:white"
          />
        </View>
      </View>
      {isLoading && <ActivityIndicator size="large" color="#fff" />}
      {error && <Text className="text-center text-white">Error loading cities</Text>}
      <FlatList
        data={cities}
        className={`px-4 mb-8`}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity className="p-2" onPress={() => handleSelect(item.iataCode)}>
            <View className="flex flex-row items-center">
              {item.subType === 'CITY' ? (
                <Home3 size={22} variant={'Bold'} color="white" />
              ) : (
                <Feather name="corner-down-right" size={16} color="white" className={'ml-6'} />
              )}
              <View className="ml-2 flex flex-row gap-2">
                <Text className="text-white">{item.iataCode}</Text>
                {highlightText(item.name, keyword)}
                {item.subType === 'AIRPORT' && (
                  <Text className="text-white capitalize">{item.subType}</Text>
                )}
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </MotiView>
  );
}
