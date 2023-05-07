import axios from 'axios';
import { AxiosError } from 'axios';
import { ApiError } from '@app/api/ApiError';
import { readToken } from '@app/services/localStorage.service';

export const httpApi = axios.create({
  baseURL: 'http://162.19.153.94:8000/',
});

httpApi.interceptors.request.use(
  (config) => {
    config.headers.Authorization = `Bearer ${readToken()}`
    return config
  }
)

httpApi.interceptors.response.use(undefined, (error: AxiosError) => {
  const errorData = error.response?.data as ApiErrorData;
  throw new ApiError<ApiErrorData>(errorData.message || error.message, errorData);
});

export interface ApiErrorData {
  message: string;
}
