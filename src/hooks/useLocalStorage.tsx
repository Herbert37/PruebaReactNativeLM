import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useLocalStorage = () => {

    const setData = async (key:string,value:string) => {
        try {
          await AsyncStorage.setItem(`@${key}`, value);
        } catch (e) {
          // saving error
        }
    }
    const setDataObject = async (key:string,value:[]) => {
        try {
          const jsonValue = JSON.stringify(value)
          await AsyncStorage.setItem('@storage_Key', jsonValue)
        } catch (e) {
          // saving error
        }
    }
    
    const getData = async (key:string) => {
        try {
          const value = await AsyncStorage.getItem(`@${key}`)
          if(value !== null) {
            return value;
          }else{
            return "";
          }
        } catch(e) {
          return "";
        }
    }

    const getDataObject = async (key:string) => {
        try {
          const jsonValue = await AsyncStorage.getItem('@storage_Key')
          return jsonValue != null ? JSON.parse(jsonValue) : "";
        } catch(e) {
            return "";
        }
      }
    return {
        setData, getData, setDataObject, getDataObject
    }
}
