import React , { Component } from 'react';
import './App.css';
import logo from './logo.svg'

class App extends Component{
    render(){
        return(
            <header className = "banner" style = {{ textAlign : 'center' }}>
                <h1>Hello World</h1>
                <span>This is a React boilerplate... you may start editing this page now!</span>
                <br />
                <span>Good luck on your journey :)</span>
                <br />
                <img className = "react_logo" src = { logo } alt = "react-logo" />
            </header>
        )
    }
}

export default App;