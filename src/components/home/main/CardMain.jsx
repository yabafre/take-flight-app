// card destination

import React, { useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import { useRouter } from "expo-router";
import { Heart, Location, Star1 } from "iconsax-react-native";
import { Image } from "expo-image";


export default function CardMain({ data }) {
    const router = useRouter();
    const [isLiked, setIsLiked] = useState(false);

    const handleLike = () => {
        setIsLiked(!isLiked);
    }

    return (
        <View className="overflow-hidden relative rounded-3xl w-[255px] h-[255px] bg-[#1400ff]">
            <Pressable className="absolute top-4 right-4 bg-white rounded-full p-1" onPress={handleLike}>
                <Heart size={20} color={'#000'} variant={isLiked ? 'Bold' : 'Linear'} />
            </Pressable>
            <View className="p-4">
                <View className="flex flex-col items-start gap-2">
                    <View className="flex flex-row items-center gap-2">
                        <Location size={16} color={'#fff'} />
                        <Text className="text-sm text-white">{data.location}</Text>
                    </View>
                    <Text className="text-2xl text-white font-semibold">{data.title}</Text>
                </View>
                <View className="flex flex-row items-center gap-2 p-1 left-12 transform rotate-45 bg-white w-1/2 rounded-lg relative">
                    <Image
                      source={{ uri: data.image }}
                      style={{ width: '100%', height: 150 }}
                    />
                </View>
                <View className="flex flex-row items-center justify-end gap-1">
                    <Star1 size={20} color={'#fff'} />
                    <Text className="text-lg text-white">{data.rating}</Text>
                </View>
            </View>
        </View>
    );
}
