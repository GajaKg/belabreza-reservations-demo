import { Http } from "../../../services/Http.service";
import { Hotel } from "../Hotels.interface";

class HotelService extends Http {

    private readonly url = "/hotels";

    async fetchHotels(): Promise<Hotel[] | undefined> {
        return await this.get<Hotel[]>(this.url);
    }

    async addHotel(hotel: Hotel): Promise<Hotel | undefined> {
        return await this.post<Hotel, Hotel>(this.url, hotel);
    }

    async editHotel(hotel: Hotel): Promise<Hotel | undefined> {
        return await this.put<Hotel, Hotel>(`${this.url}/${hotel.id}`, hotel);
    }

    async deleteHotel(hotel: Hotel): Promise<Hotel | undefined> {
        return await this.delete<Hotel>(`${this.url}/${hotel.id}`);
    }
}


export const hotelService = new HotelService();