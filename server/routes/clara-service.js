var fs = require('fs');
var express = require('express');
var router = express.Router();
var PythonShell = require('python-shell');
var Assert = require('../javascript_src/assert.js');

router.post('/', function (request, response) {
  const attempt = request.body;
  const feedtype = attempt.feedtype;
  const register = attempt.register;
  const assignment = attempt.assignment;
  const checkRepair = attempt.checkRepair;
  const studentCode = attempt.studentCode;
  const parameters = getInputParameters(assignment);

  args = [feedtype, register, assignment, parameters, studentCode];

  PythonShell.run('./python_src/clara/clara_run.py', { args: args }, (error) => {
    var result = attempt;

    if (error) {
      result.repairs = '';
      result.repaired = false;
      response.json(result);
      return;
    }

    fileName = register + '.py';
    repairPath = `./assignments/${assignment}/repairs/${fileName}`;
    result.repairs = fs.readFileSync(repairPath, 'utf8');

    if (!checkRepair) {
      result.repaired = true;
      response.json(result);
      return;
    }

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
