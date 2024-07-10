import React from 'react';
import { View, Text } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const ProgressBar = ({ step, totalSteps }) => {
  return (
      <View className="w-full my-4">
        <View className="flex flex-row justify-between items-center">
          {[...Array(totalSteps)].map((_, index) => (
              <React.Fragment key={index}>
                <View className="flex items-center">
                  <View
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          index + 1 <= step ? 'bg-[#1400ff]' : 'bg-black'
                      }`}
                  >
                    <Text className="text-white">{index + 1}</Text>
                  </View>
                </View>
                {index < totalSteps - 1 && (
                    <View className="flex-1 h-1 bg-gray-300 mx-2">
                      <View
                          className="h-1 bg-[#1400ff]"
                          style={{ width: `${(step - index >= 1 ? 100 : 0)}%` }}
                      />
                    </View>
                )}
              </React.Fragment>
          ))}
        </View>
      </View>
  );
};

export default ProgressBar;
