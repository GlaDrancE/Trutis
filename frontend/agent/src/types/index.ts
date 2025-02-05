export interface Client {
  id: string;
  name: string;
  email: string;
  status: 'pending' | 'verified';
  paymentAmount: number;
}

export interface Agent {
  id: string;
  name: string;
  email: string;
  isActive: boolean;
  totalVerifications: number;
  milestone: number;
  completedClients: number;
}