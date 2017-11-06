import React, { Component } from 'react';

class Welcome extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: null,
        };
    }

    render() {
        return <div className="square" onClick={() => alert('click')}>
            {this.props.value01}
        </div>
    }
}

export default Welcome;
