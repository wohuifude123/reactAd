/*
 *  功能：标题
 */
import React, { Component } from 'react';
class Header extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {

    }

    render() {
        const { content } = this.props
        return (
            <div id="header">{content}</div>
        );
    }
}

export default Header;
