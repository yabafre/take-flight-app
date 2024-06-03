// card destination

import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useRouter } from "expo-router";
import { Heart, Location, Star1 } from "iconsax-react-native";
import { Image } from "expo-image";
import { BlurView } from '@react-native-community/blur';


export default function CardMain({ data }) {
    const router = useRouter();
    const [isLiked, setIsLiked] = useState(false);

    const handleLike = () => {
        setIsLiked(!isLiked);
    }

    return (
        <View className="overflow-hidden relative w-[255px]" style={styles.card}>
            <Image source={{ uri: data.image }} style={styles.image} />
            <Pressable
                className="absolute top-4 right-4 bg-black bg-opacity-50 rounded-full p-1"
                onPress={handleLike}
            >
                <Heart size={20} color={'white'} variant={isLiked ? 'Bold' : 'Linear'} />
            </Pressable>
            <View className="absolute overflow-hidden bottom-4 left-4 w-[90%] h-[70px]" style={{ borderRadius: 15 }}>
                <BlurView
                    blurType="light"
                    blurAmount={22}
                    blurRadius={8}
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: 'rgba(0,0,0,0.5)',
                    }}
                />
                <View className={'relative w-full h-full flex gap-3 p-4'}>
                    <Text className="text-lg text-white font-bold">{data.title}</Text>
                    <View className="flex flex-row items-center justify-between">
                        <View className="flex flex-row items-center gap-2">
                            <Location size={13} color={'#CAC8C8'} />
                            <Text className="text-sm text-[#CAC8C8]">
                                {data.location}
                            </Text>
                        </View>
                        <View className="flex flex-row items-center gap-2">
                            <Star1 size={13} color={'#CAC8C8'} />
                            <Text className="text-sm text-[#CAC8C8]">
                                {data.rating}
                            </Text>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: 360,
    },
    card: {
        borderRadius: 28,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 8,
    }
});