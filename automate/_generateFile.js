const fs = require("fs");
const path = require('path')
const chalk = require("chalk")


let os = process.platform

let writeFilePath = undefined
let openSyncPath = undefined


try {

    var args = process.argv.slice(2)
    let permissibleArgs = [
        "no-css"
    ]


    //to check whether to create a component inside a folder called 'components'
    let isComponentCall = false;
    let generateCSS = true

    if (args[0] == "component") isComponentCall = true

    if (args.includes("no-css")) generateCSS = false


    // component type is specified but not the name
    if (isComponentCall && !args[1]) throw new Error("Please specify a component name.")

    // just to generate a simple file
    // if (!isComponentCall && args[1]) throw new Error("Please use the 'component' keyword to generate a component template or just enter the filename to generate a React file.")

    if (!isComponentCall && args.length > 1 && args.slice(1).some(function(a){
        return !permissibleArgs.includes(a)
    })) 
    throw new Error("Please enter the correct flags.")

    switch (os) {

        //Mac
        case 'darwin':
            // ??
            break;

        //windows - even for 64bit
        case 'win32':
            global.pathToRoot = process.cwd()
            global.pathToSaveComponent = pathToRoot + (isComponentCall ? "\\src\\components" : "\\src")
            // global.pathToComponent = pathToRoot + `\\component\\${args[1]}`
            writeFilePath = pathToSaveComponent + `\\${isComponentCall ? args[1] : args[0] + "Component"}.js`
            openSyncPath = pathToSaveComponent + `\\${isComponentCall ? args[1] : args[0] + "Component"}.css`
            break;

        case 'linux':
            global.pathToRoot = process.cwd()
            global.pathToSaveComponent = pathToRoot + (isComponentCall ? "/src/components" : "/src")
            // global.pathToComponent = pathToRoot + `/component/${args[1]}`
            writeFilePath = pathToSaveComponent + `/${isComponentCall ? args[1] : args[0] + "Component"}.js`
            openSyncPath = pathToSaveComponent + `/${isComponentCall ? args[1] : args[0] + "Component"}.css`
            break;

        case 'freebsd':
            break;

        case 'sunos':
            break;

        default:
            throw new Error("Some unidentified OS found!")

    }


    const template = isComponentCall
        ?
        `
import React from 'react';
${generateCSS ? `import './${args[1]}.css'` : ''}
        
export default class ${args[1]} extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            // enter state variables
        }
    }

    render() {
        return (
            //start writing here...
            <span>${args[1]} has been generated!</span>
        )
    }
}
        
        `
        :
        `
import React, { Component } from 'react';
${generateCSS ? `import './${args[0]}Component.css'` : ''}

const ${args[0]}Component = () => {
    return (
        //start writing here...
        <span>${args[0]}Component has been generated!</span>
    )
}

export default ${args[0]}Component;
        `



    function generateComponent() {

        //check if the folder exists...
        if (fs.existsSync(pathToSaveComponent)) {
            //save it in the directory
            fs.writeFile(writeFilePath, template, function (err) {
                if (err) console.error(err)
                //create a css file with the equivalent name

                if (generateCSS) fs.closeSync(fs.openSync(openSyncPath, 'w'))
            })
        } else {
            //create src or component and save it in the directory
            fs.mkdir(pathToSaveComponent, function (err) {
                if (err) console.error(err)

                fs.writeFile(writeFilePath, template, function (err) {
                    if (err) console.error(err)
                    //create a css file with the equivalent name

                    if (generateCSS) fs.closeSync(fs.openSync(openSyncPath, 'w'))
                })
            })
        }


    }

    generateComponent(generateCSS)

}
catch (err) {
    console.error(chalk.red(err))
}
