import * as React from 'react';
import { connect } from 'react-redux';
import { constructPhotoURL } from '../utils/axiosInstance';
import { fetchMoreSearchResults } from '../actions/search';
// Fix definitions file
const InfiniteScroll = require('react-infinite-scroller');

import './SearchResults.css';

interface MapStateToProps {
    searchResults: any[];
    pages: number;
    pageNumber: number;
    isFetching: boolean;
}

interface MapDispatchToProps extends MapStateToProps {
    fetchMoreSearchResultsDispatch: () => void;
}

interface Props extends MapDispatchToProps {}

class SearchResults extends React.Component<Props, {}> {
    render() {
        const { pages, pageNumber, isFetching } = this.props;
        return (
            <div className="SearchResults">
                <InfiniteScroll
                    loadMore={this.loadMoreImages}
                    hasMore={!isFetching && (pages > pageNumber)}
                    initialLoad={false}
                >
                <div className="SearchResults__images">
                    {this.renderSearchResults()}
                </div>
                </InfiniteScroll>
            </div>
        );
    }
    // This component sucks need to delay isFetching to make it work fine
    loadMoreImages = () => {
        const { fetchMoreSearchResultsDispatch } = this.props;
        fetchMoreSearchResultsDispatch();
    }
    renderSearchResults = () => {
        const { searchResults } = this.props;
        if (!searchResults || !searchResults.length) {
            return null;
        }
        return searchResults.map((searchResult: any) => {
            return (
                <div className="SearchResult" key={`${searchResult.id}-${searchResult.secret}`}>
                    <img 
                        src={constructPhotoURL({
                            farm: searchResult.farm,
                            server: searchResult.server,
                            id: searchResult.id,
                            secret: searchResult.secret
                        })} 
                    />
                </div>
            );
        });
    }
}

function mapStateToProps (state: any) {
    const { searchResults, pages, pageNumber, isFetching } = state.search;
    return {
        searchResults,
        pages,
        pageNumber,
        isFetching
    };
}

function mapDispatchToProps (dispatch: Function ) {
    return {
        fetchMoreSearchResultsDispatch: () => {
            dispatch(fetchMoreSearchResults());
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchResults);