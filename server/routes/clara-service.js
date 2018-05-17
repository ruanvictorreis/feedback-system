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
  //var feedtype = 'synthesis';
  var feedtype = 'python';

  args = [feedtype, register, assignment, parameters, studentCode];

  PythonShell.run('./python_src/clara/clara_run.py', { args: args }, (error) => {
    if (error) {
      result.repairs = [];
      result.repaired = false;
      response.json(result);
      return;
    }
    
    fileName = register + '.py';
    repairPath = `./assignments/${assignment}/repairs/${fileName}`;  
    result.repairs = fs.readFileSync(repairPath, 'utf8').split('#');
	result.repaired = true;
    
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

    const assert = new Assert(register, assignment, result.repairs);
    const assertFile = assert.createFile();

    PythonShell.run(assertFile, { args: [] }, (error) => {
      if (error) {
        assert.errorAnalysis(error);
      }
      result.repaired = assert.isCorrect
      response.json(result);
    });
  });*/




});

function getInputParameters(assignment) {
  const inputPath = `./assignments/${assignment}/input`;
  return fs.readFileSync(inputPath, 'utf8').trim();
}

module.exports = router;
