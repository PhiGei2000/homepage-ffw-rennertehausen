#!/usr/bin/node
const fs = require("fs");
const path = require("path");

const workspaceDir = path.dirname(`${__dirname}`);
const buildDir = path.join(workspaceDir, "build");

const excludes = fs.readFileSync(`${workspaceDir}/.exclude`, 'utf-8').split(/\r?\n/).map((val) => val.replaceAll('/', '\\'));
excludes.push(".exclude", "build");

function buildFile(filename) {
    console.log("Building file: " + filename);
    let fullPath = path.join(workspaceDir, filename);
    let dest = path.join(buildDir, filename);    

    let content = fs.readFileSync(fullPath, 'utf-8');
    const regexp = /<!--\s?#include file="(?<path>(\w|\/|\.)+)"\s?-->/dg;

    const results = content.matchAll(regexp);
    for (const result of results) {
        const includedFileContent = fs.readFileSync(path.join(workspaceDir, result.groups['path']), 'utf-8');

        content = content.replace(result[0], includedFileContent);
    }

    fs.writeFileSync(dest, content);
}

function buildDirectory(dirname) {
    fs.readdirSync(dirname).forEach((filename, index, files) => {
        var fullPath = path.join(dirname, filename);
        var relPath = path.relative(workspaceDir, fullPath);        

        var exclude = excludes.map((value) => relPath.includes(value)).findIndex((val) => val) != -1;

        if (!exclude) {            
            if (fs.lstatSync(fullPath).isDirectory()) {
                const buildDirPath = path.join(buildDir, relPath);
                if (!fs.existsSync(buildDirPath)) {
                    fs.mkdirSync(buildDirPath)
                }

                buildDirectory(fullPath)
            }
            else {
                buildFile(relPath);
            }
        }
    });
}

if (!fs.existsSync(buildDir)) {
    fs.mkdir(buildDir, { recursive: false }, (err) => { throw err; })
}

if (process.argv[2]) {
    let fullPath = path.join(workspaceDir, process.argv[2])    

    if (fs.lstatSync(fullPath).isDirectory()) {    
        buildDirectory(fullPath)
    }
    else {
        buildFile(process.argv[2]);
    }

}
else {
    buildDirectory(`${workspaceDir}/.`);
}





