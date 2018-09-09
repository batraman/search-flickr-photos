import * as React from 'react';
import { Input, Button } from 'reactstrap';
import { connect } from 'react-redux';

import { fetchSearchResults, clearPreviousSearches } from '../actions/search';

import './SearchComponent.css';

interface MapDispatchToProps {
    fetchSearchResultsDispatch: (query: string) => void;
    clearResultsDispatch: () => void;
}

interface Props extends MapDispatchToProps {
    previousSearches: any;
}

interface State {
    query: string;
}

class SearchComponent extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            query: ''
        };
    }
    render() {
        return (
            <div className="SearchComponent">
                <Input 
                    type="text" 
                    name="search" 
                    id="searchBox" 
                    placeholder="Search..." 
                    onKeyDown={this.handleKeyDown}
                    autoComplete="off"
                    onInput={this.handleInput}
                    className="SearchComponent__input"
                    value={this.state.query}
                />
                {this.renderPreviousSearches()}
            </div>
        );
    }
    handleInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
        this.setState({
            query: (e.target as HTMLInputElement).value
        });
    }
    handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        const { fetchSearchResultsDispatch } = this.props;
        const query = (e.target as HTMLInputElement).value;
        if (e.keyCode === 13 && query.length) {
            fetchSearchResultsDispatch(query);
            (e.target as HTMLInputElement).blur();
        }
    }
    searchPreviousQuery = (query: string) => {
        console.log(query);
        const { fetchSearchResultsDispatch } = this.props;
        this.setState({
            query
        });
        fetchSearchResultsDispatch(query);
        (document as any).querySelector('.SearchComponent__input').blur();
    }
    renderPreviousSearches = () => {
        // Consider if a sort function is needed
        const { previousSearches, clearResultsDispatch } = this.props;
        const { query } = this.state;
        if (!query.length || !previousSearches.size) {
            return null;
        }
        let previousSearchesMatchingQuery: any = [];
        previousSearches.forEach((previousSearch: string) => {
            if (previousSearch.toLowerCase().indexOf(query.toLowerCase()) !== -1) {
                previousSearchesMatchingQuery.push(previousSearch);
            }
        });
        if (!previousSearchesMatchingQuery.length) {
            return null;
        }
        previousSearchesMatchingQuery = previousSearchesMatchingQuery.map((previousSearch: string) => {
            // Add keyboard actions
            // Improve click behavior too
            return (
                <div 
                    className="SearchComponent__result" 
                    key={previousSearch} 
                    onClick={() => { this.searchPreviousQuery(previousSearch); }}
                >
                    {previousSearch}
                </div>
            );
        });
        return (
            <div className="SearchComponent__results">
                {previousSearchesMatchingQuery}
                <div className="SearchComponent__clearResults">
                    <Button type="primary" key={-1} onClick={clearResultsDispatch}>Clear Results</Button>
                </div>
            </div>
        );
    }
}

function mapStateToProps (state: any) {
    const { previousSearches } = state.search;
    return {
        previousSearches
    };
}

function mapDispatchToProps (dispatch: Function) {
    return {
        fetchSearchResultsDispatch: (searchQuery: string) => {
            dispatch(fetchSearchResults(searchQuery));
        },
        clearResultsDispatch: () => {
            dispatch(clearPreviousSearches());
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchComponent);