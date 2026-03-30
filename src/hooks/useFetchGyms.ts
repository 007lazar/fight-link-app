import type { GymModel } from "@/models/gym.model";
import { fetchGyms } from "api/gymsApi";
import { useEffect, useState } from "react";

export function useFetchGyms(){
    const [gyms, setGyms] = useState<GymModel[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function loadGyms(){
            
            try {
                const data = await fetchGyms();
                setGyms(data);
            }catch (error){
                setError(`Error: ${error}`);
            }finally {
                setIsLoading(false);
            }
        }

        loadGyms()
    }, [])

    return { gyms, isLoading, error };
}