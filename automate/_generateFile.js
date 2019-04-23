const fs = require("fs");
const path = require('path')
const chalk = require("chalk")


let os = process.platform

let writeFilePath = undefined
let openSyncPath = undefined


try {

    var args = process.argv.slice(2)
    let isComponentCall = false;

    if (args[0] == "component") isComponentCall = true

    // component type is specified but not the name
    if (isComponentCall && !args[1]) throw new Error("Please specify a component name.")

    // if everything is valid for component generation
    else if (isComponentCall && args[1]) {
        console.log("Component call!!!!!")
    }
    // just to generate a simple file
    else if (!isComponentCall && args[1]) throw new Error("Please use the 'component' keyword to generate a component template or just enter the filename to generate a React file.")


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
            writeFilePath = pathToSaveComponent + `\\${isComponentCall ? args[1] : args[0]}Component.js`
            openSyncPath = pathToSaveComponent + `\\${isComponentCall ? args[1] : args[0]}Component.css`
            break;

        case 'linux':
            global.pathToRoot = process.cwd()
            global.pathToSaveComponent = pathToRoot + (isComponentCall ? "/src/components" : "/src")
            // global.pathToComponent = pathToRoot + `/component/${args[1]}`
            writeFilePath = pathToSaveComponent + `/${isComponentCall ? args[1] : args[0]}Component.js`
            openSyncPath = pathToSaveComponent + `/${isComponentCall ? args[1] : args[0]}Component.css`
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

        console.log(`global.pathToRoot : ${global.pathToRoot},
                     global.pathToSaveComponent : ${global.pathToSaveComponent},
                     writeFilePath : ${writeFilePath},
                     openSyncPath : ${openSyncPath}`)


        //check if the folder exists...
        if (fs.existsSync(pathToSaveComponent)) {
            //save it in the directory
            fs.writeFile(writeFilePath, template, function (err) {
                if (err) console.error(err)
                //create a css file with the equivalent name
                fs.closeSync(fs.openSync(openSyncPath, 'w'))
            })
        } else {
            console.log("Doesnt exist")
            //create src or component and save it in the directory
            fs.mkdir(pathToSaveComponent, function (err) {
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

}
catch (err) {
    console.error(chalk.red(err.message))
}