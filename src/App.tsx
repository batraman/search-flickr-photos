import * as React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';

import SearchPage from './workspaces/SearchPage';
import PageNotFound from './components/PageNotFound';

import search from './reducers/search';

import 'bootstrap/dist/css/bootstrap.css';
import './App.scss';

const middlewares = [thunk];

const loggableEnv = [
  `development`
];

const nodeEnv = process.env.NODE_ENV || 'development';

if (loggableEnv.indexOf(nodeEnv) !== -1) {
  const {createLogger} = require('redux-logger');
  const logger = createLogger();
  middlewares.push(logger);
}

const store = createStore(combineReducers({search}), applyMiddleware(...middlewares));

class App extends React.Component {
  render() {  
    return (
        <Provider store={store}>
              <BrowserRouter>
                <Switch>
                    <Route exact={true} path="/" component={SearchPage} />
                    <Route component={PageNotFound} />
                </Switch>
            </BrowserRouter>
        </Provider>
    );
  }
}

export default App;
