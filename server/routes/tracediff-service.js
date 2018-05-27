var fs = require('fs');
var jsdiff = require('diff');
var express = require('express');
var router = express.Router();
var PythonShell = require('python-shell');

router.post('/', function (request, response) {
  const attempt = request.body;
  const register = attempt.register;
  const assignment = attempt.assignment;
  const file = `attempt_${register}`;
  const trace = new Trace(attempt, file);
  const result = trace.generate();

  PythonShell.run('python_src/tracediff/get_trace.py', { args: [assignment, file] }, (err) => {
    if (err) throw err
    const content = fs.readFileSync(`./assignments/${assignment}/traces/${file}.json`, 'utf8')
    response.json(content);
  })
});

class Trace {
  constructor(attempt, file) {
    this.results = []
    this.items = [attempt]
    this.file = file
  }

  generate() {
    const assignment = this.items[0].assignment;
    const path = `./assignments/${assignment}/traces/${this.file}.json`;
    let results = [];
    let id = 0;

    for (let item of this.items) {
      item = new Item(item, id++)
      item.generate()
      this.results.push(item)
    }

    var resultJson = JSON.stringify(this.results, null, 2)
    fs.writeFileSync(path, resultJson)
    return resultJson
  }
}

class Item {
  constructor(item, id) {
    this.item = item
    this.id = id
    this.register = this.item.register
    this.studentCode = this.item.studentCode
    this.codeRepaired = this.item.codeRepaired
    this.code = ''
    this.diffs = []
    this.added = []
    this.removed = []
  }

  generate() {
    this.getDiff()
    this.getTest()
    delete this.item
  }

  getDiff() {
    if (this.studentCode.includes('from operator import')) {
      let lines = []
      for (let line of this.studentCode.split('\r\n')) {
        if (line.includes('from operator import')) continue
        lines.push(line)
      }
      this.studentCode = lines.join('\n')
    }

    this.studentCode = this.studentCode.replace(/\r\n/g, '\n');
    this.codeRepaired = this.codeRepaired.replace(/\r\n/g, '\n');

    let diffs = jsdiff.diffJson(this.studentCode, this.codeRepaired)
    let line = -1
    let code = ''
    let added = []
    let removed = []
    let addedLine = []
    let removedLine = []

    for (let diff of diffs) {
      let lines = diff.value.split('\n')
      for (let i = 0; i < diff.count; i++) {
        code += lines[i]
        code += '\n'
        line++
        if (diff.added) {
          added.push(line)
          addedLine.push({ line: line, code: lines[i] })
        }
        if (diff.removed) {
          removed.push(line)
          removedLine.push({ line: line, code: lines[i] })
        }
      }
    }

    this.code = code
    this.diffs = diffs
    this.added = added
    this.removed = removed
    this.addedLine = addedLine
    this.removedLine = removedLine
  }

  getTest() {
    this.failedTest = this.item.failedTest
    this.expected = this.item.expected
    this.obtained = this.item.obtained
    this.log = this.item.errorMsg
  }
}

module.exports = router;
