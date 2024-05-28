import { BaseToast, ErrorToast } from 'react-native-toast-message';
import React from "react";


const toastConfig = {
    success: ({ text1, ...rest }) => (
        <BaseToast
            {...rest}
            style={{ borderLeftColor: 'transparent', backgroundColor: 'rgba(0, 0, 0, 0.8)', borderRadius: 10}}
            contentContainerStyle={{ paddingHorizontal: 15 }}
            text1Style={{
                fontSize: 15,
                color: 'white',
            }}
            text1={text1}
        />
    ),
    error: ({ text1, ...rest }) => (
        <ErrorToast
            {...rest}
            style={{ borderLeftColor: 'transparent' }}
            text1Style={{
                fontSize: 15,
                color: 'white',
            }}
            text1={text1}
        />
    ),
};

export default toastConfig;