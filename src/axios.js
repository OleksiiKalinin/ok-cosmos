import axios from 'axios';

export const baseUrl = 'https://api.spacexdata.com/v4';

const instance = axios.create({
    baseUrl,
    responseType: 'json',
    headers: {
        'Content-Type': 'application/json'
    }
});

export default instance;