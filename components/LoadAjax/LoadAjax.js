import React from 'react';

class Clock extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: false,
            visible: false,
            number: 0,
        }

        this.stopAdd = this.stopAdd.bind(this);


    }

    tick = () => {
        let nextNumber = this.state.number + 1;
        this.setState({ number: nextNumber });
    }

    componentDidMount() {
        this.a = setInterval(()=> this.tick(), 1000);
    }

    stopAdd = () => {
        this.a && clearInterval(this.a);
        this.tick();
    }


    showModal = () => {
        this.setState({
            visible: true,
        });
    }

    handleOk = () => {
        this.setState({ loading: true });
        setTimeout(() => {
            this.setState({ loading: false, visible: false });
        }, 3000);
    }

    render() {
        return (
            element(this.state.number, this.stopAdd)
        );
    }
}
export default Clock;
