import update from 'immutability-helper';
import { SearchActions } from '../constants/ActionTypes';

const initialState = {
    searchQuery: '',
    searchResults: [],
    previousSearches: new Set(),
    pageNumber: 1,
    pages: 1,
    isFetching: false
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
                previousSearches: {$add: [action.searchQuery]},
                pageNumber: {$set: action.pageNumber},
                pages: {$set: 1},
                isFetching: {$set: true}
            });

        case SearchActions.FETCH_MORE_RESULTS:
            return update(state, {
                pageNumber: {$set: action.pageNumber},
                isFetching: {$set: true}
            });

        case SearchActions.FETCHED_MORE_RESULTS:
            return update(state, {
                searchResults: {$push: action.searchResults},
                isFetching: {$set: false}
            });

        case SearchActions.FETCHED_RESULTS:
            return update(state, {
                searchResults: {$set: action.searchResults},
                pages: {$set: action.pages},
                isFetching: {$set: false}
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