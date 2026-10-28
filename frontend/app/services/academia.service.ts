import api, { type ApiResponse } from '~/api/axiosClient';
import type { AcademiaArticulo } from '~/types';

export const getAcademiaArticulos = async (): Promise<AcademiaArticulo[]> => {
    const { data } = await api.get<ApiResponse<AcademiaArticulo[]>>('/academia');
    return data.data;
};

export const getArticuloBySlug = async (slug: string): Promise<AcademiaArticulo> => {
    const { data } = await api.get<ApiResponse<AcademiaArticulo>>(`/academia/${encodeURIComponent(slug)}`);
    return data.data;
};