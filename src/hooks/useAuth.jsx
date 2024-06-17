// useAuth.jsx:

import {useEffect, useState} from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import {loginSuccess, loginFailure, logout} from '@app/store/reducers/auth/authSlice';
import { supabase } from '@app/utils/supabase';
import { GoogleSignin } from '@react-native-google-signin/google-signin'

const useAuth = () => {
  GoogleSignin.configure({
    scopes: ['https://www.googleapis.com/auth/drive.readonly'],
    webClientId: '968205667274-v2qpjdrpe55fo416s68mp1frpua1q15g.apps.googleusercontent.com',
  })
    const [loading, setLoading] = useState(true);
    const queryClient = useQueryClient();
    const dispatch = useDispatch();

    const signIn = async (email, password) => {
        try {
            const { user, error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });
          if (error) {
            dispatch(loginFailure(error.message));
          } else {
            dispatch(loginSuccess(user));
          }

          return { user, error };
        } catch (error) {
            dispatch(loginFailure(error.message));
            return { user: null, error: error.message };
        }
    }

    const signUp = async (email, password) => {
        try {
            const { user, error } = await supabase.auth.signUp({
                email,
                password,
            });
          if (error) {
              console.log(error)
            dispatch(loginFailure(error.message));
          } else {
            dispatch(loginSuccess(user));
          }

          return { user, error };
        } catch (error) {
            dispatch(loginFailure(error.message));
            return { user: null, error: error.message };
        }
    }

    const googleSignIn = async () => {
        try {
          await GoogleSignin.hasPlayServices()
          const userInfo = await GoogleSignin.signIn()

          if (userInfo.idToken) {
            const {data, error} = await supabase.auth.signInWithIdToken({
              provider: 'google',
              token: userInfo.idToken,
            })
            if (error) {
              dispatch(loginFailure(error.message));
            } else {
              dispatch(loginSuccess(data.user));
            }
          } else {
            throw new Error('no ID token present!')
          }

        } catch (error) {
          dispatch(loginFailure(error.message));
          return { user: null, error: error.message };
        }

    }

    const signOut = async () => {
      await supabase.auth.signOut();
      dispatch(logout());
      queryClient.clear();
    }

    useEffect(() => {
      supabase.auth.getSession().then(({data: {session}}) => {
        if (session) {
          dispatch(loginSuccess(session.user));
        }
        setLoading(false);
      } ,[])

        const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
            if (session) {
            dispatch(loginSuccess(session.user));
            } else {
            dispatch(loginSuccess(null));
            }
        })
    }, [dispatch]);

    return { loading, signIn, signUp, googleSignIn, signOut };
};

export default useAuth;