var fs = require('fs');

class Assert {
  constructor(register, assignment, studentCode) {
    this.asserts = [];
    this.errorMsg = '';
    this.assertFile = '';
    this.isCorrect = true;
    this.errorPattern = '';
    this.syntaxError = false;
    this.register = register;
    this.assignment = assignment;
    this.studentCode = studentCode;
  }

  init() {
    const errorPatternPath = `./assignments/assert_msg`;
    this.errorPattern = fs.readFileSync(errorPatternPath, 'utf8').trim();
    const assertsPath = `./assignments/${this.assignment}/asserts/assert_expr`;
    this.asserts = fs.readFileSync(assertsPath, 'utf8').trim().split('\n');
  }

  createFile() {
    this.init()
    var content = this.studentCode + '\n';

    for (var assert of this.asserts) {
      const splited = assert.split('==');
      const callFunction = splited[0].trim();
      const expected = splited[splited.length - 1].trim();

      var errorMsg = this.errorPattern.trim();
      errorMsg = errorMsg.replace(/--expected--/g, expected);
      errorMsg = errorMsg.replace(/--callFunction--/g, callFunction);

      assert = assert.trim();
      var assertLine = `assert ${assert}, ${errorMsg}`;
      content = content + '\n' + assertLine;
    }

    const assertFile = `./assignments/${this.assignment}/asserts/${this.register}.py`;

    try {
      fs.writeFileSync(assertFile, content, 'utf8');
      this.assertFile = assertFile;
      return assertFile;
    }
    catch (err) {
      //DO SOMETHING
    }
  }

  errorAnalysis(error) {
    this.isCorrect = false;
    this.syntaxError = this.haveSyntaxError(error);
    this.errorMsg = this.extractErrorDescription(error);
  }

  haveSyntaxError(error) {
    const stackError = error.stack;
    return stackError.indexOf('AssertionError') == -1;
  }

  extractErrorDescription(error) {
    const stackError = error.stack;
    const resultMsg = error.message;
    const errorIndex = stackError.indexOf('AssertionError');

    if (errorIndex == -1) {
      return resultMsg.trim()
    } else {
      return stackError.substring(errorIndex) + '  \n  ' + resultMsg;
    }
  }

  getResult() {
    var result = {};
    result.errorMsg = this.errorMsg;
    result.register = this.register;
    result.isCorrect = this.isCorrect;
    result.assignment = this.assignment;
    result.studentCode = this.studentCode;
    result.syntaxError = this.syntaxError;
    return result;
  }
}

module.exports = Assert;
