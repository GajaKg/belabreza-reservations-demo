import { AxiosError, AxiosResponse } from "axios";
import { Http } from "../../../services/Http.service";
import { Hotel } from "../Hotels.interface";

class HotelService extends Http {

    private readonly url = "/hotels";

    async fetchHotels(): Promise<Hotel[] | undefined> {
        if (this.controller) {
            this.controller.abort();
        }

        this.controller = new AbortController();

        try {
            const response: AxiosResponse = await this.connect.get(this.url, {
                signal: this.controller.signal,
            });

            return response.data;

        } catch (error) {
            if (this.axios.isCancel(error)) {
                console.warn(error.message);
            } else if ((error as AxiosError).isAxiosError) {
                const axiosError = error as AxiosError;
                console.log('Axios error:', axiosError.message);
                // return axiosError;
            } else {
                console.log('Unexpected error:', error);
                // return error as Error;
            }
        }
    }

    async addHotel(hotel: Hotel): Promise<Hotel | undefined | AxiosError | Error> {
        if (this.controller) {
            this.controller.abort();
        }

        this.controller = new AbortController();

        try {
            const response: AxiosResponse = await this.connect.post(this.url, hotel, {
                signal: this.controller.signal,
            });

            if (response.status === 200) {
                return response.data;
            }
        } catch (error) {
            if (this.axios.isCancel(error)) {
                console.warn(error.message);
            } else if ((error as AxiosError).isAxiosError) {
                const axiosError = error as AxiosError;
                console.log('Axios error:', axiosError.message);
                return axiosError;
            } else {
                console.log('Unexpected error:', error);
                return error as Error;
            }
        }
    }

    async editHotel(hotel: Hotel): Promise<Hotel | undefined | AxiosError | Error> {
        if (this.controller) {
            this.controller.abort();
        }

        this.controller = new AbortController();

        try {
            const response: AxiosResponse = await this.connect.put(`${this.url}/${hotel.id}`, hotel, {
                signal: this.controller.signal,
            });

            if (response.status === 200) {
                return response.data;
            }
        } catch (error) {
            if (this.axios.isCancel(error)) {
                console.warn(error.message);
            } else if ((error as AxiosError).isAxiosError) {
                const axiosError = error as AxiosError;
                console.log('Axios error:', axiosError.message);
                return axiosError;
            } else {
                console.log('Unexpected error:', error);
                return error as Error;
            }
        }
    }
}


export const hotelService = new HotelService();