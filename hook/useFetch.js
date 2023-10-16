import { useState, useEffect} from "react";
import axios from "axios";
import {RAPID_API_KEY} from '@env'
const rapidApiKey = RAPID_API_KEY;
const useFetch = (endpoint, query) => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const options = {
        headers: {
            'X-RapidAPI-Key': rapidApiKey,
            'X-RapidAPI-Host': 'jsearch.p.rapidapi.com',
        },
        method: 'GET',
        params: {...query},
        url: `https://jsearch.p.rapidapi.com/${endpoint}`,
    };

    const fetchData = async () => {
        console.log(options)
        setIsLoading(true);

        try {
            await axios.request(options)
                .then((response) => {
                    setData(response.data.data);
                    setIsLoading(false);
                })
        }
        catch (error) {
            setError(error);
            alert('Error while fetching')
        }
        finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchData()
    }, []);
    const refetch = () => {
        setIsLoading(true);
        fetchData();
    }

    return {data, isLoading, error, refetch};
}

export default useFetch;