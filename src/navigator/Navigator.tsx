import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { AuthContext } from '../context/AuthContext';

import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import HomeScreen from '../screens/HomeScreen';
import AddUserScreen from '../screens/AddUserScreen';
import BillScreen from '../screens/BillScreen';
import AddBillScreen from '../screens/AddBillScreen';
import LoadingScreen from '../screens/LoadingScreen';


const Stack = createStackNavigator();

export const Navigator = () => {

  const { status } = useContext( AuthContext );

  if ( status === 'checking' ) return <LoadingScreen />

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: {
          backgroundColor: 'white'
        }
      }}
    >

      {
        (status === 'authenticated') 
          ? (
            <>
              <Stack.Screen name="HomeScreen" component={ HomeScreen } />
              <Stack.Screen name="AddUserScreen" component={ AddUserScreen } />
              <Stack.Screen name="BillScreen" component={ BillScreen } />
              <Stack.Screen name="AddBillScreen" component={ AddBillScreen } />
            </>
          )
          : (
            <>
              <Stack.Screen name="LoginScreen" component={ LoginScreen } />
              <Stack.Screen name="RegisterScreen" component={ RegisterScreen } />
            </>
          )
      }

    </Stack.Navigator>
  );
}