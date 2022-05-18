import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const baseURL = 'https://private-81ff1a-pruebamobileapp.apiary-mock.com/';

const API = axios.create({ baseURL });

/*productsAPI.interceptors.request.use(
    async(config) => {
        const token = await AsyncStorage.getItem('token');
        if ( token ) {
            config.headers['x-token'] = token;
        }
        return config;
    }
);*/



export default API;
