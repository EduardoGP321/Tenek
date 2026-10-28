import api, { type ApiResponse } from '~/api/axiosClient';
import type { Experiencia } from '~/types';

export const getExperiencias = async (): Promise<Experiencia[]> => {
    const { data } = await api.get<ApiResponse<Experiencia[]>>('/experiencias');
    return data.data;
};