import React, { useState } from 'react';
import { View, Text, Modal, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function PassengerModal({ visible, onClose, onSelectPassengers }) {
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);

  const handleSave = () => {
    onSelectPassengers({ adults, children });
    onClose();
  };

  const increment = (setter, value) => setter(value + 1);
  const decrement = (setter, value) => value > 0 && setter(value - 1);

  return (
    <Modal
      transparent={true}
      animationType="slide"
      visible={visible}
      onRequestClose={onClose}
    >
      <View className="flex-1 justify-center items-center bg-[rgba(0,0,0,0.5)] bg-opacity-50">
        <View className="w-full bg-[#121212] rounded-t-xl p-6 absolute bottom-0">
          <TouchableOpacity onPress={onClose} className="self-end">
            <MaterialIcons name="close" size={24} color="white" />
          </TouchableOpacity>
          <Text className="text-lg text-white font-bold my-4">Passengers</Text>
          <View className="flex-row justify-between items-center w-full my-2">
            <Text className="text-base text-white">Adults</Text>
            <View className="flex-row items-center">
              <TouchableOpacity onPress={() => decrement(setAdults, adults)} className="p-2">
                <MaterialIcons name="remove" size={24} color="white" />
              </TouchableOpacity>
              <Text className="mx-4 text-base text-white">{adults}</Text>
              <TouchableOpacity onPress={() => increment(setAdults, adults)} className="p-2">
                <MaterialIcons name="add" size={24} color="white" />
              </TouchableOpacity>
            </View>
          </View>
          <View className="flex-row justify-between items-center w-full my-2">
            <Text className="text-base text-white">Children</Text>
            <View className="flex-row items-center">
              <TouchableOpacity onPress={() => decrement(setChildren, children)} className="p-2">
                <MaterialIcons name="remove" size={24} color="white" />
              </TouchableOpacity>
              <Text className="mx-4 text-base text-white">{children}</Text>
              <TouchableOpacity onPress={() => increment(setChildren, children)} className="p-2">
                <MaterialIcons name="add" size={24} color="white" />
              </TouchableOpacity>
            </View>
          </View>
          <Text className="text-xs text-gray-500 text-center my-4">
            Results show avg. price/passenger (incl. taxes), prices may vary by passenger type.
          </Text>
          <TouchableOpacity onPress={handleSave} className="w-full py-3 bg-[#1400ff] h-14 rounded-lg flex items-center">
            <Text className="text-white text-xl text-center font-bold">Confirm</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
