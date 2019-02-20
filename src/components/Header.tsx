import * as React from 'react';
import SearchComponent from './SearchComponent';

import './Header.scss';

class Header extends React.Component {
    render () {
        return (
            <div className="Header">
                <div className="Header__content">
                    <h1 className="Header__title">Search Photos</h1>
                    <SearchComponent />
                </div>
            </div>
        );
    }
}

export default Header;