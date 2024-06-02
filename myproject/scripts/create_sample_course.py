from django.contrib.auth.models import User
from api.models import Course, Module, Lesson, Exam, Question, UserProgress

# Create a sample course
course = Course.objects.create(
    title="Introduction to Python",
    description="A comprehensive course to learn Python programming from scratch.",
    category="Programming"
)

# Create modules for the course
module1 = Module.objects.create(
    course=course,
    title="Getting Started with Python",
    description="Introduction to Python and setting up the environment."
)

module2 = Module.objects.create(
    course=course,
    title="Python Basics",
    description="Learn the basic syntax and data types in Python."
)

# Create lessons for Module 1
Lesson.objects.create(
    module=module1,
    title="Introduction to Python",
    content_type="video",
    content="https://www.youtube.com/watch?v=rfscVS0vtbw"  # Example YouTube link
)

Lesson.objects.create(
    module=module1,
    title="Setting up Python",
    content_type="markdown",
    content="""
# Setting up Python

To get started with Python, you'll need to install it on your system. Follow the steps below:

1. Download Python from the [official website](https://www.python.org/downloads/).
2. Follow the installation instructions for your operating system.
3. Verify the installation by opening a terminal and typing `python --version`.

Congratulations! You have successfully set up Python on your system.
"""
)

# Create lessons for Module 2
Lesson.objects.create(
    module=module2,
    title="Python Syntax",
    content_type="video",
    content="https://www.youtube.com/watch?v=abPgj_9A2k4"  # Example YouTube link
)

Lesson.objects.create(
    module=module2,
    title="Data Types in Python",
    content_type="markdown",
    content="""
# Data Types in Python

Python supports various data types, including:

- **Integers**: Whole numbers, e.g., `1`, `42`, `-7`.
- **Floats**: Decimal numbers, e.g., `3.14`, `2.0`, `-1.23`.
- **Strings**: Sequence of characters, e.g., `"hello"`, `"Python"`.
- **Lists**: Ordered, mutable collection of items, e.g., `[1, 2, 3]`, `["a", "b", "c"]`.

Understanding these data types is fundamental to programming in Python.
"""
)

# Create an exam for Module 2
exam = Exam.objects.create(
    module=module2,
    title="Python Basics Exam",
    passing_score=(1 / 2) * 100
)

# Create questions for the exam
Question.objects.create(
    exam=exam,
    question_text="What is the output of `print(3 + 2)`?",
    choices=['3', '5', '7', '10'],
    correct_answer=1  # '5' is the correct answer
)

Question.objects.create(
    exam=exam,
    question_text="Which data type is used to store a sequence of characters?",
    choices=['Integer', 'Float', 'String', 'List'],
    correct_answer=2  # 'String' is the correct answer
)

print("Sample course created successfully!")
