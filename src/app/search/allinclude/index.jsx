import React, { useState } from 'react';
import { View, Text, Pressable, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ArrowLeft, Calendar, Profile2User } from 'iconsax-react-native';
import { Entypo, MaterialIcons } from '@expo/vector-icons';
import CitySearch from '@app/components/search/CitySearch';
import FullScreenDatePicker from '@app/components/search/SearchDatePicker';
import { format } from 'date-fns';
import ProgressBar from '@app/components/search/ProgressBar';
import { useDispatch } from 'react-redux';
import { setAllInclusiveParams } from '@app/store/reducers/search/searchSlice';
import { StatusBar } from 'expo-status-bar';
import FontAwesome from "@expo/vector-icons/FontAwesome";
import LottieView from 'lottie-react-native';


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
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [showOriginSearch, setShowOriginSearch] = useState(false);
    const [showDestinationSearch, setShowDestinationSearch] = useState(false);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [mode, setMode] = useState('start'); // 'start' or 'end'
    const [keywordInput, setKeywordInput] = useState("");
    const [formData, setFormData] = useState({
        maxPrice: '',
        flexibleMaxPrice: false,
        originLocationCode: '',
        numberOfPeople: 0,
        adults: 0,
        children: 0,
        destinationLocation: false,
        destinationLocationCode: '',
        startDate: '',
        endDate: '',
        travelType: '',
        travelGenre: '',
        activityPace: '',
        keywords: '',
    });

    const dispatch = useDispatch();

    const handleNext = () => {
        // Validation for each step
        switch (step) {
            case 1:
                if (!formData.maxPrice) return alert("Veuillez entrer le budget maximum.");
                break;
            case 2:
                if (!formData.numberOfPeople || !formData.adults) return alert("Veuillez remplir tous les champs relatifs au nombre de personnes.");
                break;
            case 3:
                if (!formData.originLocationCode || (formData.destinationLocation && !formData.destinationLocationCode)) return alert("Veuillez entrer les codes des villes de départ et de destination.");
                break;
            case 4:
                if (!formData.startDate || !formData.endDate) return alert("Veuillez sélectionner les dates de voyage.");
                break;
            case 5:
                if (!formData.travelType) return alert("Veuillez sélectionner le genre de voyage.");
                break;
            case 6:
                if (!formData.activityPace) return alert("Veuillez sélectionner le rythme du voyage.");
                break;
            case 7:
                if (!formData.keywords) return alert("Veuillez entrer des mots-clés.");
                break;
            default:
                break;
        }

        if (step < steps.length) {
            setStep(step + 1);
        } else {
            // Final step, trigger search
            const formattedFormData = {
                ...formData,
                maxPrice: parseInt(formData.maxPrice),
                flexibleMaxPrice: !!formData.flexibleMaxPrice,
                numberOfPeople: parseInt(formData.numberOfPeople),
                adults: parseInt(formData.adults),
                children: parseInt(formData.children),
                destinationLocation: !!formData.destinationLocation,
                startDate: formData.startDate.toString(),
                endDate: formData.endDate.toString(),
                keywords: formData.keywords.toString()
            };
            dispatch(setAllInclusiveParams(formattedFormData));
            router.push('/search/allinclude/result'); // Redirect to the results page
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

        // console.log('formData', formData);
    };

    const backViewIf = () => {
        if (showOriginSearch || showDestinationSearch || showDatePicker) {
            return (
                <TouchableOpacity className={`ml-2`}
                                  onPress={() => {
                                      setShowOriginSearch(false);
                                      setShowDestinationSearch(false);
                                      setShowDatePicker(false);
                                  } }>
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

    const handleKeywordInput = (value) => {
        if (value.includes(' ') || value.includes(',')) {
            const keywordsArray = value.split(/[ ,]+/).filter(Boolean);
            const keywordsString = [...formData.keywords.split(','), ...keywordsArray].join(',');
            setFormData({
                ...formData,
                keywords: keywordsString,
            });
            setKeywordInput("");
        } else {
            setKeywordInput(value);
        }
    };

    const removeKeyword = (index) => {
        const keywordsArray = formData.keywords.split(',').filter((_, i) => i !== index);
        setFormData({
            ...formData,
            keywords: keywordsArray.join(','),
        });
    };

    const renderStepContent = () => {
        switch (step) {
            case 1:
                return (
                    <View className="w-full flex flex-col justify-center gap-6 pb-24">
                        <View className="flex flex-row items-center justify-between rounded-2xl bg-[#181818] p-4">
                            <TextInput
                                className="text-white text-2xl flex-1"
                                placeholder="Budget maximum"
                                placeholderTextColor="#aaa"
                                value={formData.maxPrice}
                                onChangeText={(value) => handleChange('maxPrice', value)}
                                keyboardType="numeric"
                            />
                            <Entypo name="wallet" size={22} color="white" />
                        </View>
                        <Pressable
                            onPress={() => handleChange('flexibleMaxPrice', !formData.flexibleMaxPrice)}
                            className={`flex flex-row items-center justify-between rounded-2xl bg-[#181818] p-4`}
                        >
                            <Text className="text-white text-2xl">Flexible sur le budget</Text>
                            <MaterialIcons name={formData.flexibleMaxPrice ? "check-box" : "check-box-outline-blank"} size={22} color="white" />
                        </Pressable>
                    </View>
                );
            case 2:
                return (
                    <View className="w-full flex flex-col justify-center gap-6 pb-24">
                        <View className="flex flex-row items-center justify-between rounded-2xl bg-[#181818] p-4">
                            <TextInput
                                className="text-white text-2xl flex-1"
                                placeholder="Nombre de personnes"
                                placeholderTextColor="#aaa"
                                value={formData.numberOfPeople}
                                onChangeText={(value) => handleChange('numberOfPeople', value)}
                                keyboardType="numeric"
                            />
                            <Entypo name="users" size={22} color="white" />
                        </View>
                        <View className="flex flex-row items-center justify-between rounded-2xl bg-[#181818] p-4">
                            <TextInput
                                className="text-white text-2xl flex-1"
                                placeholder="Nombre d'adultes"
                                placeholderTextColor="#aaa"
                                value={formData.adults}
                                onChangeText={(value) => handleChange('adults', value)}
                                keyboardType="numeric"
                            />
                            <Entypo name="man" size={22} color="white" />
                        </View>
                        <View className="flex flex-row items-center justify-between rounded-2xl bg-[#181818] p-4">
                            <TextInput
                                className="text-white text-2xl flex-1"
                                placeholder="Nombre d'enfants"
                                placeholderTextColor="#aaa"
                                value={formData.children}
                                onChangeText={(value) => handleChange('children', value)}
                                keyboardType="numeric"
                            />
                            <FontAwesome name="child" size={22} color="white" />
                        </View>
                    </View>
                );
            case 3:
                return (
                    <View className="w-full flex flex-col justify-center gap-6 pb-24">
                        <Pressable onPress={() => setShowOriginSearch(true)} className={`flex flex-row items-center justify-between rounded-2xl bg-[#181818] p-4`}>
                            <Text className={`text-white text-2xl`}>{formData.originLocationCode || 'Code de la ville de départ'}</Text>
                            <Entypo name="location-pin" size={22} color="white" />
                        </Pressable>

                        <Pressable
                            onPress={() => handleChange('destinationLocation', !formData.destinationLocation)}
                            className={`flex flex-row items-center justify-between rounded-2xl bg-[#181818] p-4`}
                        >
                            <Text className="text-white text-2xl">Destination connue</Text>
                            <MaterialIcons name={formData.destinationLocation ? "check-box" : "check-box-outline-blank"} size={22} color="white" />
                        </Pressable>

                        {formData.destinationLocation && (
                            <View className="flex flex-col gap-6">
                                <Pressable onPress={() => setShowDestinationSearch(true)} className={`flex flex-row items-center justify-between rounded-2xl bg-[#181818] p-4`}>
                                    <Text className={`text-white text-2xl`}>{formData.destinationLocationCode || 'Code de la destination'}</Text>
                                    <Entypo name="location-pin" size={22} color="white" />
                                </Pressable>
                            </View>
                        )}
                    </View>
                );
            case 4:
                return (
                    <View className="w-full flex flex-col justify-center gap-6 pb-24">
                        <Pressable onPress={() => { setMode('start'); setShowDatePicker(true); }} className={`flex flex-row items-center justify-between rounded-2xl bg-[#181818] p-4`}>
                            <Text className={`text-white text-2xl`}>{formData.startDate ? format(new Date(formData.startDate), 'EEE, MMM d') : 'Date de début'}</Text>
                            <Calendar size={22} color="white" />
                        </Pressable>

                        <Pressable onPress={() => { setMode('end'); setShowDatePicker(true); }} className={`flex flex-row items-center justify-between rounded-2xl bg-[#181818] p-4`}>
                            <Text className={`text-white text-2xl`}>{formData.endDate ? format(new Date(formData.endDate), 'EEE, MMM d') : 'Date de fin'}</Text>
                            <Calendar size={22} color="white" />
                        </Pressable>
                    </View>
                );
            case 5:
                return (
                    <View className="w-full flex flex-col justify-center gap-6 pb-24">
                        <Pressable onPress={() => handleChange('travelType', 'loisirs')} className={`flex flex-row items-center justify-between rounded-2xl bg-[#181818] p-4 ${formData.travelType === 'loisirs' ? 'bg-[#fff]' : ''}`}>
                            <Text className={`text-2xl ${formData.travelType === 'loisirs' ? 'text-black' : 'text-white'}`}>Loisirs</Text>
                        </Pressable>
                        <Pressable onPress={() => handleChange('travelType', 'culturel')} className={`flex flex-row items-center justify-between rounded-2xl bg-[#181818] p-4 ${formData.travelType === 'culturel' ? 'bg-[#fff]' : ''}`}>
                            <Text className={`text-2xl ${formData.travelType === 'culturel' ? 'text-black' : 'text-white'}`}>Culturel</Text>
                        </Pressable>
                        <Pressable onPress={() => handleChange('travelType', 'aventure')} className={`flex flex-row items-center justify-between rounded-2xl bg-[#181818] p-4 ${formData.travelType === 'aventure' ? 'bg-[#fff]' : ''}`}>
                            <Text className={`text-2xl ${formData.travelType === 'aventure' ? 'text-black' : 'text-white'}`}>Aventure</Text>
                        </Pressable>
                        <Pressable onPress={() => handleChange('travelType', 'nature')} className={`flex flex-row items-center justify-between rounded-2xl bg-[#181818] p-4 ${formData.travelType === 'nature' ? 'bg-[#fff]' : ''}`}>
                            <Text className={`text-2xl ${formData.travelType === 'nature' ? 'text-black' : 'text-white'}`}>Nature</Text>
                        </Pressable>
                    </View>
                );
            case 6:
                return (
                    <View className="w-full flex flex-col justify-center gap-6 pb-24">
                        <Pressable onPress={() => handleChange('activityPace', 'calme')} className={`flex flex-row items-center justify-between rounded-2xl bg-[#181818] p-4 ${formData.activityPace === 'calme' ? 'bg-[#fff]' : ''}`}>
                            <Text className={`text-2xl ${formData.activityPace === 'calme' ? 'text-black' : 'text-white'}`}>Calme</Text>
                        </Pressable>
                        <Pressable onPress={() => handleChange('activityPace', 'compact')} className={`flex flex-row items-center justify-between rounded-2xl bg-[#181818] p-4 ${formData.activityPace === 'compact' ? 'bg-[#fff]' : ''}`}>
                            <Text className={`text-2xl ${formData.activityPace === 'compact' ? 'text-black' : 'text-white'}`}>Compact</Text>
                        </Pressable>
                    </View>
                );
            case 7:
                return (
                    <View className="w-full flex flex-col justify-center gap-6 pb-24">
                        <View className="flex flex-row items-center justify-between rounded-2xl bg-[#181818] p-4">
                            <TextInput
                                className="text-white text-2xl flex-1"
                                placeholder="Mots-clés"
                                placeholderTextColor="#aaa"
                                value={keywordInput}
                                onChangeText={handleKeywordInput}
                                onSubmitEditing={() => handleKeywordInput(keywordInput + ' ')}
                            />
                            <Entypo name="key" size={22} color="white" />
                        </View>
                        <View className="flex flex-row flex-wrap gap-2 mt-2">
                            {formData.keywords.split(',').filter(Boolean).map((keyword, index) => (
                                <View key={index} className="flex flex-row items-center bg-[#1400ff] px-3 py-1 rounded-full">
                                    <Text className="text-white">{keyword}</Text>
                                    <TouchableOpacity onPress={() => removeKeyword(index)} className="ml-2">
                                        <MaterialIcons name="close" size={16} color="white" />
                                    </TouchableOpacity>
                                </View>
                            ))}
                        </View>
                    </View>
                );
            case 8:
                return (
                    <View className="w-full flex flex-col justify-center gap-6 pb-24">
                        <Text className="text-white text-2xl">Résumé</Text>
                        <Text className="text-white text-2xl">Budget maximum: {formData.maxPrice}€</Text>
                        <Text className="text-white text-2xl">Nombre de personnes: {formData.numberOfPeople} ({formData.adults} adultes, {formData.children} enfants)</Text>
                        <Text className="text-white text-2xl">Ville de départ: {formData.originLocationCode}</Text>
                        {formData.destinationLocation && (
                            <Text className="text-white text-2xl">Ville de destination: {formData.destinationLocationCode}</Text>
                        )}
                        <Text className="text-white text-2xl">Dates de voyage: {format(new Date(formData.startDate), 'EEE, MMM d')} - {format(new Date(formData.endDate), 'EEE, MMM d')}</Text>
                        <Text className="text-white text-2xl">Genre de voyage: {formData.travelType}</Text>
                        <Text className="text-white text-2xl">Rythme du voyage: {formData.activityPace}</Text>
                        <Text className="text-white text-2xl">Mots-clés: {formData.keywords}</Text>
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
                headerTitle: 'Assistant search',
                headerTintColor: '#fff',
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
                <View className={`flex flex-col justify-center items-center h-full bg-[#121212] mt-8 gap-12 p-6 pb-8`}>
                    <ProgressBar step={step} totalSteps={steps.length} />
                    {renderStepContent()}
                    <View className="flex-row justify-between gap-6">
                        <Pressable onPress={handleBack} className={`flex flex-row items-center justify-center rounded-2xl bg-[#1400ff] p-4 h-14 ${step === 1 ? 'opacity-50' : ''}`} disabled={step === 1}>
                            <Text className={`text-white`}>Retour</Text>
                        </Pressable>
                        <Pressable onPress={handleNext} className={`flex flex-row items-center justify-center rounded-2xl bg-[#1400ff] p-4 h-14`}>
                            <Text className={`text-white`}>{step === steps.length ? 'Rechercher' : 'Suivant'}</Text>
                        </Pressable>
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
                    onSelectDates={(date) => handleChange(mode === 'start' ? 'startDate' : 'endDate', date.startDate)}
                    mode="one-way" // Fixed mode
                />
            )}
        </>
    );
};

export default AllInclusiveSearch;
