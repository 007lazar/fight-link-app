import { api } from '../api/axios'
import type { EventModel } from '../src/models/event.model';

const API_URL = import.meta.env.VITE_API_URL;
const url = `${API_URL}/events`;

export async function fetchEvents() {

    try {
        const res = await api.get<EventModel[]>(url);
        return res.data;
    } catch (error) {
        throw new Error(`Error: ${error}`);
    }
}