var fs = require('fs');
var express = require('express');
var router = express.Router();
var PythonShell = require('python-shell');
var Assert = require('../javascript_src/assert.js');

router.post('/', function (request, response) {
  const attempt = request.body;
  const register = attempt.register;
  const assignment = attempt.assignment;
  const studentCode = attempt.studentCode;

  const feedtype = 'synthesis';
  const parameters = getInputParameters(assignment);

  args = [feedtype, register, assignment, parameters, studentCode];

  PythonShell.run('./python_src/clara/clara_run.py', { args: args }, (error) => {
    if (error) {
      console.log(err.message);
    }

    file_name = register + '.py';
    repair_path = `./assignments/${assignment}/repairs/${file_name}`;

    var result = attempt;
    result.repair = fs.readFileSync(repair_path, 'utf8');
    
    const assert = new Assert(register, assignment, result.repair);
    const assertFile = assert.createFile();

    PythonShell.run(assertFile, { args: [] }, (error) => {
      if (error) {
        assert.errorAnalysis(error);
      }

      result.repaired = assert.isCorrect
      response.json(result);
    });
  })
});

function getInputParameters(assignment) {
  const inputPath = `./assignments/${assignment}/input`;
  return fs.readFileSync(inputPath, 'utf8').trim();
}

module.exports = router;
