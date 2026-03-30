import type { GymModel } from '@/models/gym.model';
import axios from 'axios';

const url = "http://localhost:3000/gyms";

export async function fetchGyms() {
    
    try {
        const res = await axios.get<GymModel[]>(url);
        return res.data;

    }catch (error){
        throw new Error(`Error: ${error}`);
    }
    
}


