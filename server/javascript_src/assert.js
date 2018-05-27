var fs = require('fs');

class Assert {
  constructor(register, assignment, studentCode) {
    this.asserts = [];
    this.errorMsg = '';
    this.failedTest = [];
    this.expected = 0;
    this.obtained = 0;
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

    if (!this.syntaxError) {
      this.extractTestDescription(this.errorMsg);
    }
  }

  extractTestDescription(errorMsg) {
    var errorMsgSplited = errorMsg.split(/>>>|#/);
    var failedTest = errorMsgSplited[1].trim();
    var expected = errorMsgSplited[3].trim();
    var obtained = errorMsgSplited[5].trim();

    if (!isNaN(parseInt(expected))) {
      expected = parseInt(expected)
    }

    if (!isNaN(parseInt(obtained))) {
      obtained = parseInt(obtained)
    }

    this.failedTest = failedTest;
    this.expected = expected;
    this.obtained = obtained;
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

  haveSyntaxError(error) {
    const stackError = error.stack;
    return stackError.indexOf('AssertionError') == -1;
  }

  getResult() {
    var result = {};
    result.errorMsg = this.errorMsg;
    result.failedTest = this.failedTest;
    result.expected = this.expected;
    result.obtained = this.obtained;
    result.register = this.register;
    result.isCorrect = this.isCorrect;
    result.assignment = this.assignment;
    result.studentCode = this.studentCode;
    result.syntaxError = this.syntaxError;
    return result;
  }
}

module.exports = Assert;
