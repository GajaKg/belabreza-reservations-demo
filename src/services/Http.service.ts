import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from 'react-toastify';
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
                // toast.error(error.message);
            } else if ((error as AxiosError).isAxiosError) {
                const axiosError = error as AxiosError;
                console.error('Axios error:', axiosError);
                toast.error(axiosError.message);
                // throw new Error("Axios error: " + axiosError.message);
            } else {
                console.error('Unexpected error:', error);
                toast.error('Unable to fetch data. Please try again later.');
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
            toast.success("Uspešno dodato!")
            return response.data;

        } catch (error) {
            if (this.axios.isCancel(error)) {
                console.warn("Request canceled:", error.message);
            } else if ((error as AxiosError).isAxiosError) {
                const axiosError = error as AxiosError;
                console.error('Axios error:', axiosError.message);
                toast.error("Neuspešno, probajte kasnije!")
            } else {
                console.error('Unexpected error:', error);
                toast.error("Neuspešno, probajte kasnije!")
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
            toast.success("Uspešno izmenjeno!")
            return response.data;

        } catch (error) {
            if (this.axios.isCancel(error)) {
                console.warn("Request canceled:", error.message);
            } else if ((error as AxiosError).isAxiosError) {
                const axiosError = error as AxiosError;
                console.error('Axios error:', axiosError.message);
                toast.error("Neuspešno, probajte kasnije!")
            } else {
                console.error('Unexpected error:', error);
                toast.error("Neuspešno, probajte kasnije!")
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
            toast.success("Uspešno obrisano!")
            return response.data;

        } catch (error) {
            if (this.axios.isCancel(error)) {
                console.warn("Request canceled:", error.message);
            } else if ((error as AxiosError).isAxiosError) {
                const axiosError = error as AxiosError;
                console.error('Axios error:', axiosError.message);
                toast.error("Neuspešno, probajte kasnije!")
                // throw new Error("Axios error: " + axiosError.message);
            } else {
                console.error('Unexpected error:', error);
                toast.error("Neuspešno, probajte kasnije!")
            }
        }
    }
}

