import React , { Component } from 'react';

class Test extends Component{
    render(){
        return(
            <div style = {{ textAlign : 'center' }}>
                <h1 className = "hello">Hello World</h1>
                <span>This is a React boilerplate... you may start editing now!</span>
                <br />
                <span>Good luck on your journey :)</span>
            </div>
        )
    }
}

export default Test;