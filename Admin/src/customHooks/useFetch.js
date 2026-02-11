/* eslint-disable no-unused-vars */
import { useState , useEffect } from "react";

// url for custom path for fetching generic data 

export const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
      
        const getData = async () => {
            setLoading(true);
            try {
                const response = await fetch(url, {
                  method: "GET",
                  credentials: "include",
                });
                const data = await response.json();
                console.log(data);
                setData(data);
            }
            catch (error) {
                setError(error.message || "something went wrong");
                
            }
            finally {
                setLoading(false);
            }
        };
        getData();
    }, [url])
    
    return {
        data,
        error,
        loading
    }
};