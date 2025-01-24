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

export interface Client {
  id?: string;
  email: string;
  shop_name: string;
  owner_name: string;
  password?: string;
  phone: string;
  address: string;
  logo?: File | string;
  googleAPI: string;
  plan_id?: string;
  created_at?: string;
}

export interface QRCode {
  id: string;
  code: string;
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