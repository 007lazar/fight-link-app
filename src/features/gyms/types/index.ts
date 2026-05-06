export interface GymModel {
  slug: string;
  name: string;
  description: string;
  poster: string;
  badges: string[];
  address: string | null;
  city: string | null;
  phone: string | null;
  instagram: string | null;
  website: string | null;
  verified: boolean;
  requiresApproval: boolean;
  ownerId: string;
}

export interface MyMembership {
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  gym: { slug: string };
}