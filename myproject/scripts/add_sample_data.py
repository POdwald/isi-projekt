import os
from django.contrib.auth.models import User
from api.models import Course, Module, Lesson, Exam, Question, UserProgress

SCRIPTS_DIR = 'myproject/scripts'
def execute_script(script_filename):
    script_path = os.path.join(SCRIPTS_DIR, script_filename)
    with open(script_path, 'r') as script_file:
        script_contents = script_file.read()
        exec(script_contents)


execute_script('create_sample_course.py')
execute_script('create_sample_course2.py')
execute_script('create_sample_course3.py')