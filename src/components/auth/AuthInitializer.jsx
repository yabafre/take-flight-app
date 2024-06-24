import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loginSuccess, loginFailure } from '@app/store/reducers/auth/authSlice';
import { supabase } from '@app/utils/supabase';
import { makeRedirectUri } from 'expo-auth-session';
import * as Linking from 'expo-linking';
import * as WebBrowser from 'expo-web-browser';
import api from '@app/api';

WebBrowser.maybeCompleteAuthSession(); // required for web only
const redirectTo = makeRedirectUri();

const AuthInitializer = () => {
    const dispatch = useDispatch();

    const createSessionFromUrl = async (url) => {
        const { queryParams } = Linking.parse(url);
        const { access_token, refresh_token } = queryParams;

        if (!access_token) return;

        const { data, error } = await supabase.auth.setSession({
            access_token,
            refresh_token,
        });
        if (error) throw error;
        return data.session;
    };

    useEffect(() => {
        // Check the initial URL
        const handleInitialUrl = async () => {
            const initialUrl = await Linking.getInitialURL();
            if (initialUrl) {
                createSessionFromUrl(initialUrl).then(r => console.log(r));
            }
        };

        handleInitialUrl().then(r => console.log(r));

        // Listen to incoming URL events
        const handleUrlEvent = ({ url }) => {
            if (url) {
                createSessionFromUrl(url).then(r => console.log(r));
            }
        };

        const eventListener = Linking.addEventListener('url', handleUrlEvent);

        supabase.auth.getSession().then(async ({ data: { session } }) => {
            if (session) {
                const { data, error } = await api.get('/auth/login', {
                    headers: {
                        Authorization: `Bearer ${session.access_token}`
                    }
                });
                if (error) {
                    dispatch(loginFailure(error.message));
                } else {
                    dispatch(loginSuccess({ user: session.user, data }));
                }
            }
        });

        const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
            if (session) {
                const { data, error } = await api.get('/auth/login', {
                    headers: {
                        Authorization: `Bearer ${session.access_token}`
                    }
                });
                if (error) {
                    dispatch(loginFailure(error.message));
                } else {
                    dispatch(loginSuccess({ user: session.user, data }));
                }
            } else {
                dispatch(loginSuccess(null));
            }
        });

        return () => {
            authListener.subscription.unsubscribe();
            eventListener.remove();
        };
    }, [dispatch]);

    return null;
};

export default AuthInitializer;
