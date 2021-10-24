import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import NotificationsContextProvider from './contexts/NotificationsContext'

ReactDOM.render(
    <NotificationsContextProvider>
        <App />
    </NotificationsContextProvider>, document.getElementById('root'))
