import { Http } from "../../../services/Http.service";
import { Customer } from "../models/Customer.interface";

class CustomerService extends Http {

    private readonly url = "/customers";

    async fetchCustomers(): Promise<Customer[] | undefined> {
        return await this.get(this.url);
    }

    async addCustomer(customer: Customer): Promise<Customer | undefined> {
        return await this.post<Customer, Customer>(this.url, customer);
    }

    async editCustomer(customer: Customer): Promise<Customer | undefined> {
        return await this.put<Customer, Customer>(`${this.url}/${customer.id}`, customer);
    }

    async deleteCustomer(customer: Customer): Promise<Customer | undefined> {
        return await this.delete<Customer>(`${this.url}/${customer.id}`);
    }
}


export const customerService = new CustomerService();