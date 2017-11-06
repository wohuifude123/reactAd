import React, { Component } from 'react'

import EchartsTest01 from '../components/EchartsTest01/EchartsTest01';
import Advertise from '../components/Advertise/Advertise';

export default class Bar extends Component {
    render() {
        return (
            <div id="bar_adv">
                <EchartsTest01 />
                <Advertise />
            </div>
        )
    }
}
