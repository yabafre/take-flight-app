
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Pressable, Text } from 'react-native';
import useAuth from '@app/hooks/useAuth';


export default function GoogleNative() {

    const { googleSignIn } = useAuth();

    return (
        <Pressable
            className={'w-64 h-12 bg-black rounded-md flex flex-row items-center justify-center gap-4'}
            onPress={googleSignIn}>
            <FontAwesome name="google" size={20} color="white" />
            <Text className={'font-bold text-white'}>Sign in with Google</Text>
        </Pressable>
    )
}