import axios from "axios";

export const customAxios = axios.create({
  withCredentials: true,
});

customAxios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  },
);
