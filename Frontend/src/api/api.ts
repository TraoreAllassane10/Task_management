import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api/v1/",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    // console.log(error.response);
    // if (error.reponse.status === 401) {
    //   console.log(error.response.data.message);
    // }

    return Promise.reject(error.response.data);
  },
);

export default api;
