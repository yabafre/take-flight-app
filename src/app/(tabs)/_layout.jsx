import React from 'react';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Tabs } from 'expo-router';
import Logo from '@assets/icon-tab.svg';
import { Vibration } from 'react-native';

export default function TabLayout() {
    return (
        <Tabs
            screenOptions={{
                tabBarShowLabel: false,
                headerShown: false,
                tabBarActiveTintColor: '#FA4A0C',
                tabBarInactiveTintColor: '#0a0a0a',
                tabBarStyle:{
                    backgroundColor: '#fff',
                    position: 'absolute',
                    borderColor: 'none',
                    borderTopWidth: 0,
                    elevation: 0,
                    shadowOpacity: 0,
                    bottom: 20,
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
                    title: 'Home',
                    tabBarIcon: ({ color }) => (
                        <AntDesign
                            size={26}
                            name="home"
                            color={color}
                            onPress={() => {
                                Vibration.vibrate(10);
                                navigation.navigate('index');
                            }}
                        />
                    ),
                })}
            />
            <Tabs.Screen
                name="tFlight"
                options={({ navigation }) => ({
                    title: 'TFlight',
                    tabBarIcon: ({ color }) => (
                        <Logo
                            height={140}
                            width={140}
                            fill={color}
                            onPress={() => {
                                Vibration.vibrate(10);
                                navigation.navigate('tFlight');
                            }}
                        />
                    ),
                })}
            />
            <Tabs.Screen
                name="profile"
                options={({ navigation }) => ({
                    title: 'Profile',
                    tabBarIcon: ({ color }) => (
                        <AntDesign
                            size={26}
                            name="user"
                            color={color}
                            onPress={() => {
                                Vibration.vibrate(10);
                                navigation.navigate('profile');
                            }}
                        />
                    ),
                })}
            />
        </Tabs>
    );
}