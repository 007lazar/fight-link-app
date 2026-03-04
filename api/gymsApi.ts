export async function fetchGyms() {
    const res = await fetch("http://localhost:3000/gyms");
    
    if (!res.ok) {
        throw new Error("Failed to fetch gyms");
    }

    const data = await res.json(); 

    return data;
}


