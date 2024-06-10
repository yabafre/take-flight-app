import React, { useState } from 'react';
import { Tabs } from 'expo-router';
import Logo from '@assets/tflight-ui.svg';
import { Heart, Home2, Profile } from "iconsax-react-native";
import {Text, Vibration, View} from 'react-native';

export default function TabLayout() {
    const [activeTab, setActiveTab] = useState('index');

    return (
        <Tabs
            screenOptions={{
                tabBarShowLabel: false,
                headerShown: false,
                tabBarActiveTintColor: '#1400ff',
                tabBarInactiveTintColor: '#0a0a0a',
                tabBarStyle: {
                    backgroundColor: 'transparent',
                    position: 'absolute',
                    borderColor: 'none',
                    borderTopWidth: 0,
                    elevation: 0,
                    shadowOpacity: 0,
                    bottom: 5,
                    left: 20,
                    right: 20,
                    height: 60,
                    borderRadius: 20,
                    paddingHorizontal: 20,
                    paddingVertical: 10,
                },
            }}
        >
            <Tabs.Screen
                name="index"
                options={({ navigation }) => ({
                    tabBarIcon: ({ color, focused }) => (
                        <View className={'flex flex-col items-center gap-1'}>
                            <Home2
                                size={26}
                                color={'#fff'}
                                variant={focused ? 'Bold' : 'Outline'}
                                onPress={() => {
                                    Vibration.vibrate(10);
                                    navigation.navigate('index');
                                    setActiveTab('index');
                                }}
                            />
                            <View style={{ width: 7, height: 7, borderRadius: 3, marginTop: 2, backgroundColor: focused ? color : 'transparent'}}  />
                        </View>
                    ),
                })}
            />
            <Tabs.Screen
                name="order"
                options={({ navigation }) => ({
                    tabBarIcon: ({ color, focused }) => (
                        <View className={'flex p-0 flex-col items-center gap-1'}>
                            <Logo
                                height={24}
                                width={26}
                                fill={ focused ? '#fff' : '#000'}
                                onPress={() => {
                                    Vibration.vibrate(10);
                                    navigation.navigate('order');
                                    setActiveTab('order');
                                }}
                            />
                            <View style={{ width: 7, height: 7, borderRadius: 3, marginTop: 2, backgroundColor: focused ? color : 'transparent'}}  />
                        </View>
                    ),
                })}
            />
            <Tabs.Screen
                name="wish"
                options={({ navigation }) => ({
                    tabBarIcon: ({ color, focused }) => (
                        <View className={'flex flex-col items-center gap-1'}>
                            <Heart
                                size={26}
                                color={'#fff'}
                                variant={focused ? 'Bold' : 'Outline'}
                                onPress={() => {
                                    Vibration.vibrate(10);
                                    navigation.navigate('wish');
                                    setActiveTab('wish');
                                }}
                            />
                            <View style={{ width: 7, height: 7, borderRadius: 3, marginTop: 2, backgroundColor: focused ? color : 'transparent'}}  />
                        </View>
                    ),
                })}
            />
            <Tabs.Screen
                name="profile"
                options={({ navigation }) => ({
                    tabBarIcon: ({ color, focused }) => (
                        <View className={'flex flex-col items-center gap-1'}>
                            <Profile
                                size={26}
                                color={'#fff'}
                                variant={focused ? 'Bold' : 'Outline'}
                                onPress={() => {
                                    Vibration.vibrate(10);
                                    navigation.navigate('profile');
                                    setActiveTab('profile');
                                }}
                            />
                            <View style={{ width: 7, height: 7, borderRadius: 3, marginTop: 2, backgroundColor: focused ? color : 'transparent'}}  />
                        </View>
                    ),
                })}
            />
        </Tabs>
    );
}
