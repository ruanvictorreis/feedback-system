import sys
from difflib import SequenceMatcher

def convert_to_function(func_name, source_code):
    input_line = find_expression_line('input', source_code)
    param_name = get_var_name(input_line, source_code)
    source_code = delete_line(source_code, input_line)
    source_code = replace_statement('print', 'return', source_code)

    func_statement = 'def [function_name]([param_name]):'
    func_statement = func_statement.replace('[function_name]', func_name)
    func_statement = func_statement.replace('[param_name]', param_name)

    new_code = [func_statement]
    code_lines = source_code.strip().splitlines()
    
    for line in code_lines:
        new_code.append('  ' + line)
    
    return  '\n'.join(new_code)      


def get_var_name(target_line, source_code):
    code_lines = source_code.strip().splitlines()
    expression = code_lines[target_line]
    splitted = expression.split('=')
    return splitted[0].strip()

def find_expression_line(expr, source_code):
    ratio_line = -1
    target_line = 0
    code_lines = source_code.strip().splitlines()
        
    for i in range(len(code_lines)):
        line = code_lines[i].strip()
        ratio = SequenceMatcher(None, line, expr.strip()).ratio()
                
        if(ratio > ratio_line):
            ratio_line = ratio
            target_line = i    
    
    return target_line

def delete_line(source_code, line_number):
    code_lines = source_code.strip().splitlines()
    del code_lines[line_number]
    return '\n'.join(code_lines)    

def replace_statement(expr1, expr2, source_code):
    new_lines = []
    code_lines = source_code.strip().splitlines()
    
    for line in code_lines:
        new_lines.append(line.replace(expr1, expr2))
    
    return '\n'.join(new_lines)     

####
student_register = sys.argv[1]
assignment = sys.argv[2]
source_code = sys.argv[3]
function_source_code = convert_to_function(assignment, source_code)
file_path = './assignments/' + assignment + '/asserts/' + student_register + '.py'

with open(file_path, 'w') as new_file:
    new_file.write(function_source_code)