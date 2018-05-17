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
  const parameters = getInputParameters(assignment);

  var result = attempt;
  var feedPython = 'python';
  var feedSynthesis = 'synthesis';

  var args = [feedPython, register, assignment, parameters, studentCode];

  PythonShell.run('./python_src/clara/clara_run.py', { args: args }, (error) => {
    if (error) {
      result.repairs = [];
      result.isRepaired = false;
      response.json(result);
      return;
    }

    var fileName = register + '.py';
    var repairPath = `./assignments/${assignment}/repairs/${fileName}`;
    result.repairs = fs.readFileSync(repairPath, 'utf8').split('#');
    result.isRepaired = true;
  });

  args[0] = feedSynthesis

  PythonShell.run('./python_src/clara/clara_run.py', { args: args }, (error) => {
    if (error) {
      result.codeRepaired = '';
      result.isCodeRepaired = false;
      response.json(result);
      return;
    }

    var fileName = register + '.py';
    var repairPath = `./assignments/${assignment}/repairs/${fileName}`;
    result.codeRepaired = fs.readFileSync(repairPath, 'utf8').split('#');
    result.isCodeRepaired = true;
  });

  const assert = new Assert(register, assignment, result.codeRepaired);
  const assertFile = assert.createFile();

  PythonShell.run(assertFile, { args: [] }, (error) => {
    if (error) {
      assert.errorAnalysis(error);
    }

    result.isCodeRepaired = assert.isCorrect
    response.json(result);
  });




  /** 
  PythonShell.run('./python_src/clara/clara_run.py', { args: args }, (error) => {


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




  });*/




});

function getInputParameters(assignment) {
  const inputPath = `./assignments/${assignment}/input`;
  return fs.readFileSync(inputPath, 'utf8').trim();
}

module.exports = router;
