import 'babel-polyfill'

import React from 'react'
import { render } from 'react-dom'
import Root from './containers/Root'


/**
 * Redux Async Actions
 */

class ReduxReddit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: null,
        };
    }

    render() {
        return (
            <Root />
        )
    }
}

export default ReduxReddit;
