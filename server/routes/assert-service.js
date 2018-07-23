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
  var assertScript = new PythonShell(assertFile);

  var pythonKiller = setTimeout(function () {
    assertScript.childProcess.kill();
    assert.isCorrect = false;
    assert.syntaxError = true;
    assert.errorMsg = "TimeOutError: Talvez seu código possua algum loop infinito";
    response.json(assert.getResult());
  }, 10000);

  assertScript.end(function (error) {
    clearTimeout(pythonKiller);

    if (error) {
      assert.errorAnalysis(error);
    }
    response.json(assert.getResult());
  });
});

module.exports = router;