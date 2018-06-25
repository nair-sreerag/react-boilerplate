import React , { Component } from 'react';
import './App.css';


class App extends Component{
    render(){
        return(
            <header id = "banner" style = {{ textAlign : 'center' }}>
                <h1>Hello World</h1>
                <span>This is a React boilerplate... you may start editing this page now!</span>
                <br />
                <span>Good luck on your journey :)</span>
            </header>
        )
    }
}

export default App;