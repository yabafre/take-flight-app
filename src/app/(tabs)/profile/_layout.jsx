import { Slot } from 'expo-router';
import AuthProvider from "@app/providers/AuthProvider";
import ContainSafeArea from "@app/components/common/ContainSafeArea";


export default function ProfileLayout() {
    return (
        <AuthProvider>
            <ContainSafeArea>
                <Slot />
            </ContainSafeArea>
        </AuthProvider>
    );
}
