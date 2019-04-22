const fs = require("fs");
const path = require('path')



let os = process.platform

let writeFilePath = undefined
let openSyncPath = undefined


const args = process.argv.slice(2)

switch (os) {

    //Mac
    case 'darwin':
        // ??
        break;

    //windows - even for 64bit
    case 'win32':
        global.pathToRoot = process.cwd()
        global.pathToSrc = pathToRoot + "\\src"
        writeFilePath = pathToSrc + `\\${args[0]}Component.js`
        openSyncPath = pathToSrc + `\\${args[0]}Component.css`
        break;

    case 'linux':
        global.pathToRoot = process.cwd()
        global.pathToSrc = pathToRoot + "/src"
        writeFilePath = pathToSrc + `/${args[0]}Component.js`
        openSyncPath = pathToSrc + `/${args[0]}Component.css`
        break;

    case 'freebsd':
        break;

    case 'sunos':
        break;

    default:
        throw new Error("Some unidentified OS found!")

}

const template = `
import React , { Component } from 'react';
import './${args[0]}Component.css'

const ${args[0]}Component = () =>{
    return (
        //start writing here...
        <span>${args[0]}Component has been generated!</span>
    )
}

export default ${args[0]}Component;
`

function generateComponent() {

    //check if the folder exists...
    if (fs.existsSync(pathToSrc)) {
        //save it in the directory
        fs.writeFile(writeFilePath, template, function (err) {
            if (err) console.error(err)
            //create a css file with the equivalent name
            fs.closeSync(fs.openSync(openSyncPath, 'w'))
        })
    } else {
        //create src and save it in the directory
        fs.mkdir(pathToSrc, function (err) {
            if (err) console.error(err)

            fs.writeFile(writeFilePath, template, function (err) {
                if (err) console.error(err)
                //create a css file with the equivalent name
                fs.closeSync(fs.openSync(openSyncPath, 'w'))
            })
        })
    }


}


generateComponent()