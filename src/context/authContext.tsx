import React, { createContext, useEffect, useReducer } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import API from '../api/API';

import { User, LoginResponse, LoginData, RegisterData } from '../interfaces/appInterfaces';
import { authReducer, AuthState } from './authReducer';

type AuthContextProps = {
    errorMessage: string;
    token: string | null;
    user: User | null;
    status: 'checking' | 'authenticated' | 'not-authenticated';
    signUp: ( registerData: RegisterData ) => void;
    signIn: ( loginData: LoginData ) => void;
    logOut: () => void;
    removeError: () => void;
}

const authInicialState: AuthState = {
    status: 'checking',
    token: null,
    user: null,
    errorMessage: ''
}



export const AuthContext = createContext({} as AuthContextProps);

export const AuthProvider = ({ children }: any)=> {

    const [ state, dispatch ] = useReducer( authReducer, authInicialState);

    useEffect(() => {
        checkToken();
    }, [])

    const checkToken = async() => {
        const token = await AsyncStorage.getItem('token');
        
        // No token, no autenticado
        if ( !token ) return dispatch({ type: 'notAuthenticated' });

        // Hay token
        const resp = await API.get('/auth');
        if ( resp.status !== 200 ) {
            return dispatch({ type: 'notAuthenticated' });
        }
        
        await AsyncStorage.setItem('token', resp.data.token );
        dispatch({ 
            type: 'signUp',
            payload: {
                token: resp.data.token,
                user: resp.data.user
            }
        });
    }


    const signIn = async({ email, password }: LoginData ) => {

        try {
         
            const { data } = await API.post<LoginResponse>('/auth/login', { email, password } );
            dispatch({ 
                type: 'signUp',
                payload: {
                    token: data.token,
                    user: data.user
                }
            });

            await AsyncStorage.setItem('token', data.token );

        } catch (error) {
            dispatch({ 
                type: 'addError', 
                payload: error.response.data.msg || 'Información incorrecta'
            })
        }
    };
    
    const signUp = async( { name, email, password }: RegisterData ) => {

        try {
         
            const { data } = await API.post<LoginResponse>('/usuarios', { email, password, name } );
            dispatch({ 
                type: 'signUp',
                payload: {
                    token: data.token,
                    user: data.user
                }
            });

            await AsyncStorage.setItem('token', data.token );

        } catch (error) {
            dispatch({ 
                type: 'addError', 
                payload: error.response.data.errors[0].msg || 'Revise la información'
            });
        }

    };

    const logOut = async() => {
        await AsyncStorage.removeItem('token');
        dispatch({ type: 'logout' });
    };

    const removeError = () => {
        dispatch({ type: 'removeError' });
    };

    return (
        <AuthContext.Provider value={{
            ...state,
            signUp,
            signIn,
            logOut,
            removeError,
        }}>
            { children }
        </AuthContext.Provider>
    )

}