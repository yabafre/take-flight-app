import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { CalendarList } from 'react-native-calendars';
import { MotiView } from 'moti';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { format } from 'date-fns';

const { height } = Dimensions.get('window');

const VerticalDatePicker = ({ visible, onClose, onSelectDates, mode }) => {
  const { top, bottom } = useSafeAreaInsets();

  const [selectedDates, setSelectedDates] = useState({});
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleDayPress = (day) => {
    if (mode === 'one-way') {
      setSelectedDates({ [day.dateString]: { selected: true, selectedColor: '#91D3D6' } });
      setStartDate(day.dateString);
    } else {
      if (!startDate || (startDate && endDate)) {
        setSelectedDates({ [day.dateString]: { startingDay: true, color: '#91D3D6', textColor: 'white' } });
        setStartDate(day.dateString);
        setEndDate('');
      } else {
        const markedDates = {};
        const start = new Date(startDate);
        const end = new Date(day.dateString);

        for (let d = start; d <= end; d.setDate(d.getDate() + 1)) {
          const date = d.toISOString().split('T')[0];
          markedDates[date] = {
            color: '#E6F7F8', // Couleur plus claire pour les jours intermédiaires
            textColor: 'black',
            ...(date === startDate && { startingDay: true, color: '#91D3D6', textColor: 'white' }),
            ...(date === day.dateString && { endingDay: true, color: '#91D3D6', textColor: 'white' }),
          };
        }

        setSelectedDates(markedDates);
        setEndDate(day.dateString);
      }
    }
  };

  const handleDone = () => {
    onSelectDates({ startDate, endDate });
    onClose();
  };

  return (
    <MotiView
      from={{ translateY: 500 }}
      animate={{ translateY: 0 }}
      exit={{ translateY: 100 }}
      transition={{ type: 'timing', duration: 500 }}
      className="flex-1 bg-white absolute z-[99] h-full w-full"
      style={{ paddingTop: top - 5, paddingBottom: bottom }}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose}>
            {/*<MaterialIcons name="close" size={24} color="black" />*/}
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Select Dates</Text>
        </View>
        <CalendarList
          onDayPress={handleDayPress}
          markedDates={selectedDates}
          markingType={mode === 'one-way' ? 'simple' : 'period'}
          pastScrollRange={0}
          futureScrollRange={12}
          scrollEnabled
          showScrollIndicator
          style={{ height: height - 110 }}
          theme={{
            calendarBackground: '#fff',
            dayTextColor: '#000',
            textDisabledColor: '#555555',
            monthTextColor: '#000',
            arrowColor: 'white',
            selectedDayBackgroundColor: '#91D3D67F',
            selectedDayTextColor: '#ffffff',
            todayTextColor: '#000',
            selectedDotColor: '#000',
          }}
        />
        <View className={`flex flex-col justify-center w-full items-center p-4 gap-2 absolute bottom-0 bg-white`}>
          {mode === 'one-way' ? (
            <Text className="text-black text-lg font-semibold">{startDate ? format(new Date(startDate), 'EEE, MMM d') : 'Select Departure Date'}</Text>
          ) : (
            <View className="flex flex-row justify-between items-center w-full">
              <Text className="text-black text-lg font-semibold">{startDate ? format(new Date(startDate), 'EEE, MMM d') : 'Select Departure Date'}</Text>
              <Text className="text-black text-lg font-semibold">{endDate ? format(new Date(endDate), 'EEE, MMM d') : 'Select Return Date'}</Text>
            </View>
          )}
          <TouchableOpacity onPress={handleDone} className="bg-black p-3 h-14 rounded-lg w-full">
            <Text className="text-white text-xl font-semibold text-center">Done</Text>
          </TouchableOpacity>
        </View>
      </View>
    </MotiView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
  },
  headerTitle: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default VerticalDatePicker;
