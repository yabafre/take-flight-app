// recap of the flight details and verify if the price of the flight is correct

import React from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { format, parseISO } from 'date-fns';
import airlineLogos from '@app/utils/airlineLogos';
import { useRouter } from 'expo-router';
import { setSelectedFlight } from '@app/store/reducers/search/searchSlice';
import { MaterialCommunityIcons } from '@expo/vector-icons';
