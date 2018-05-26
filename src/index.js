import React from 'react';
import ReactDOM from 'react-dom';
import './components/css/index.css';
import { Provider } from 'react-redux';
import configStore from './redux/store'
import App from './components/App';
// import registerServiceWorker from './registerServiceWorker';
const store = configStore();
ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>, 
    document.getElementById('root'));
// registerServiceWorker();
