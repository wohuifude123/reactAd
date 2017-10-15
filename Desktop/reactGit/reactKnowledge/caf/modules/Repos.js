import React from 'react'
let createReactClass = require('create-react-class');
import { Link } from 'react-router'
/*
export default createReactClass({
    render() {
        return <div>没有女人的男人</div>
    }
})
*/


/*
export default React.createClass({
    render() {
        return (
            <div>
                <h2>Repos</h2>


                <ul>
                    <li><Link to="/repos/reactjs/react-router">React Router</Link></li>
                    <li><Link to="/repos/facebook/react">React</Link></li>
                </ul>

                {this.props.children}
            </div>
        )
    }
})
*/
import NavLink from './NavLink'
export default React.createClass({
    render() {
        return (
            <div>
                <h2>Repos</h2>
                <ul>
                    <li><NavLink to="/repos/reactjs/react-router">React Router</NavLink></li>
                    <li><NavLink to="/repos/facebook/react">React</NavLink></li>
                </ul>
                {this.props.children}
            </div>
        )
    }
})



