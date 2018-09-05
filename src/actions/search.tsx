import api, { constructSearchURL } from '../utils/axiosInstance';
import { Dispatch } from 'redux';
import { SearchActions } from '../constants/ActionTypes';
// import { CrashReporter } from '../libs/crashReporter';

// Optimize already fetched queries
export const fetchSearchResults = (searchQuery: string) => (dispatch: Dispatch) => {
    dispatch({
        type: SearchActions.FETCH_RESULTS,
        searchQuery
    });
    const searchURL = constructSearchURL({searchQuery, pageNumber: 1});
    api.get(searchURL)
    .then((res: any) => {
        const data = res.data;
        dispatch({
            type: SearchActions.FETCHED_RESULTS,
            searchResults: data.photos.photo
        });
    })
    .catch((err: any) => {
        console.log(err.response);
    });
};