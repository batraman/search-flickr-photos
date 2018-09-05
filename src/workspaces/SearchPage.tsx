import * as React from 'react';
import Header from '../components/Header';
import SearchResults from '../components/SearchResults';

import './SearchPage.css';

class SearchPage extends React.Component {
    render() {
        return (
            <div className="SearchPage">
                <Header />
                <SearchResults />
            </div>
        );
    }
}

export default SearchPage;