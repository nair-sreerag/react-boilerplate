import React from 'react';
import ReactDOM from 'react-dom';
import Test from './Test'

ReactDOM.render(
     React.createElement("h1",null,"Hello world"),                  
    //<Test />,                //<-- name of thr test app
    document.getElementById("root")
);