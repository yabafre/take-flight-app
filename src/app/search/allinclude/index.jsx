import React, { useState } from 'react';
import { View, Text, Button, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import ProgressBar from '@app/components/search/ProgressBar';
import useSearch from '@app/hooks/useSearch';
import { useDispatch } from 'react-redux';
import { setAllInclusiveParams } from '@app/store/reducers/search/searchSlice';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Stack } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { ArrowLeft } from 'iconsax-react-native';
import CitySearch from '@app/components/search/CitySearch';
import FullScreenDatePicker from '@app/components/search/SearchDatePicker';

const steps = [
  'Budget maximum et flexibilité',
  'Nombre de personnes',
  'Destination connue ou non',
  'Dates de voyage',
  'Genre de voyage',
  'Rythme du voyage',
  'Mots-clés',
  'Résumé'
];

const AllInclusiveSearch = () => {
  const { top, bottom } = useSafeAreaInsets();

  const [step, setStep] = useState(1);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showOriginSearch, setShowOriginSearch] = useState(false);
  const [showDestinationSearch, setShowDestinationSearch] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [mode, setMode] = useState('start'); // 'start' or 'end'
  const [formData, setFormData] = useState({
    maxPrice: '',
    flexibleMaxPrice: false,
    originLocationCode: '',
    numberOfPeople: '',
    adults: '',
    children: '',
    destinationLocation: false,
    destinationLocationCode: '',
    continent: '',
    startDate: '',
    endDate: '',
    travelType: '',
    travelGenre: '',
    activityPace: '',
    keywords: '',
  });

  const dispatch = useDispatch();

  const handleNext = () => {
    if (step < steps.length) {
      setStep(step + 1);
    } else {
      // Final step, trigger search
      dispatch(setAllInclusiveParams(formData));
      useSearch('all-inclusive', formData);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const backViewIf = () => {
    if (step > 1) {
      return (
        <TouchableOpacity className={`ml-2`}>
          <MaterialIcons name="close" size={26} color="white" />
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity onPress={() => router.back()} className={`ml-2`}>
          <ArrowLeft size={26} color={'#fff'} />
        </TouchableOpacity>
      );
    }
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <View className="w-full flex flex-col justify-center gap-6 pb-24">
            <Text>Budget maximum:</Text>
            <TextInput
              className="p-2 border border-gray-300 rounded-md"
              value={formData.maxPrice}
              onChangeText={(value) => handleChange('maxPrice', value)}
              keyboardType="numeric"
            />
            <Text>Flexible sur le budget:</Text>
            <Button
              title={formData.flexibleMaxPrice ? 'Oui' : 'Non'}
              onPress={() => handleChange('flexibleMaxPrice', !formData.flexibleMaxPrice)}
            />
          </View>
        );
      case 2:
        return (
          <View className="w-full flex flex-col justify-center gap-6 pb-24">
            <Text>Nombre de personnes:</Text>
            <TextInput
              className="p-2 border border-gray-300 rounded-md"
              value={formData.numberOfPeople}
              onChangeText={(value) => handleChange('numberOfPeople', value)}
              keyboardType="numeric"
            />
            <Text>Nombre d'adultes:</Text>
            <TextInput
              className="p-2 border border-gray-300 rounded-md"
              value={formData.adults}
              onChangeText={(value) => handleChange('adults', value)}
              keyboardType="numeric"
            />
            <Text>Nombre d'enfants:</Text>
            <TextInput
              className="p-2 border border-gray-300 rounded-md"
              value={formData.children}
              onChangeText={(value) => handleChange('children', value)}
              keyboardType="numeric"
            />
          </View>
        );
      case 3:
        return (
          <View className="w-full flex flex-col justify-center gap-6 pb-24">
            <Text>Code de la ville de départ:</Text>
            <Button title="Rechercher une ville" onPress={() => setShowOriginSearch(true)} />
            <Text>Code de la ville de départ sélectionnée: {formData.originLocationCode}</Text>

            <Text>Destination connue:</Text>
            <Button
              title={formData.destinationLocation ? 'Oui' : 'Non'}
              onPress={() => handleChange('destinationLocation', !formData.destinationLocation)}
            />
            {formData.destinationLocation && (
              <View>
                <Text>Code de la destination:</Text>
                <Button title="Rechercher une ville" onPress={() => setShowDestinationSearch(true)} />
                <Text>Code de la ville de destination sélectionnée: {formData.destinationLocationCode}</Text>
                <Text>Continent:</Text>
                <TextInput
                  className="p-2 border border-gray-300 rounded-md"
                  value={formData.continent}
                  onChangeText={(value) => handleChange('continent', value)}
                />
              </View>
            )}
          </View>
        );
      case 4:
        return (
          <View className="w-full flex flex-col justify-center gap-6 pb-24">
            <Text>Date de début:</Text>
            <Button title="Sélectionner la date" onPress={() => { setMode('start'); setShowDatePicker(true); }} />
            <Text>Date sélectionnée: {formData.startDate}</Text>

            <Text>Date de fin:</Text>
            <Button title="Sélectionner la date" onPress={() => { setMode('end'); setShowDatePicker(true); }} />
            <Text>Date sélectionnée: {formData.endDate}</Text>
          </View>
        );
      case 5:
        return (
          <View className="w-full flex flex-col justify-center gap-6 pb-24">
            <Text>Type de voyage:</Text>
            <TextInput
              className="p-2 border border-gray-300 rounded-md"
              value={formData.travelType}
              onChangeText={(value) => handleChange('travelType', value)}
            />
          </View>
        );
      case 6:
        return (
          <View className="w-full flex flex-col justify-center gap-6 pb-24">
            <Text>Genre de voyage:</Text>
            <TextInput
              className="p-2 border border-gray-300 rounded-md"
              value={formData.travelGenre}
              onChangeText={(value) => handleChange('travelGenre', value)}
            />
          </View>
        );
      case 7:
        return (
          <View className="w-full flex flex-col justify-center gap-6 pb-24">
            <Text>Rythme du voyage:</Text>
            <TextInput
              className="p-2 border border-gray-300 rounded-md"
              value={formData.activityPace}
              onChangeText={(value) => handleChange('activityPace', value)}
            />
          </View>
        );
      case 8:
        return (
          <View className="w-full flex flex-col justify-center gap-6 pb-24">
            <Text>Mots-clés:</Text>
            <TextInput
              className="p-2 border border-gray-300 rounded-md"
              value={formData.keywords}
              onChangeText={(value) => handleChange('keywords', value)}
            />
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <Stack.Screen options={{
        headerTransparent: true,
        headerBackground: () => (
          <View style={{ height: top + 60 }} />
        ),
        headerTitle: '',
        headerLeft: () => (
          backViewIf()
        )
      }} />
      <StatusBar
        style={'light'}
        backgroundColor={'#000'}
      />
      <ScrollView
        className={`flex-1 flex flex-col h-full bg-[#121212]`}
        style={{ paddingTop: top + 60, paddingBottom: bottom }}
      >
        <View className={`flex flex-col justify-center items-center h-full bg-[#121212] mt-8 p-6 pb-8`}>
          <ProgressBar step={step} totalSteps={steps.length} />
          {renderStepContent()}
          <View className="flex-row justify-between mt-4">
            <Button title="Retour" onPress={handleBack} disabled={step === 1} />
            <Button title={step === steps.length ? 'Rechercher' : 'Suivant'} onPress={handleNext} />
          </View>
        </View>
      </ScrollView>

      {showOriginSearch && (
        <CitySearch
          setCode={(cityCode) => {
            handleChange('originLocationCode', cityCode);
            setShowOriginSearch(false);
          }}
          onClose={() => setShowOriginSearch(false)}
        />
      )}
      {showDestinationSearch && (
        <CitySearch
          setCode={(cityCode) => {
            handleChange('destinationLocationCode', cityCode);
            setShowDestinationSearch(false);
          }}
          onClose={() => setShowDestinationSearch(false)}
        />
      )}
      {showDatePicker && (
        <FullScreenDatePicker
          visible={showDatePicker}
          onClose={() => setShowDatePicker(false)}
          onSelectDates={(date) => handleChange(mode === 'start' ? 'startDate' : 'endDate', date)}
          mode={mode}
        />
      )}
    </>
  );
};

export default AllInclusiveSearch;
