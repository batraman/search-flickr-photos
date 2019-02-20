import * as React from 'react';
import Header from '../components/Header';
import { connect } from 'react-redux';
import { lookupPreviousSearches } from '../actions/search';

import SearchResults from '../components/SearchResults';

import './SearchPage.scss';

interface MapDispatchToProps {
    lookupPreviousSearchesDispatch: () => void;
}

interface Props extends MapDispatchToProps {
    
}

class SearchPage extends React.Component<Props, {}> {
    componentDidMount() {
        const { lookupPreviousSearchesDispatch } = this.props;
        lookupPreviousSearchesDispatch();
    }
    render() {
        return (
            <div className="SearchPage">
                <Header />
                <SearchResults />
            </div>
        );
    }
}

function mapStateToProps () {
    return {};
}

function mapDispatchToProps(dispatch: Function) {
    return {
        lookupPreviousSearchesDispatch: () => {
            dispatch(lookupPreviousSearches());
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage);