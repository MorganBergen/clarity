import React, { useEffect } from 'react';
import axios from 'axios';

const ApiCalls = () => {
    useEffect(() => {
        const fetchApiMessage = async () => {
            try {
                const response = await axios.get('http://localhost:5001/api');
                console.log('API response:', response.data);
            } catch (error) {
                console.error('Error fetching api message:', error);
            }
        };

        fetchApiMessage();
    }, []);

    return null;
};

export default ApiCalls;