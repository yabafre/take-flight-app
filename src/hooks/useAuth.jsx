import { useEffect, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { loginSuccess, loginFailure, logout } from '@app/store/reducers/auth/authSlice';
import { supabase } from '@app/utils/supabase';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import api from '@app/api';
import { makeRedirectUri } from 'expo-auth-session';
import * as Linking from 'expo-linking';
import * as WebBrowser from 'expo-web-browser';

WebBrowser.maybeCompleteAuthSession(); // required for web only
const redirectTo = makeRedirectUri();

const useAuth = () => {
  GoogleSignin.configure({
    scopes: ['https://www.googleapis.com/auth/drive.readonly'],
    webClientId: '968205667274-v2qpjdrpe55fo416s68mp1frpua1q15g.apps.googleusercontent.com',
  });

  const [loading, setLoading] = useState(true);
  const queryClient = useQueryClient();
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

  const signIn = async (email, password) => {
    try {
      const { data: { session }, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        dispatch(loginFailure(error.message));
      } else {
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
      return { session, error };
    } catch (error) {
      dispatch(loginFailure(error.message));
      return { session: null, error: error.message };
    }
  };

  const signUp = async (email, password, full_name) => {
    try {
      const { data: { session }, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: redirectTo,
          data: { full_name: full_name }
        }
      });
      if (error) {
        dispatch(loginFailure(error.message));
      } else {
        console.log('session', session);
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
      return { session, error };
    } catch (error) {
      dispatch(loginFailure(error.message));
      return { session: null, error: error.message };
    }
  };

  const googleSignIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();

      if (userInfo.idToken) {
        const { data: session, error } = await supabase.auth.signInWithIdToken({
          provider: 'google',
          token: userInfo.idToken,
        });
        if (error) {
          dispatch(loginFailure(error.message));
        } else {
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
      } else {
        throw new Error('no ID token present!');
      }
    } catch (error) {
      dispatch(loginFailure(error.message));
      return { session: null, error: error.message };
    }
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    dispatch(logout());
    queryClient.clear();
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
      setLoading(false);
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

  return { loading, signIn, signUp, googleSignIn, signOut };
};

export default useAuth;
