var fs = require('fs')
var express = require('express');
var router = express.Router();
var PythonShell = require('python-shell');

router.post('/', function (request, response) {
  const attempt = request.body;
  const register = attempt.register;
  const assignment = attempt.assignment;
  const studentCode = attempt.studentCode;

  const feedtype = 'synthesis';
  const parameters = getInputParameters(assignment);

  args = [feedtype, register, assignment, parameters, studentCode];

  PythonShell.run('./python_modules/clara/clara_run.py', { args: args }, (err) => {
    if (err) throw err
    file_name = register + '.py';
    repair_path = `./python_modules/clara/repairs/${assignment}/${file_name}`;
    const content = fs.readFileSync(repair_path, 'utf8');
    response.send(content);
  })
});

function getInputParameters(assignment) {
  const inputPath = `./assignments/${assignment}/input`;
  return fs.readFileSync(inputPath, 'utf8').trim();
}

module.exports = router;
