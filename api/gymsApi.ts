/// <reference types="vite/client" />
import type { GymModel } from '../src/models/gym.model';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;
const url = `${API_URL}/gyms`;

export async function fetchGyms() {
    
    try {
        const res = await axios.get<GymModel[]>(url);
        return res.data;
    } catch (error) {
        throw new Error(`Error: ${error}`);
    }
}


