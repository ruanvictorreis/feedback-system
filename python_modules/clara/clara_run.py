import os

clara_path = 'python_modules/clara'

# from args
student_id = '111210442'

# from args
assignment = 'sum_of_squares_base'

# from args
parameters = '[[5, 5],[10,4],[0,3]]'

# from args
feedtype = 'code-repair'


specs = '{0}/specs/{1}/*.py'.format(clara_path, assignment)

file_name = student_id + '_' + assignment

input_file = '{0}/attempts/{1}/{2}.py'.format(clara_path, assignment, file_name)

output_file = '{0}/repairs/{1}/{2}.py'.format(clara_path, assignment, file_name)

template = 'clara feedback {0} {1} --entryfnc {2} --args "{3}" --verbose 0 --feedtype "{4}"'

command = template.format(specs, input_file, assignment, parameters, feedtype)

os.system("{0} >> {1}".format(command, output_file))


