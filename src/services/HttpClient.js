import axios from 'axios';

import { API_URL } from '../../config';

export default class HttpClient {
    constructor() {
        this.baseURL = API_URL;
        this.axiosClient = axios.create({
            baseURL: this.baseURL,
            timeout: 1000
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

    put(domain) {
        return this.axiosClient.put(domain, payload);
    }

    delete(domain) {
        return this.axiosClient.delete(domain);
    }
}