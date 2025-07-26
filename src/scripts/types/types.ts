export type Field = "cca3" | "flags" | "name" | "area" | "population" | "capital" | "continents" | "region" | "subregion";

export type Country = {
    "name": {
        "common": string,
        "official": string,
        "nativeName": {
            "spa": {
                "official": string,
                "common": string
            }
        }
    },
    "capital": string[],
    "region": string,
    "subregion": string,
    "area": number,
    "cca3": string,
    "population": number,
    "continents": string[],
    "flags": {
        "png": string,
        "svg": string,
        "alt": string
    }
};