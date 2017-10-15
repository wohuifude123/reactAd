import React from 'react'
import { Link } from 'react-router'

// <Link to="/about" activeClassName="active">About</Link>
/*
    <Todo {...todo} key = {index} />
    <Todo text={todo.text} completed={todo.completed} key = {index} />
 */
export default React.createClass({
    render() {
        return <Link {...this.props} activeClassName="active"/>
    }
})
