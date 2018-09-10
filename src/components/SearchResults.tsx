import * as React from 'react';
import { connect } from 'react-redux';
import { constructPhotoURL } from '../utils/axiosInstance';
import { fetchMoreSearchResults } from '../actions/search';
import { Modal, ModalBody } from 'reactstrap';
import Masonry from 'react-masonry-component';

const masonryOptions = {
    transitionDuration: 0
};

// Fix definitions file
const InfiniteScroll = require('react-infinite-scroller');

import './SearchResults.css';

interface MapStateToProps {
    searchResults: any[];
    pages: number;
    pageNumber: number;
    isFetching: boolean;
    searchQuery: string;
}

interface MapDispatchToProps extends MapStateToProps {
    fetchMoreSearchResultsDispatch: () => void;
}

interface Props extends MapDispatchToProps {}

interface State {
    isImageModalOpen: boolean;
    activeSearchResult: any;
}

class SearchResults extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            isImageModalOpen: false,
            activeSearchResult: null
        };
    }
    render() {
        const { pages, pageNumber, isFetching, searchQuery, searchResults } = this.props;
        if (!searchQuery) {
            return (
                <div className="BeginSearch">
                    Type in a query and press enter to begin search...
                </div>
            );
        }
        if (searchQuery && !isFetching && !searchResults.length) {
            return (
                <div className="EmptySearch">
                    No Results Found
                </div>
            );
        }
        return (
            <div className="SearchResults">
                <InfiniteScroll
                    loadMore={this.loadMoreImages}
                    hasMore={!isFetching && (pages > pageNumber)}
                    initialLoad={false}
                >
                <Masonry
                    className="SearchResults__images" // default ''
                    options={masonryOptions} // default {}
                    disableImagesLoaded={false} // default false
                    updateOnEachImageLoad={false} // default false and works only if disableImagesLoaded is false
                >
                    {this.renderSearchResults()}
                </Masonry>
                </InfiniteScroll>
                <Modal isOpen={this.state.isImageModalOpen} toggle={this.toggleModalState}>
                    <ModalBody className="Modal__body">
                        {this.renderModalBody()}
                    </ModalBody>
                </Modal>
            </div>
        );
    }
    renderModalBody = () => {
        const { activeSearchResult } = this.state;
        if (!activeSearchResult) {
            return null;
        }
        return (
            <React.Fragment>
                <img 
                    src={constructPhotoURL({
                        farm: activeSearchResult.farm,
                        server: activeSearchResult.server,
                        id: activeSearchResult.id,
                        secret: activeSearchResult.secret
                    })} 
                />
                <div className="Modal__imageTitle">{activeSearchResult.title}</div>
            </React.Fragment>
        );
    }
    toggleModalState = () => {
        this.setState((prevState) => {
            return {
                isImageModalOpen: !prevState.isImageModalOpen
            };
        });
    }
    // This component sucks need to delay isFetching to make it work fine when scrolling too fast
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
                <div 
                    className="SearchResult" 
                    key={`${searchResult.id}-${searchResult.secret}`} 
                    onClick={(e) => { this.setState({
                        isImageModalOpen: true,
                        activeSearchResult: searchResult
                    }); }}
                >
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
    const { searchResults, pages, pageNumber, isFetching, searchQuery } = state.search;
    return {
        searchResults,
        pages,
        pageNumber,
        isFetching,
        searchQuery
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