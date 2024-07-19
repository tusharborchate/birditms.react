import { AxiosResponse } from 'axios';
import axiosInstance from './axiosHelper';

export const AxiosService = {
  async axiosGet(url: any, data?: any) {
    const response = await axiosInstance.get(url, data);
    return response;
  },

  async axiosPost(url: any, data: any) {
    console.log('post');
    const response = await axiosInstance.post(url, data);
    return response;
  },
};
