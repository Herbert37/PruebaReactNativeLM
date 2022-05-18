import { useState } from 'react';
import API from '../api/API';

export const useRandomBanner = () => {
    
    const getRandomBanner = async() => {
        
        const resp = await API.get('/banner');
        const randomImage = resp.data.banner[Math.floor(Math.random()*resp.data.banner.imagen.length)];

        return randomImage;
    }

    return { getRandomBanner }
}