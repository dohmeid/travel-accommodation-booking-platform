import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

//enum for HTTP methods
export enum HttpMethod {
  GET = 'get',
  POST = 'post',
  PUT = 'put',
  DELETE = 'delete',
}

//create an Axios instance with default configuration
export const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    accept: 'application/json, text/plain',
    'Content-Type': 'application/json',
  },
});

//axios request interceptor -> used to authenticate API requests with the token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

//axios response interceptor -> creates centralized error handling mechanism
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: AxiosError) => {
    const statusCode = error.response?.status;
    let errorMessage = `API call failed: ${statusCode}, ${error.message}`;

    switch (statusCode) {
      case 400:
        errorMessage = 'Bad Request';
        break;
      case 401:
        errorMessage = 'Unauthorized User. Redirecting to login...';
        break;
      case 403:
        errorMessage = 'Forbidden error';
        break;
      case 404:
        errorMessage = 'Resource not found';
        break;
      default:
        break;
    }
    return Promise.reject(new Error(errorMessage));
  },
);

export const apiRequest = async <T>(
  method: HttpMethod,
  url: string,
  data?: unknown,
  params?: unknown,
): Promise<T> => {
  const config: AxiosRequestConfig = {
    method,
    url,
    data,
    params,
  };
  try {
    const response = await apiClient(config);
    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(
        `${error.message}, ${method.toUpperCase()} error in ${url} request`,
      );
    }
    throw new Error('An unknown error occurred');
  }
};
