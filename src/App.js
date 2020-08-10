import React, { Component } from "react";
import { hot } from 'react-hot-loader/root';
import { Route, Switch, NavLink } from 'react-router-dom';

import SignIn from "./signin/SignIn"
import SignUp from "./signup/SignUp"

const App = () => (
    <div className='app'>
        <h1>React Router Demo</h1>
        <Navigation />
        <Main />
    </div>
);

const Navigation = () => (
    <nav>
        <ul>
            <li><NavLink activeClassName="current" to='/'>Home</NavLink></li>
            <li><NavLink activeClassName="current" to='/signin'>Sign In</NavLink></li>
            <li><NavLink activeClassName="current" to='/signup'>Sign Up</NavLink></li>
        </ul>
    </nav>
);

const Main = () => (
    <Switch>
        <Route exact path='/' component={Home}></Route>
        <Route exact path='/signin' component={SignIn}></Route>
        <Route exact path='/signup' component={SignUp}></Route>
    </Switch>
);

const Home = () => (
    <div className='home'>
        <h1>sssWelcome to my portfolio website</h1>
        <p> Feel free to browse around and learn more about me.</p>
    </div>
);



export default hot(App);