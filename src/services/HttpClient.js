import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

import { API_URL } from '../../config';

export default class HttpClient {
  constructor() {
    this.baseURL = API_URL;
    this.axiosClient = axios.create({
      baseURL: this.baseURL,
      timeout: 10000
    });

    this.axiosClient.interceptors.request.use(async (req) => {
      const user = await AsyncStorage.getItem('user');
      if (user) {
        req.headers = { "auth-token": JSON.parse(user).token };
        console.log("HttpClient intercepted req:", req);
      }

      return req;
    }, error => {
      console.log("Error HttpClient:", error);
      return error;
    });
  }

  setHeaders(headers) {
    this.headers = headers;
    return this.axiosClient = axios.create({
      baseURL: this.baseURL,
      timeout: 1000,
      headers: headers
    });
  }

  setBaseURL(url) {
    this.baseURL = url;
    return this.axiosClient = axios.create({
      baseURL: url,
      timeout: 1000,
      headers: this.headers
    });
  }

  get(domain) {
    return this.axiosClient.get(domain);
  }

  post(domain, payload) {
    return this.axiosClient.post(domain, payload);
  }

  put(domain, payload) {
    return this.axiosClient.put(domain, payload);
  }

  patch(domain, payload) {
    return this.axiosClient.put(domain, payload);
  }

  delete(domain) {
    return this.axiosClient.delete(domain);
  }
}
