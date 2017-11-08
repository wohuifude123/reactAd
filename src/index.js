import React from 'react'
import { render } from 'react-dom'
import { Router, Route, hashHistory, IndexRoute } from 'react-router'

import App from '../modules/App'
import About from '../modules/About'
import Repos from '../modules/Repos.js'

/*
render((
    <Router history={hashHistory}>
        <Route path="/" component={App}/>
        <Route path="/repos" component={Repos}/>
        <Route path="/about" component={About}/>
    </Router>
), document.getElementById('app'))
*/

/*
render((
    <Router history={hashHistory}>
        <Route path="/" component={App}>
            <Route path="/repos" component={Repos}/>
            <Route path="/about" component={About}/>
        </Route>
    </Router>
), document.getElementById('app'))
*/

import Repo from '../modules/Repo'

/*
render((
    <Router history={hashHistory}>
        <Route path="/" component={App}>
            <Route path="/repos" component={Repos}/>

            <Route path="/repos/:userName/:repoName" component={Repo}/>
            <Route path="/about" component={About}/>
        </Route>
    </Router>
), document.getElementById('app'))

/*
<Route path="/" component={App}>
    <IndexRoute component={Home}/>

    <Route path="/repos" component={Repos}>
        <Route path="/repos/:userName/:repoName" component={Repo}/>
    </Route>
    <Route path="/about" component={About}/>
</Route>

<ul role="nav">
    <li><NavLink to="/" onlyActiveOnIndex>Home</NavLink></li>
    <li><NavLink to="/about">About</NavLink></li>
    <li><NavLink to="/repos">Repos</NavLink></li>
</ul>
 */


/*
import Home from '../modules/Home'

render((
    <Router history={hashHistory}>
        <Route path="/" component={App}>

            <IndexRoute component={Home}/>

            <Route path="/repos" component={Repos}>
                <Route path="/repos/:userName/:repoName" component={Repo}/>
            </Route>
            <Route path="/about" component={About}/>
        </Route>
    </Router>
), document.getElementById('app'))
*/


/*

之前的例子里，我们通过访问 / 进入首页
<Route path="/" component={First}></Route>

但是其实我们 Main.js 这个页面他没有页面内容，我们一开始就进入了First.js

那么如何让我们的Main.js有内容呢

可以使用IndexRoute

先来新建一个模拟的页面

在 Main.js里加入以下内容

<IndexRoute component={Six}/>

实质上他让本来空空的根路径多了一个Six组件

<First>
    <Six/>
</First>

这还不够还需要在 First.js里做一些修改，如下

    {this.props.children || <Six/>}
这使得<Six/>成为了根路由的子组件,它成为父节点的this.props.children



接下来我们来提一下如何做一个返回页，最简单的方式是，写一个路由链过去，这很方便很简单，像这样

<NavLink to="/">To First</NavLink>

官方不推荐我们这么干，因为跳转根路由会丢失一些内容

官方推荐的是精确匹配方式 IndexLink

要是用还是要导包

import { IndexLink } from 'react-router'
然后使用

<IndexLink to="/" activeClassName="active">To First</IndexLink>
就行了

你还记得我们自己封装的<NavLink/>组件吗？

它使用<Link/>实现的，那么就不能使用 IndexLink方式了吗？

答案是可以，加一个属性就行那就是 onlyActiveOnIndex

 */


import ReactDOM from 'react-dom';
import Initialization from './screen/Initialization'

import Welcome from '../components/Welcome/Welcome'

import Root from '../containers/Root'

import TodoList from '../components/TodoList/TodoList.js'

//ReactDOM.render(<Initialization />, document.getElementById('app'));

/*
require('./styles/index.css');//引入css文件
render((
    <TodoList />
), document.getElementById('app'))
*/


import ModalCustom from '../components/AntDesign/ModalCustom'
import Clock from '../components/Clock/Clock'
import ClockRaise from '../components/Clock/ClockRaise'

/*
//对话框
ReactDOM.render(<ModalCustom />,
    document.getElementById('app'))

//定时
render((
    <Clock />
), document.getElementById('app01'))

// 自己点击增加时间
render((
    <ClockRaise />
), document.getElementById('app02'))
*/


/*
import ButtonSize from '../components/AntDesign/ButtonSize'

ReactDOM.render(<ButtonSize />,
    document.getElementById('app'))
*/

/*
import ReduxProvider from '../redux/ReduxProvider.js'

ReactDOM.render(<ReduxProvider />,
    document.getElementById('app'))
*/


/*
import ReduxReddit from '../reddit/ReduxReddit.js'

ReactDOM.render(<ReduxReddit />,
    document.getElementById('app'))
*/

/*
import Parent01 from '../ajax/Parent01.js'

ReactDOM.render(<Parent01 />,
    document.getElementById('app'))
    */


import HomeLayout from '../book/HomeLayout'
ReactDOM.render(<HomeLayout />, document.getElementById('app'));
