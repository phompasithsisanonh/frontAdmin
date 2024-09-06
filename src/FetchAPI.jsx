// src/hooks/useFetchData.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FetchAPI = (url, dependencies = []) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await axios.get(url);
                setData(response.data);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [dependencies,url]);

    return { data, loading, error };
};

export default FetchAPI;
