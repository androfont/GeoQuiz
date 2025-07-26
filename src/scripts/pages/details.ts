import { type Country } from "../types/types";
import fetchData from "../utils/api";

async function fetchCountryDetails(cca3: string): Promise<Country | null> {
    try {
        const countries = await fetchData<Country[]>(`https://restcountries.com/v3.1/alpha/${cca3}`);
        if (countries.length === 0) {
            console.error(`Country with cca3 code ${cca3} not found.`);
            return null;
        }
        else if (countries.length > 1) {
            console.warn(`Multiple countries found for cca3 code ${cca3}. Returning the first one.`);
        }
        // Return the first country found
        return countries[0];
    } catch (error) {
        console.error("Error fetching country details:", error);
        return null;
    }
}

function getCca3FromQuery(): string | null {
    const params = new URLSearchParams(window.location.search);
    return params.get("cca3");
}

const cca3 = getCca3FromQuery();
if (!cca3) {
    console.error("No cca3 code provided in query parameters.");
}
else {
    const countryDetailsPromise = fetchCountryDetails(cca3);
    document.addEventListener("DOMContentLoaded", async () => {
        let countryDetails = await countryDetailsPromise;
        if (!countryDetails) {
            console.error("Country details not found.");
            return;
        }

        const h1 = document.querySelector("h1");
        if (h1) {
            h1.append(document.createTextNode(countryDetails.name.common));
        }
    });
}