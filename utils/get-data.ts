export async function getData(country: string) {
    const url = `https://restcountries.com/v3.1/name/${country}`;
    try {
        const res = await fetch(url);
        const countryData = await res.json();
        return countryData[0];
    } catch (e) {
        if (e instanceof Error) {
            throw new Error(`Unable to complete request: ${e.message}`);
        } else {
            throw new Error(`Unable to complete request: An unknown error occurred`);
        }
    }
}