import React from 'react';
import ClockButton from './Clock.Button.js';

/*
    bind()方法会创建一个新函数，
    当这个新函数被调用时，它的this值是传递给bind()的第一个参数, 它的参数是bind()的其他参数和其原本的参数

    创建绑定函数

    bind() 最简单的用法是创建一个函数，使这个函数不论怎么调用都有同样的 this 值。
    JavaScript新手经常犯的一个错误是将一个方法从对象中拿出来，然后再调用，
    希望方法中的 this 是原来的对象。（比如在回调中传入这个方法）
    如果不做特殊处理的话，一般会丢失原来的对象。
    从原来的函数和原来的对象创建一个绑定函数，则能很漂亮地解决这个问题
 */

const element =(enumber, stopAdd) => (
    <div>
        <ClockButton clear={stopAdd} value={enumber}/>
        <h1>自己写的定时组件</h1>
        <h2>我的时间是{enumber}</h2>
    </div>
);


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
