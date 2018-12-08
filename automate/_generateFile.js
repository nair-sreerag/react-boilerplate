const fs = require("fs");
const path = require('path')


// globals
global.pathToRoot = process.cwd()
global.pathToSrc = pathToRoot + "\\src"

const args = process.argv.slice(2)

const template = `
import React , { Component } from 'react';
import './${args[0]}Component.css'

const ${args[0]}Component = () =>{
    return (
        //start writing here...
    )
}

export default ${args[0]}Component;
`

function generateComponent() {

    //check if the folder exists...
    if (fs.existsSync(pathToSrc)) {
        //save it in the directory
        fs.writeFile(pathToSrc + `\\${args[0]}Component.js`, template, function (err) {
            if (err) console.error(err)
            //create a css file with the equivalent name
            fs.closeSync(fs.openSync(pathToSrc + `\\${args[0]}Component.css`, 'w'))
        })
    } else {
        //create src and save it in the directory
        fs.mkdir(pathToSrc, function (err) {
            if (err) console.error(err)

            fs.writeFile(pathToSrc + `\\${args[0]}Component.js`, template, function (err) {
                if (err) console.error(err)
                //create a css file with the equivalent name
                fs.closeSync(fs.openSync(pathToSrc + `\\${args[0]}Component.css`, 'w'))
            })
        })
    }


}


generateComponent()