import { useEffect, useState } from "react";

export default function useFetch(apiEndpoint, refreshKey) {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loader, setLoader] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoader(true);
            try {
                const response = await fetch(import.meta.env.VITE_BACKEND_URL + apiEndpoint, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                const result = await response.json();

                if (!response.ok) {
                    throw new Error(result.message || `Failed to fetch data from ${apiEndpoint}`);
                }

                setData(result.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoader(false);
            }
        };

        fetchData();
    }, [apiEndpoint, refreshKey]);

    return { data, error, loader };
}