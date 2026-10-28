import api, { type ApiResponse } from '~/api/axiosClient';
import type { Cerveza } from '~/types';

export const getCervezas = async (): Promise<Cerveza[]> => {
    const { data } = await api.get<ApiResponse<Cerveza[]>>('/cervezas');
    return data.data;
};

export const getCervezaBySlug = async (slug: string): Promise<Cerveza> => {
    const { data } = await api.get<ApiResponse<Cerveza>>(`/cervezas/${encodeURIComponent(slug)}`);
    return data.data;
};