import * as React from 'react';
import { Input } from 'reactstrap';
import { connect } from 'react-redux';

import { fetchSearchResults } from '../actions/search';

interface MapDispatchToProps {
    fetchSearchResultsDispatch: (query: string) => void;
}

interface Props extends MapDispatchToProps {

}

class SearchComponent extends React.Component<Props, {}> {
    render() {
        return (
            <div className="SearchComponent">
                <Input 
                    type="text" 
                    name="search" 
                    id="searchBox" 
                    placeholder="Search..." 
                    onKeyDown={this.handleKeyDown} 
                />
            </div>
        );
    }
    handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        const { fetchSearchResultsDispatch } = this.props;
        if (e.keyCode === 13) {
            fetchSearchResultsDispatch((e.target as HTMLInputElement).value);
        }
    }
}

function mapStateToProps () {
    return {

    };
}

function mapDispatchToProps (dispatch: Function) {
    return {
        fetchSearchResultsDispatch: (searchQuery: string) => {
            dispatch(fetchSearchResults(searchQuery));
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchComponent);