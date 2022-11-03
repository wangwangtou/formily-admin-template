const chokidar = require('chokidar');
const ejs = require('ejs');
const { resolve, dirname } = require('path');
const { readFileSync, writeFileSync, existsSync, mkdirSync } = require('fs');

const templatePath = resolve(__dirname, './template.ejs');
const sourceDir = resolve(__dirname, '../../formily');
const targetDir = resolve(__dirname, '../src');

const toTarget = function(source) {
  return source.replace(sourceDir, targetDir)
}

let templateFn = ejs.compile(readFileSync(templatePath).toString())

const templateFile = async function(source) {
  try {
    const data = await import('file://' + source)
    const targetStr = templateFn(data)
    const targetFile = toTarget(source)
    !existsSync(dirname(targetFile)) && mkdirSync(dirname(targetFile), { recursive: true })
    writeFileSync(targetFile, targetStr)
  } catch (e) {
    console.log(e);
  }
}

const templateAll = function(source) {
  
}

chokidar.watch([
  sourceDir,
  templatePath
], {
  ignored: [
    /views\/index\.js/,
    /package\.json/,
    /index\.d\.ts/
  ],
  ignoreInitial: false
}).on('all', (event, path) => {
  if (event === 'change' || event === 'add') {
    if (path == templatePath) {
      templateFn = ejs.compile(readFileSync(templatePath).toString())
      templateAll(sourceDir)
    } else {
      templateFile(path)
    }
  }
});
