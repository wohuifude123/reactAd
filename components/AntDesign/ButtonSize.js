import { Button, Radio, Icon } from 'antd';
import React, { Component } from 'react';

class ButtonSize extends React.Component {
    state = {
        size: "large",
    };

    handleSizeChange = (e) => {
        this.setState({ size: e.target.value });
    }

    render() {
        const size = this.state.size;
        return (
            <div>

                <Button type="primary" shape="circle" size={size}>3</Button>
                <br />
                <Button type="primary" size={size}>下载</Button>

            </div>
        );
    }
}


export default ButtonSize;

