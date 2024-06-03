import { Link } from "expo-router";
import React, {useEffect, useState} from "react";
import {Text, View, Pressable, ScrollView} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {supabase} from "@app/utils/supabase";
import Toast from 'react-native-toast-message'
import ContainSafeArea from "@app/components/common/ContainSafeArea";
import HeadHome from "@app/components/home/header/HeadHome";
import CardMain from "@app/components/home/main/CardMain";



export default function Page() {
    const { top } = useSafeAreaInsets();
    const [session, setSession] = useState(null)

    useEffect(() => {
        supabase.auth.getSession().then(({data: {session}}) => {
            setSession(session)
        } ,[])

        const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
            setSession(session)
        })

        Toast.show({
            type: 'success',
            text1: 'Welcome to Project TfLight',
            visibilityTime: 3000,
            autoHide: true,
        })

        // console.log(JSON.stringify(session?.user?.user_metadata, null, 2))

    } ,[])
    return (
        <>
            <ContainSafeArea>
                <View className="px-6 flex flex-col gap-4">
                    <HeadHome user={session?.user?.user_metadata} />
                </View>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                    <View className="flex flex-row items-center h-full w-full p-6 gap-4">
                        <CardMain data={{image: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/28/d0/77/3b/caption.jpg?w=1200&h=-1&s=1', title: 'Hotel 1', city: 'Jakarta', location: 'Jakarta, Indonesia', rating: 4.5}} />
                        <CardMain data={{image: 'https://imgcy.trivago.com/c_limit,d_dummy.jpeg,f_auto,h_600,q_auto,w_600//hotelier-images/cd/8c/d0b99f13f19ba4477b41e582a2a1e38ce27879bb9640ef481a5e20973b5e.jpeg', title: 'Hotel 1', city: 'Jakarta', location: 'Jakarta, Indonesia', rating: 4.5}} />
                        <CardMain data={{image: 'https://imgcy.trivago.com/c_limit,d_dummy.jpeg,f_auto,h_600,q_auto,w_600//hotelier-images/cd/8c/d0b99f13f19ba4477b41e582a2a1e38ce27879bb9640ef481a5e20973b5e.jpeg', title: 'Hotel 1', city: 'Jakarta', location: 'Jakarta, Indonesia', rating: 4.5}} />
                        <CardMain data={{image: 'https://imgcy.trivago.com/c_limit,d_dummy.jpeg,f_auto,h_600,q_auto,w_600//hotelier-images/cd/8c/d0b99f13f19ba4477b41e582a2a1e38ce27879bb9640ef481a5e20973b5e.jpeg', title: 'Hotel 1', city: 'Jakarta', location: 'Jakarta, Indonesia', rating: 4.5}} />
                    </View>
                </ScrollView>
            </ContainSafeArea>
        </>
    );
}

