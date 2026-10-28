import api, { type ApiResponse } from '~/api/axiosClient';
import type { Ubicacion } from '~/types';

export const getUbicaciones = async (): Promise<Ubicacion[]> => {
    const { data } = await api.get<ApiResponse<Ubicacion[]>>('/ubicaciones');
    return data.data;
};