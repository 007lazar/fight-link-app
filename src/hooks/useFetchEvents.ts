import type { EventModel } from "@/models/event.model";
import {fetchEvents} from 'api/eventsApi'
import { useEffect, useState } from "react";

export function useFetchEvents() {
        const [events, setEvents] = useState<EventModel[]>([]);

    useEffect(() => {
        async function loadEvents() {
            const data = await fetchEvents()
            setEvents(data)
        }
    
        loadEvents()
    }, [])

    return events;
}