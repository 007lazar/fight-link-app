import { api } from '../api/axios';
import type { GymModel } from '@/models/gym.model';

export async function fetchGyms() {
  try {
    const res = await api.get<GymModel[]>('/gyms');
    return res.data;
  } catch (error) {
    throw new Error(`${error}`);
  }
}

export async function createGym() {
  await api.post('/gyms', {
    slug: "AKI-mma",
    name: "Dzica MMA",
    description: "Za  prave dzicere",
    poster: "https://thedesignlove.com/wp-content/uploads/2024/05/ultimate-fighting-championship-logo-Today-1024x683.jpg",
    badges: [
      "420",
      "BJJ"
    ],
    ownerId: "3a5e6d5b-0fd9-4939-bf1a-7ec66aa350a2"
  });
}