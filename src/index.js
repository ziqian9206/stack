import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import Router from './router'
import { Provider } from 'react-redux'
import store from './redux/store';
//import configureSrore from './redux/store'
// Redux Store对象，管理所有的Redux状态

ReactDOM.render(
    <Provider store={store}>
        <Router />
    </Provider>,
    document.getElementById('root')
);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
