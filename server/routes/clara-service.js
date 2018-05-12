var fs = require('fs')
var express = require('express');
var router = express.Router();
var PythonShell = require('python-shell');

router.post('/', function (request, response) {
  const attempt = request.body;
  const register = attempt.register;
  const assignment = attempt.assignment;
  const feedtype = attempt.feedtype;
  const parameters = attempt.parameters;
  const student_code = attempt.student_code;
  
  args = [feedtype, register, assignment, parameters, student_code];
  
  PythonShell.run('./python_modules/clara/clara_run.py', { args: args }, (err) => {
    if (err) throw err
    file_name = register + '.py';
    repair_path = `./python_modules/clara/repairs/${assignment}/${file_name}`;
    const content = fs.readFileSync(repair_path, 'utf8');
    response.send(content);
  })
});

module.exports = router;
