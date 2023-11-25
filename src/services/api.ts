import { AppError } from "@/utils/app-error";
import axios, { AxiosError } from "axios";

export const api = axios.create({
  baseURL: 'http://localhost:3333/api'
})

api.interceptors.response.use(
  (response) => response, 
  (error) => {
    if(error.response && error.response.data && error instanceof AxiosError) {
      return Promise.reject(new AppError(error.response.data.message, error.response.status))
    }
    return Promise.reject(new AppError('Internal server error', 500))
  }
)