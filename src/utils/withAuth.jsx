import React from 'react';
import { useSelector } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';

const WithAuth = (WrappedComponent) => {
    return (props) => {
        const user = useSelector((state) => state.auth.user);

        if (!user) {
            // Redirigez l'utilisateur vers la page de connexion s'il n'est pas authentifié
            return null;
        }

        return (
            <NavigationContainer>
                <WrappedComponent {...props} />
            </NavigationContainer>
        );
    };
};

export default WithAuth;
