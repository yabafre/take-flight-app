// ProgressBar.jsx for allinclude/index.jsx

import React from 'react';
import { View, Text } from 'react-native';

const ProgressBar = ({ step, totalSteps }) => {
  return (
    <View className="flex flex-row justify-center items-center space-x-2">
      {[...Array(totalSteps)].map((_, index) => (
        <View
          key={index}
          className={`w-4 h-4 rounded-full ${
            index + 1 === step ? 'bg-blue-500' : 'bg-gray-300'
          }`}
        />
      ))}
    </View>
  );
}

export default ProgressBar;