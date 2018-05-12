var fs = require('fs');
var express = require('express');
var router = express.Router();

router.post('/', function (request, response) {
  const attempt = request.body;
  const register = attempt.register;
  const assignment = attempt.assignment;
  const studentCode = attempt.student_code;

  const assert = new Assert(register, assignment, studentCode);
  assert.createFile()
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
    const assertsPath = `./assignments/${this.assignment}/asserts/assert_expr`;
    this.asserts = fs.readFileSync(assertsPath, 'utf8').split('\n');

    const messagePath = `./assignments/assert_msg`;
    this.message = fs.readFileSync(messagePath, 'utf8').trim();
  }

  createFile() {
    var content = this.studentCode + '\n';
    for (var assert of this.asserts) {
      const splited = assert.split('==');
      const callFunction = splited[0].trim();
      const expected = splited[splited.length - 1].trim();

      var errorMsg = this.message.trim();
      errorMsg = errorMsg.replace(/-expected-/g, expected);
      errorMsg = errorMsg.replace(/-callFunction-/g, callFunction);

      assert = assert.trim()
      var assertLine = `assert ${assert}, ${errorMsg}`;
      content = content + '\n' + assertLine;
    }

    const assertFile = `./assignments/${this.assignment}/asserts/${this.register}.py`;
    fs.writeFileSync(assertFile, content, 'utf8');
  }
}

module.exports = router;