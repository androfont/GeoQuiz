export default async function fetchData<T>(url: string): Promise<T> {
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return (await response.json()) as T;
}