import axios from 'axios';

const api = axios.create({
    baseURL: `${process.env.BASE_URL}/services/rest/`,
    timeout: process.env.TIME_OUT || 60000
});

export const constructSearchURL = ({searchQuery, pageNumber = 1}) => {
    return `?method=flickr.photos.search&api_key=${process.env.API_KEY}&text=${searchQuery}&per_page=30&page=${pageNumber}&format=json&nojsoncallback=1`;
}

export const constructPhotoURL = ({farm, server, id, secret}) => {
    return `https://farm${farm}.staticflickr.com/${server}/${id}_${secret}.jpg`;
}

export default api;