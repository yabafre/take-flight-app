import { Slot } from 'expo-router';
import AuthProvider from "@app/providers/AuthProvider";

export default function FlightLayout() {
    return (
        <AuthProvider>
            <Slot />
        </AuthProvider>
    );
}
