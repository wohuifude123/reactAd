import React from 'react';

class ClockButton extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <button onClick={this.props.clear}>计数：{this.props.value}</button>
        );
    }
}
export default ClockButton;
