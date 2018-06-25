import React , { Component } from 'react';
import './Test.css';


class Test extends Component{
    render(){
        return(
            <div style = {{ textAlign : 'center' }}>
                <h1>Hello World</h1>
                <span>This is a React boilerplate... you may start editing now!</span>
                <br />
                <span>Good luck on your journey :)</span>
            </div>
        )
    }
}

export default Test;