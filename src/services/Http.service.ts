import axios, { AxiosError, AxiosResponse } from "axios";

export class Http {
    protected readonly axios = axios;
    protected controller: AbortController | null = null;
    protected readonly connect = axios.create({
        baseURL: `http://localhost:3000`
    })

    protected async get<T>(url: string): Promise<T | undefined> {
        if (this.controller) {
            this.controller.abort();
        }

        this.controller = new AbortController();

        try {
            const response: AxiosResponse = await this.connect.get(url, {
                signal: this.controller.signal,
            });

            return response.data;

        } catch (error) {
            if (this.axios.isCancel(error)) {
                console.warn("Request canceled:", error.message);
            } else if ((error as AxiosError).isAxiosError) {
                const axiosError = error as AxiosError;
                console.error('Axios error:', axiosError.message);
                throw new Error("Axios error: " + axiosError.message);
                // return axiosError;
            } else {
                console.error('Unexpected error:', error);
                // return error as Error;
            }
        }
    }

    protected async post<T, P>(url: string, payload: P): Promise<T | undefined> {
        if (this.controller) {
            this.controller.abort();
        }

        this.controller = new AbortController();

        try {
            const response: AxiosResponse = await this.connect.post(url, payload, {
                signal: this.controller.signal,
            });

            return response.data;

        } catch (error) {
            if (this.axios.isCancel(error)) {
                console.warn("Request canceled:", error.message);
            } else if ((error as AxiosError).isAxiosError) {
                const axiosError = error as AxiosError;
                console.error('Axios error:', axiosError.message);
                throw new Error("Axios error: " + axiosError.message);
                // return axiosError;
            } else {
                console.error('Unexpected error:', error);
                // return error as Error;
            }
        }
    }

    protected async put<T, P>(url: string, payload: P): Promise<T | undefined> {
        if (this.controller) {
            this.controller.abort();
        }

        this.controller = new AbortController();

        try {
            const response: AxiosResponse = await this.connect.put(url, payload, {
                signal: this.controller.signal,
            });

            return response.data;

        } catch (error) {
            if (this.axios.isCancel(error)) {
                console.warn("Request canceled:", error.message);
            } else if ((error as AxiosError).isAxiosError) {
                const axiosError = error as AxiosError;
                console.error('Axios error:', axiosError.message);
                throw new Error("Axios error: " + axiosError.message);
                // return axiosError;
            } else {
                console.error('Unexpected error:', error);
                // return error as Error;
            }
        }
    }

    protected async delete<T>(url: string): Promise<T | undefined> {
        if (this.controller) {
            this.controller.abort();
        }

        this.controller = new AbortController();

        try {
            const response: AxiosResponse = await this.connect.delete(url, {
                signal: this.controller.signal,
            });

            return response.data;

        } catch (error) {
            if (this.axios.isCancel(error)) {
                console.warn("Request canceled:", error.message);
            } else if ((error as AxiosError).isAxiosError) {
                const axiosError = error as AxiosError;
                console.error('Axios error:', axiosError.message);
                throw new Error("Axios error: " + axiosError.message);
                // return axiosError;
            } else {
                console.error('Unexpected error:', error);
                // return error as Error;
            }
        }
    }
}

