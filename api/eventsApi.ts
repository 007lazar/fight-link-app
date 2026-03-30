/// <reference types="vite/client" />
import type { EventModel } from '../src/models/event.model';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;
const url = `${API_URL}/events`;

export async function fetchEvents(){
    
    try{
        const res = await axios.get<EventModel[]>(url);
        return res.data;
    } catch (error) {
        throw new Error(`Error: ${error}`);
    }
}