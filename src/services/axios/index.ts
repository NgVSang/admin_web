import axios, {AxiosResponse} from 'axios';

const instance = axios.create({
  baseURL: 'https://e391-123-19-197-212.ap.ngrok.io/api',
  // Các cấu hình khác của Axios
});

const handleSuccessResponse = (response: AxiosResponse<any, any>) =>{
    return response.data;
}

const handleErrorResponse = (error: any) => {
    try {
      // console.log("here");
      return Promise.reject(error.response.data)
    } catch (e) {
      return Promise.reject({ message: 'Network Error' })
    }
};

export const setHeaderConfigAxios = (token: string) => {
  if(token) {
    instance.defaults.headers.common["Authorization"] = token
      ? "Bearer " + token
      : "";
  }else {
    delete instance.defaults.headers.common["Authorization"];
  }
};

instance.interceptors.response.use(handleSuccessResponse,handleErrorResponse);

export default instance;
