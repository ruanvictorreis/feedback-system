var express = require('express');
var router = express.Router();
var PythonShell = require('python-shell');
var Assert = require('../javascript_src/assert.js');

router.post('/', function (request, response) {
  const attempt = request.body;
  const register = attempt.register;
  const assignment = attempt.assignment;
  const studentCode = attempt.studentCode;

  const assert = new Assert(register, assignment, studentCode);
  const assertFile = assert.createFile();

  PythonShell.run(assertFile, { args: [] }, (error) => {
    if (error) {
      assert.errorAnalysis(error);
    }
  
    response.json(assert.getResult());
  });
});

module.exports = router;