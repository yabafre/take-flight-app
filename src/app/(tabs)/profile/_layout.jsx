import { Slot } from 'expo-router';
import AuthProvider from "@app/providers/AuthProvider";

export default function ProfileLayout() {
    return (
        <AuthProvider>
            <Slot />
        </AuthProvider>
    );
}
