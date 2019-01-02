import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore,applyMiddleware,compose,combineReducers } from 'redux';
import  burgerBuilderreducer from './store/reducers/burgerBuilder';
import orderreducer from './store/reducers/order';
import authreducer from './store/reducers/Auth';
import axios from 'axios';
import thunk from 'redux-thunk';

axios.defaults.baseURL = 'http://local.demo1.com/api';
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const rootReducer = combineReducers({
    burgerBuilder : burgerBuilderreducer,
    order : orderreducer,
    auth : authreducer
});


const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(thunk)
));
const app  = (
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
);

ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
