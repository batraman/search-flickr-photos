import update from 'immutability-helper';
import { SearchActions } from '../constants/ActionTypes';

const initialState = {
    searchQuery: '',
    searchResults: []
};

function reducer(state: any = initialState, action: any) {
    switch (action.type) {
        case SearchActions.FETCH_RESULTS:
            return update(state, {
                searchQuery: {$set: action.searchQuery}
            });

        case SearchActions.FETCHED_RESULTS:
            return update(state, {
                searchResults: {$set: action.searchResults}
            });

        default:
            return state;
    }
}

export default reducer;