
import { useEffect, useState } from "react";

export default function useCurrInfo(currency) {
    let [data, setData] = useState({});

    useEffect(() => {
        fetch(`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${currency}.json`)
        .then((response) => response.json())
        .then((response) => setData(response))
    }, [currency])

    
    return data[currency];
}