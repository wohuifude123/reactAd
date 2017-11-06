import React, { Component } from 'react';

class Todo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: null,
        };
    }

    render() {
        return <div className="square" onClick={() => alert('click')}>
            {this.props.value+'==='+this.props.adhere}
        </div>
    }
}

export default Todo;
