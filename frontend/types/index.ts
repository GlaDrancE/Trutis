export interface Agent {
  id: string;
  name: string;
  email: string;
  phone: string;
  password: string;
  address: string;
  type_of_employment: string;
  profile: string;
  created_at: string;
}

export interface ActivePlan {
  client_id: string;
  createdAt: string;
  id: string;
  isActive: Boolean
  plan_id: string;
  updatedAt: string;
}
export interface Client {
  id?: string;
  email: string;
  shop_name: string;
  owner_name: string;
  password?: string;
  phone: string;
  address: string;
  logo?: File | any;
  googleAPI: string;
  plan_id?: string;
  plan_title?: string;
  created_at?: string;
  activePlan?: ActivePlan[];
}

export interface QRCode {
  id: string;
  public_key: string;
  private_key: string;
  client_id: string;
  amount: number;
  status: 'active' | 'used';
  created_at: string;
}

export interface PaymentLog {
  id: string;
  qr_code_id: string;
  amount: number;
  status: 'success' | 'failed';
  created_at: string;
}

export interface Plans {
  id: string
  title: string
  price: string
  level: Number
}