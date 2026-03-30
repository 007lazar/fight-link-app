import type { EventModel } from '@/models/event.model';
import axios from 'axios';

const url = "http://localhost:3000/events";

export async function fetchEvents(){
    
    try{
        const res = await axios.get<EventModel[]>(url);
        return res.data;
    }catch (error){
        throw new Error(`Error: ${error}`);
    }
}