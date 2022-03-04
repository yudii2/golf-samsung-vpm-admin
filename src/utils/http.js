import axios from "axios";
import useAuth from "@/api/v1/auth/useAuth";

const http = axios.create({
  baseURL: `${process.env.VUE_APP_BASE_URI_ADMIN}`
})

const {getAccessToken} = useAuth()
http.interceptors.request.use((config) => {
  const authorizationValue = getAccessToken()
  if (authorizationValue) {
    config.headers["Authorization"] = authorizationValue;
  }
  return config;
})
http.interceptors.response.use(
  (response) => {
    const {data} = response;
    if (!data.error) return data?.data;
  }
);


export default http;

