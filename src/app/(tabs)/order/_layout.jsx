import { Slot } from 'expo-router';
import AuthProvider from "@app/providers/AuthProvider";

export default function OrderLayout() {
    return (
        <AuthProvider>
            <Slot />
        </AuthProvider>
    );
}
