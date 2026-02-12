
export type AppStep = 'landing' | 'dashboard' | 'checkout' | 'success';

export interface Tier {
  id: string;
  name: string;
  fee: number;
  newLimit: number;
  color: string;
  badge: string;
}

export interface UserData {
  phoneNumber: string;
  currentLimit: number;
  potentialLimit: number;
}

export const TIERS: Tier[] = [
  {
    id: 'bronze',
    name: 'Bronze',
    fee: 200,
    newLimit: 2000,
    color: 'bg-orange-100 border-orange-200 text-orange-800',
    badge: 'Basic'
  },
  {
    id: 'silver',
    name: 'Silver',
    fee: 500,
    newLimit: 5000,
    color: 'bg-gray-100 border-gray-200 text-gray-800',
    badge: 'Pro'
  },
  {
    id: 'gold',
    name: 'Gold',
    fee: 1000,
    newLimit: 10000,
    color: 'bg-yellow-50 border-yellow-200 text-yellow-800',
    badge: 'Max'
  }
];
