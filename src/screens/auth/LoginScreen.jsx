import React, { useState } from 'react';
import { Alert, Button, Image, Pressable, SafeAreaView, StyleSheet, Switch, Text, TextInput, View } from 'react-native';
import useAuth from '@app/hooks/useAuth';
import GoogleNative from "@app/components/auth/GoogleNative";
import Logo from "@assets/logo-full.svg";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, { useSharedValue, withTiming, useAnimatedStyle, Easing } from "react-native-reanimated";

const LoginScreen = () => {
    const { signIn, signUp, loading } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [full_name, setFullName] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [switchSignIn, setSwitchSignIn] = useState(true);
    const randomWidth = useSharedValue(10);

    const config = {
        duration: 1000,
        easing: Easing.bezier(0.5, 0.01, 0, 1),
    };

    const style = useAnimatedStyle(() => {
        return {
            width: withTiming(randomWidth.value, config),
        };
    });

    const handleLogin = async () => {
        const { session, error } = await signIn(email, password);
        if (error) {
            Alert.alert('Error', error);
        }
    }

    const handleSignUp = async () => {
        console.log('sign up', email, password, full_name);
        const { session, error } = await signUp(email, password, full_name);
        console.log(session, error);
        if (error) {
            Alert.alert('Error', error);
        }
    }

    return (
      <View className={`flex-1 justify-center items-center`}>
          <View className={`flex items-center`}>
              <Logo height={200} width={200} />
              <View className={`flex flex-col gap-4`}>
                  {!switchSignIn && (
                    <TextInput
                      value={full_name}
                      onChangeText={setFullName}
                      placeholder="Full Name"
                      className={`w-80 p-2 border-2 border-gray-300 rounded-md`}
                    />
                  )}
                  <TextInput
                    value={email}
                    onChangeText={setEmail}
                    placeholder="Email"
                    className={`w-80 p-2 border-2 border-gray-300 rounded-md`}
                  />
                  <TextInput
                    value={password}
                    onChangeText={setPassword}
                    placeholder="Password"
                    secureTextEntry={!showPassword}
                    className={`w-80 p-2 border-2 border-gray-300 rounded-md`}
                  />
                  <Pressable onPress={() => setShowPassword(!showPassword)}>
                      <Text className={`text-gray-500`}>{showPassword ? 'Hide' : 'Show'} Password</Text>
                  </Pressable>
              </View>
              <View className={`flex flex-col gap-4`}>
                  <View className={`flex flex-row gap-4 items-center justify-center`}>
                      <Pressable onPress={() => setSwitchSignIn(!switchSignIn)}>
                          <Text className={`text-[#FA4A0C]`}>{switchSignIn ? 'Sign Up' : 'Sign In'}</Text>
                      </Pressable>
                      <Pressable className={'bg-black rounded'} onPress={switchSignIn ? handleLogin : handleSignUp}>
                          <Text className={`p-2 text-white`}>{switchSignIn ? 'Sign In' : 'Sign Up'}</Text>
                      </Pressable>
                  </View>
                  <GoogleNative />
              </View>
          </View>
      </View>
    )
}

export default LoginScreen;
