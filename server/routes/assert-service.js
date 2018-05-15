var fs = require('fs');
var express = require('express');
var router = express.Router();
var PythonShell = require('python-shell');

router.post('/', function (request, response) {
  const attempt = request.body;
  const register = attempt.register;
  const assignment = attempt.assignment;
  const studentCode = attempt.studentCode;

  const assert = new Assert(register, assignment, studentCode);
  const assertFile = assert.createFile();

  PythonShell.run(assertFile, { args: [] }, (err) => {
    var result = {}
    var errorMsg = '';
    var isCorrect = true;

    if (err) {
      const stackError = err.stack;
      const resultMsg = err.message;

      const errorIndex = stackError.indexOf('AssertionError');
      const assertMsg = stackError.substring(errorIndex);

      errorMsg = assertMsg + '  \n  ' + resultMsg;
      isCorrect = false;
    }

    result.register = register;
    result.errorMsg = errorMsg;
    result.isCorrect = isCorrect;
    result.assignment = assignment;
    result.studentCode = studentCode;

    response.json(result);
  })
});

class Assert {
  constructor(register, assignment, studentCode) {
    this.register = register;
    this.assignment = assignment;
    this.studentCode = studentCode;
    this.asserts = [];
    this.message = '';
    this.init();
  }

  init() {
    const messagePath = `./assignments/assert_msg`;
    const assertsPath = `./assignments/${this.assignment}/asserts/assert_expr`;
    this.message = fs.readFileSync(messagePath, 'utf8').trim();
    this.asserts = fs.readFileSync(assertsPath, 'utf8').split('\n');
  }

  createFile() {
    var content = this.studentCode + '\n';
    for (var assert of this.asserts) {
      const splited = assert.split('==');
      const callFunction = splited[0].trim();
      const expected = splited[splited.length - 1].trim();

      var errorMsg = this.message.trim();
      errorMsg = errorMsg.replace(/--expected--/g, expected);
      errorMsg = errorMsg.replace(/--callFunction--/g, callFunction);

      assert = assert.trim();
      var assertLine = `assert ${assert}, ${errorMsg}`;
      content = content + '\n' + assertLine;
    }

    const assertFile = `./assignments/${this.assignment}/asserts/${this.register}.py`;
    fs.writeFileSync(assertFile, content, 'utf8');

    return assertFile;
  }
}

module.exports = router;