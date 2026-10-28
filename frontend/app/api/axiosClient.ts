import axios, { type AxiosInstance, type AxiosResponse, type AxiosError } from 'axios';
import https from 'node:https';

export interface ApiResponse<T> {
    data: T;
    message?: string;
    meta?: {
        current_page?: number;
        last_page?: number;
        per_page?: number;
        total?: number;
    };
}

const isServer = typeof window === 'undefined';
const isDev = process.env.NODE_ENV !== 'production';

export const api: AxiosInstance = axios.create({
    baseURL: process.env.API_URL || 'https://backend.test/api/v1',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    },
    timeout: 10000,
    httpsAgent: isServer && isDev && process.env.NODE_ENV !== 'production'
        ? new https.Agent({ rejectUnauthorized: false })
        : undefined,
});

api.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error: AxiosError<{ message?: string }>) => {
        if (isDev) {
            const errorMsg = error.response?.data?.message || error.message || 'Error de conexión con la API';
            console.error(`[API Error ${error.response?.status ?? 'Network'}]:`, errorMsg);
        } else {
            console.error(`[API Error ${error.response?.status ?? 'Network'}]`);
        }
        return Promise.reject(error);
    }
);

export default api;