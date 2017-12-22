import React from 'react';
import "./App.css"

import {HashRouter as Router,Route,Link} from "react-router-dom"

import Home from "./components/Home"
import About from "./components/About"
import Login from "./components/Login"

class App extends React.Component {

    render() {
        return (
            <Router>
                <div className="div">
                    <Route path="/home" component={Home}/>
                    <Route path="/about" component={About}/>
                    <Route path="/login" component={Login}/>
                </div>
            </Router>
        );
    }
    // render() {
    //     return <div>Hello World!</div>
    // }
}


export default App
