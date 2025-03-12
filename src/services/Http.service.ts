import axios  from "axios";

export abstract class Http {
    protected readonly axios = axios;
    protected controller: AbortController | null = null;
    protected readonly connect = axios.create({
        baseURL: `http://localhost:3000`
    })
}

