import { type Country } from "../types/types";
import { fetchCountries } from "../utils/countries-api";

let countryDataPromise = fetchCountries(["cca3", "flags", "name", "area", "population", "capital", "continents", "region", "subregion"]);

document.addEventListener("DOMContentLoaded", async () => {
    let countries = (await countryDataPromise).sort((a, b) => a.name.common.localeCompare(b.name.common));
    renderCountries(countries);

    const searchForm = document.getElementById("search-form") as HTMLFormElement;
    const searchInput = document.getElementById("in-country") as HTMLInputElement;

    searchForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const query = searchInput.value.trim();
        if (query) {
            renderCountries(countries.filter(country =>
                country.name.common.toLowerCase().includes(query.toLowerCase()) ||
                country.name.official.toLowerCase().includes(query.toLowerCase())));
        } else {
            renderCountries(countries);
        }
    });

    function renderCountries(countries: Country[]) {
        const countryList = document.getElementById("country-list") as HTMLTableSectionElement;
        if (!countryList) return;

        countryList.innerHTML = "";
        countries.forEach(country => {
            const row = document.createElement("tr");
            row.role = "link";
            const DETAILS_PAGE = "details.html?cca3=";
            const detailsUrl = `${DETAILS_PAGE}${encodeURIComponent(country.cca3)}`;
            row.setAttribute("data-href", detailsUrl);
            row.addEventListener("click", () => {
                window.location.href = detailsUrl;
            });

            // Flag (as image)
            const flagCell = document.createElement("td");
            const flagImg = document.createElement("img");
            flagImg.src = country.flags.png.toString();
            flagImg.alt = country.flags.alt || `${country.name.common} flag`;
            flagImg.width = 32;
            flagImg.height = 20;
            flagCell.appendChild(flagImg);
            row.appendChild(flagCell);

            // Name (common)
            const nameCell = document.createElement("td");
            const nameLink = document.createElement("a");
            nameLink.href = detailsUrl;
            nameLink.textContent = country.name.common;
            nameCell.appendChild(nameLink);
            row.appendChild(nameCell);

            // Area
            const areaCell = document.createElement("td");
            areaCell.className = "text-end font-monospace";
            areaCell.textContent = country.area.toLocaleString();
            row.appendChild(areaCell);

            // Population
            const populationCell = document.createElement("td");
            populationCell.className = "text-end font-monospace";
            populationCell.textContent = country.population.toLocaleString();
            row.appendChild(populationCell);

            // Capital (first if exists)
            const capitalCell = document.createElement("td");
            capitalCell.textContent = country.capital && country.capital.length > 0 ? country.capital[0] : "—";
            row.appendChild(capitalCell);

            // Continents
            const continentsCell = document.createElement("td");
            continentsCell.textContent = country.continents && country.continents.length > 0 ? country.continents.join(", ") : "—";
            row.appendChild(continentsCell);

            // Region
            const regionCell = document.createElement("td");
            regionCell.textContent = country.region;
            row.appendChild(regionCell);

            // SubRegion
            const subregionCell = document.createElement("td");
            subregionCell.textContent = country.subregion;
            row.appendChild(subregionCell);

            countryList.appendChild(row);
        });
    };
});