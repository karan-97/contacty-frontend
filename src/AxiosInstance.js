import axios from "axios";
// Axios Instance
const instance = axios.create({
  // eslint-disable-next-line no-undef
  baseURL: process.env.REACT_APP_DEV_BASE_URL
});
// Request interceptor
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token != null) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
// Response interceptor
instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (!error.response) {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      window.location.reload();
    }
    if (error?.response?.status === 401) {
      window.location.reload();
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    } else {
      // toast.error(error.response.data.message);
    }
    return Promise.reject(error);
  }
);

export default instance;

