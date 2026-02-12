
export type AppStep = 'landing' | 'login' | 'signup' | 'idUpload' | 'limitInput' | 'dashboard' | 'checkout' | 'success';

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
  fullName?: string;
  currentLimit: number;
  potentialLimit: number;
  idFront?: string;
  idBack?: string;
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
  },
  {
    id: 'platinum',
    name: 'Platinum',
    fee: 2500,
    newLimit: 30000,
    color: 'bg-blue-50 border-blue-200 text-blue-800',
    badge: 'Ultra'
  },
  {
    id: 'diamond',
    name: 'Diamond',
    fee: 5000,
    newLimit: 50000,
    color: 'bg-purple-50 border-purple-200 text-purple-800',
    badge: 'Elite'
  }
];
