var fs = require('fs');
var express = require('express');
var router = express.Router();
var PythonShell = require('python-shell');
var Assert = require('../javascript_src/assert.js');

router.post('/python/', function (request, response) {
  const attempt = request.body;
  const register = attempt.register;
  const assignment = attempt.assignment;
  const studentCode = attempt.studentCode;
  const parameters = getInputParameters(assignment);

  var result = attempt;
  var feedPython = 'python';

  var args = [feedPython, register, assignment, parameters, studentCode];

  PythonShell.run('./python_src/clara/clara_run.py', { args: args }, (error) => {
    if (error) {
      console.log('deu error')
      console.log(error)
      result.repairs = [];
      result.isRepaired = false;
      response.json(result);
      return;
    }

    console.log('nao deu erro')

    var fileName = register + '.py';
    var repairPath = `./assignments/${assignment}/repairs/${fileName}`;
    result.repairs = fs.readFileSync(repairPath, 'utf8').trim().split('\n');
    result.isRepaired = true;

    response.json(result);
  });
});

router.post('/synthesis/', function (request, response) {
  const attempt = request.body;
  const register = attempt.register;
  const assignment = attempt.assignment;
  const studentCode = attempt.studentCode;
  const parameters = getInputParameters(assignment);

  var result = attempt;
  var feedSynthesis = 'synthesis';

  var args = [feedSynthesis, register, assignment, parameters, studentCode];

  PythonShell.run('./python_src/clara/clara_run.py', { args: args }, (error) => {
    if (error) {
      console.log(error.message)
      result.codeRepaired = '';
      result.isCodeRepaired = false;
      response.json(result);
      return;
    }

    var fileName = register + '.py';
    var repairPath = `./assignments/${assignment}/repairs/${fileName}`;
    result.codeRepaired = fs.readFileSync(repairPath, 'utf8');
    result.isCodeRepaired = true;

    const assert = new Assert(register, assignment, result.codeRepaired);
    const assertFile = assert.createFile();

    PythonShell.run(assertFile, { args: [] }, (error) => {
      if (error) {
        assert.errorAnalysis(error);
      }

      result.isCodeRepaired = assert.isCorrect
      response.json(result);
    });
  });
});

function getInputParameters(assignment) {
  const inputPath = `./assignments/${assignment}/input`;
  return fs.readFileSync(inputPath, 'utf8').trim();
}

module.exports = router;
