import axios from "axios";
import { Agent, Client } from "../types";

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  }, (error) => {
    return Promise.reject(error);
  }
)

// Auth
export const login = (email: string, password: string) =>
  api.post("/auth/admin/login", { email, password });

export const register = (email: string, password: string) =>
  api.post("/auth/admin/signup", { email, password });

// Agents
export const getAgents = () => api.get("/agents");
export const createAgent = (data: Omit<Agent, "id" | "created_at">) =>
  api.post("/agents", data);
export const updateAgent = (id: string, data: Partial<Agent>) =>
  api.put(`/agents/${id}`, data);
export const deleteAgent = (id: string) => api.delete(`/agents/${id}`);

// Clients
export const getClients = () => api.get("/clients");
export const createClient = (data: Omit<Client, "id" | "created_at">) =>
  api.post("/clients", data);
export const updateClient = (id: string, data: Partial<Client>) =>
  api.put(`/clients/${id}`, data);
export const deleteClient = (id: string) => api.delete(`/clients/${id}`);

// QR Codes
export const getQRCodes = () => api.get("/qr-codes");
export const generateQRCode = (data: { client_id: string; amount: number }) =>
  api.post("/qr-codes", data);

// Payment Logs
export const getPaymentLogs = () => api.get("/payment-logs");


export const getPlans = () => api.get("/clients/subscription-plans")