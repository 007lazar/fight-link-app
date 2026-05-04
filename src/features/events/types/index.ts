export type EventStatus = 'DRAFT' | 'PUBLISHED' | 'CANCELLED';

export interface EventModel {
  slug: string;
  title: string;
  description: string;
  discipline: string;
  city: string;
  address: string | null;
  date: string;
  poster: string;
  capacity: number | null;
  price: string | null;
  status: EventStatus;
  registrationDeadline: string | null;
  organizerId: string;
  gymId: string | null;
  createdAt: string;
}
