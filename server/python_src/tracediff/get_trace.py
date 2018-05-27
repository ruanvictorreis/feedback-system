import sys
import json
import re
import pg_logger
import json
import parse

assignment = sys.argv[1]
file_name = sys.argv[2]
path = './assignments/' + assignment + '/traces/' + file_name + '.json'

items = []
with open(path) as file:
  items = json.load(file)

i = 0
for item in items:
  before = item['studentCode']
  after = item['codeRepaired']
  test = item['failedTest']

  before_ast = []
  after_ast = []

  for line in before.splitlines():
    line = line.strip()
    try:
      ast = parse.make_ast(line)
    except Exception as err:
      ast = { 'error': True }
    before_ast.append(ast)

  for line in after.splitlines():
    line = line.strip()
    try:
      ast = parse.make_ast(line)
    except Exception as err:
      ast = { 'error': True }
    after_ast.append(ast)

  item['beforeAst'] = before_ast
  item['afterAst'] = after_ast

  keywords = re.findall(r"[\w]+", test)
  combiner = None
  term = None
  combiner_func = ''
  term_func = ''
  test = test.split('#')[0]

  before += '\n\n'
  before += test

  after += '\n\n'
  after += test
  
  beforeTraces = pg_logger.exec_script_str(before).trace
  afterTraces = pg_logger.exec_script_str(after).trace
  
  item['beforeCode'] = before
  item['afterCode'] = after
  item['beforeTraces'] = beforeTraces
  item['afterTraces'] = afterTraces

with open(path, 'w') as file:
  json.dump(items, file)
