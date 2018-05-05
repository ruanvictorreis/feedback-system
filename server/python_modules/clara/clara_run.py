import os
import sys

feedtype = sys.argv[1]
student_id = sys.argv[2]
assignment = sys.argv[3]
parameters = sys.argv[4]
student_code = sys.argv[5]

file_name = student_id + '.py'
clara_path = 'python_modules/clara'
attempt_path = '{0}/attempts/{1}/{2}'.format(clara_path, assignment, file_name)

with open(attempt_path, 'w') as _file:
		_file.write(student_code)
		_file.close()

specs = '{0}/specs/{1}/*.py'.format(clara_path, assignment)
repair_file = '{0}/repairs/{1}/{2}'.format(clara_path, assignment, file_name)
clara_command = 'clara feedback {0} {1} --entryfnc {2} --args "{3}" --verbose 0 --feedtype "{4}"'
clara_command = clara_command.format(specs, attempt_path, assignment, parameters, feedtype)

if os.path.isfile(repair_file):
    os.remove(repair_file)

os.system("{0} >> {1}".format(clara_command, repair_file))
