var fs = require('fs');
var express = require('express');
var router = express.Router();
var PythonShell = require('python-shell');

router.post('/', function (request, response) {
    const attempt = request.body;
    const register = attempt.register;
    const assignment = attempt.assignment;
    const studentCode = attempt.studentCode;

    PythonShell.run('python_src/function_template.py', { args: [register, assignment, studentCode] }, (err) => {
        if (err) throw err
        const content = fs.readFileSync(`./assignments/${assignment}/asserts/${register}.py`, 'utf8')
        response.json(content);
      })
  });
  

module.exports = router;