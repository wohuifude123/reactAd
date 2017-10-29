import React from 'react'
import { Link } from 'react-router'
import NavLink from './NavLink'

/*
export default createReactClass({
    render() {
        return <div>仍心的789, React Router!</div>
    }
})
*/

/*
export default React.createClass({
    render() {
        return (
            <div>
                <h1>React Router Tutorial</h1>
                <ul role="nav">
                    <li><Link to="/about" activeClassName="active">About</Link></li>
                    <li><Link to="/repos" activeClassName="active">Repos</Link></li>
                </ul>

                {this.props.children}
            </div>
        )
    }
})
*/

import Home from './Home'

/*
export default React.createClass({
    render() {
        return (
            <div>
                <h1>React Router Tutorial</h1>
                <ul role="nav">
                    <li><NavLink to="/about">About</NavLink></li>
                    <li><NavLink to="/repos">Repos</NavLink></li>
                </ul>
                {this.props.children || <Home/>}
            </div>
        )
    }
})
*/

/*
    <Route path="/" component={App}>
        <IndexRoute component={Home}/>

        <Route path="/repos" component={Repos}>
            <Route path="/repos/:userName/:repoName" component={Repo}/>
        </Route>
        <Route path="/about" component={About}/>
    </Route>
 */

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {number: 0};
    }

    handle(){
        const w=window.open('about:blank');
        w.location.href='https://www.baidu.com/'
    }

    render() {
        return (
            <div>
                <h1>React Router Tutorial</h1>
                <div><button onClick={this.handle}>跳转</button></div>
                <ul role="nav">
                    <li><NavLink to="/" onlyActiveOnIndex>Home</NavLink></li>
                    <li><NavLink to="/about">About</NavLink></li>
                    <li><NavLink to="/repos">Repos</NavLink></li>
                </ul>
                {this.props.children}
            </div>

        )
    }
}


export default App;
