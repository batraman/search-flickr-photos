import * as React from 'react';
import { connect } from 'react-redux';
import { constructPhotoURL } from '../utils/axiosInstance';

import './SearchResults.css';

interface MapStateToProps {
    searchResults: any[];
}

interface Props extends MapStateToProps {}

class SearchResults extends React.Component<Props, {}> {
    render() {
        return (
            <div className="SearchResults">
                <div className="SearchResults__images">
                    {this.renderSearchResults()}
                </div>
            </div>
        );
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
    const { searchResults } = state.search;
    return {
        searchResults
    };
}

export default connect(mapStateToProps)(SearchResults);