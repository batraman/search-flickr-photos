import * as React from 'react';
import { connect } from 'react-redux';
import { constructPhotoURL } from '../utils/axiosInstance';
import { fetchMoreSearchResults } from '../actions/search';
import { Modal, ModalBody } from 'reactstrap';

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