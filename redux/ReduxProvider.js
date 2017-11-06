import React, { Component } from 'react';
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import todoApp from './reducers'
import App from './components/App'

class ReduxProvider extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: null,
        };
    }

    render() {

        let store = createStore(todoApp)

        return (
            <Provider store={store}>
                <App />
            </Provider>
        )

    }
}

export default ReduxProvider;
