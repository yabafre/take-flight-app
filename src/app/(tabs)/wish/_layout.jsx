import { Slot } from 'expo-router';
import AuthProvider from "@app/providers/AuthProvider";

export default function WishlistLayout() {
    return (
        <AuthProvider>
            <Slot />
        </AuthProvider>
    );
}
