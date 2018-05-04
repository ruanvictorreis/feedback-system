var fs = require('fs')
var express = require('express');
var router = express.Router();
var PythonShell = require('python-shell')

router.get('/', function (request, response) {
  feedtype = 'code-repair'
  student_id = '111210442'
  assignment = 'sum_of_squares_base'
  parameters = '[[5, 5],[10,4],[0,3]]'
  student_attempt = '## SOME CODE HERE ##'

  args = [feedtype, student_id, assignment, parameters, student_attempt]

  PythonShell.run('./python_modules/clara/clara_run.py', { args: args }, (err) => {
    if (err) throw err
    file_name = student_id + '.py'
    repair_path = `./python_modules/clara/repairs/${assignment}/${file_name}`
    const content = fs.readFileSync(repair_path, 'utf8')
    response.send(content);
  })
});

module.exports = router;