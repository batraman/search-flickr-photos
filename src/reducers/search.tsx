import update from 'immutability-helper';
import { SearchActions } from '../constants/ActionTypes';

const initialState = {
    searchQuery: '',
    searchResults: [],
    previousSearches: new Set()
};

function reducer(state: any = initialState, action: any) {
    switch (action.type) {
        case SearchActions.POPULATE_PREVIOUS_SEARCHES:
            // Set to prevent duplicates
            return update(state, {
                previousSearches: {$set: new Set(action.previousSearches)}
            });
        case SearchActions.FETCH_RESULTS:
            return update(state, {
                searchQuery: {$set: action.searchQuery},
                previousSearches: {$add: [action.searchQuery]}
            });

        case SearchActions.FETCHED_RESULTS:
            return update(state, {
                searchResults: {$set: action.searchResults}
            });

        case SearchActions.CLEAR_PREVIOUS_SEARCHES:
            return update(state, {
                previousSearches: {$set: new Set()}
            });

        default:
            return state;
    }
}

export default reducer;