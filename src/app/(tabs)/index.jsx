import { Link } from "expo-router";
import React, {useEffect, useState} from "react";
import {Text, View, Button, Alert, Pressable} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Logo from "@assets/logo-full.svg";
import {supabase} from "@app/utils/supabase";
import Toast from 'react-native-toast-message'


export default function Page() {
    return (
        <View className="flex flex-1">
            <Header />
            <Content />
            <Footer />
        </View>
    );
}

function Content() {
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

        console.log(JSON.stringify(session?.user?.user_metadata, null, 2))

    } ,[])

    return (
        <View className="flex-1">
            <View className="py-12 md:py-24 lg:py-32 xl:py-48">
                <View className="px-4 md:px-6">
                    <View className="flex flex-col items-center gap-4 text-center">
                        <Text
                            role="heading"
                            className="text-3xl text-center native:text-5xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl"
                        >
                            Welcome to Project TfLight
                        </Text>
                        <Text className="mx-auto max-w-[700px] text-lg text-center text-gray-500 md:text-xl">
                            Discover and collaborate on Take Flight. Explore our services now.
                        </Text>

                        <View className="gap-4">
                            <Logo height={200} width={200} />
                            {session && session?.user && (
                                <Text className="text-lg font-bold text-center">
                                    Signed in as {session?.user?.user_metadata.full_name}
                                </Text>
                            )}
                            {session && (
                                <Pressable
                                    className="bg-black rounded flex items-center justify-center"
                                    onPress={async () => {
                                        const { error } = await supabase.auth.signOut()
                                        if (error) {
                                            Alert.alert('Error logging out:', error.message)
                                        }
                                    }}
                                >
                                    <Text className="p-2 text-white">Sign Out</Text>
                                </Pressable>
                            )}
                        </View>
                    </View>
                </View>
            </View>
        </View>
    );
}

function Header() {
    const { top } = useSafeAreaInsets();
    return (
        <View style={{ paddingTop: top }}>
            <View className="px-4 lg:px-6 h-14 flex items-center flex-row justify-between ">
                <Link className="font-bold flex-1 items-center justify-center" href="/">
                    Take Flight
                </Link>
                <View className="flex flex-row gap-4 sm:gap-6">
                    <Link
                        className="text-md font-medium hover:underline web:underline-offset-4"
                        href="/"
                    >
                        Hotels
                    </Link>
                    <Link
                        className="text-md font-medium hover:underline web:underline-offset-4"
                        href="/"
                    >
                        Flights
                    </Link>
                    <Link
                        className="text-md font-medium hover:underline web:underline-offset-4"
                        href="/"
                    >
                        All Inclusive
                    </Link>
                </View>
            </View>
        </View>
    );
}

function Footer() {
    const { bottom } = useSafeAreaInsets();
    return (
        <View
            className="flex shrink-0 bg-gray-100 native:hidden"
            style={{ paddingBottom: bottom }}
        >
            <View className="py-6 flex-1 items-start px-4 md:px-6 ">
                <Text className={"text-center text-gray-700"}>
                    © {new Date().getFullYear()} Me
                </Text>
            </View>
        </View>
    );
}
