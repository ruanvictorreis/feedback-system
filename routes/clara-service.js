var fs = require('fs')
var express = require('express');
var router = express.Router();
var PythonShell = require('python-shell')

router.get('/', function (request, response) {
    PythonShell.run('python_modules/clara/clara_run.py', { args: [] }, (err) => {
        if (err) throw err
        //const content = fs.readFileSync(`./attempts/generated/${file}.json`, 'utf8')
        //response.json(content);
    })
    response.send("Hello world!!");
});

module.exports = router;