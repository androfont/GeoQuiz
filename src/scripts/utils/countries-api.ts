import { type Country, type Field } from "../types/types";
import fetchData from "./api";

export async function fetchCountries(fields: Field[]): Promise<Country[]> {
    try {
        let fieldsQuery = fields.join(",");
        if (fieldsQuery) {
            fieldsQuery = `?fields=${fieldsQuery}`;
        }
        const countries = await fetchData<Country[]>(`https://restcountries.com/v3.1/all${fieldsQuery}`);
        return countries;
    } catch (error) {
        console.error("Error fetching countries:", error);
        return [];
    }
}