import React, { Component } from 'react'

import Header from '../components/Header/Header';

import Bar from './Bar';



export default class Root extends Component {
    render() {
        return (
            <div id="whole">
                <Header content="图示"/>
                <Bar />
            </div>
        )
    }
}
