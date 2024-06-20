// tFlight index page

import React from 'react';
import { View, Text, Pressable } from 'react-native';
import useAuth from '@app/hooks/useAuth';

export default function Index() {
    const { signOut } = useAuth();

    return (
        <View className={` flex flex-col p-6 justify-center items-center`}>
            <Text>My trip</Text>
          <Pressable onPress={() => signOut()} className={`w-64 h-12 bg-black rounded-md flex flex-row items-center justify-center gap-4`}>
              <Text className={`font-bold text-white`}>Sign out</Text>
          </Pressable>
        </View>
    )
}