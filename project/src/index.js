import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from "react-router-dom";
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {addLocaleData} from "react-intl";
import en from 'react-intl/locale-data/en';
import ro from 'react-intl/locale-data/ro';

addLocaleData(en);
addLocaleData(ro);

ReactDOM.render(
    (
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    ),
    document.getElementById('root'));

serviceWorker.unregister();
