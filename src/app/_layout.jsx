// This is the root layout of your app

// Import your global CSS file
import '@app/global.css';
import '@app/style/global.css.android.css';
import '@app/style/global.css.ios.css';
import '@app/style/global.css.web.css';
import React from 'react';
import {Stack} from "expo-router";
import { StatusBar } from 'expo-status-bar';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'react-redux';
import store from '@app/store';
import Toast from 'react-native-toast-message';
import toastConfig from "@app/components/common/ToastConfig";
import AuthInitializer from "@app/components/auth/AuthInitializer";



const RootLayout = () => {
  const queryClient = new QueryClient();
  return (
    <Provider store={store}>
        <QueryClientProvider client={queryClient}>
            <AuthInitializer />
            <Stack>
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            </Stack>
        </QueryClientProvider>
        <Toast position={'top'} topOffset={50} config={toastConfig} />
    </Provider>
  );
}

export default RootLayout;
