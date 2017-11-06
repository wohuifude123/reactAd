import React from 'react';

class ClockRaise extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: false,
            visible: false,
            number: 0,
        }

        this.Add = this.Add.bind(this);
    }

    tick = () => {
        let nextNumber = this.state.number + 1;
        this.setState({ number: nextNumber });
    }

    Add = () => {
        this.tick();
    }

    render() {
        return (
            <div onClick={this.Add}>自己增加时间=={this.state.number}</div>
        );
    }
}
export default ClockRaise;
