from django.contrib.auth.models import User
from api.models import Course, Module, Lesson, Exam, Question, UserProgress

# Create a sample course
web_development_course = Course.objects.create(
    title="Web Development Fundamentals",
    description="A comprehensive course covering the basics of web development.",
    category="Web Development"
)

# Create modules for the course
module1_web = Module.objects.create(
    course=web_development_course,
    title="Introduction to Web Development",
    description="Understanding the basics of web development and its technologies."
)

module2_web = Module.objects.create(
    course=web_development_course,
    title="Frontend Development",
    description="Learn about frontend technologies such as HTML, CSS, and JavaScript."
)

module3_web = Module.objects.create(
    course=web_development_course,
    title="Backend Development",
    description="Explore backend technologies and server-side programming."
)

# Create lessons for Module 1
Lesson.objects.create(
    module=module1_web,
    title="What is Web Development?",
    content_type="markdown",
    content="""
# What is Web Development?

Web development refers to the process of building, creating, and maintaining websites and web applications. It encompasses a wide range of tasks, including web design, web content development, client-side/server-side scripting, and network security configuration.

## Technologies Used in Web Development
- **HTML (HyperText Markup Language)**
- **CSS (Cascading Style Sheets)**
- **JavaScript**
"""
)

Lesson.objects.create(
    module=module1_web,
    title="Web Development Lifecycle",
    content_type="markdown",
    content="""
# Web Development Lifecycle

The web development lifecycle consists of several phases, including:

1. **Planning**: Defining project goals, target audience, and scope.
2. **Design**: Creating wireframes, mockups, and visual designs.
3. **Development**: Writing code, implementing functionality, and building the website.
4. **Testing**: Testing for bugs, errors, and compatibility issues across different devices and browsers.
5. **Deployment**: Publishing the website to a web server and making it accessible to users.
6. **Maintenance**: Regular updates, fixes, and improvements to keep the website running smoothly.
"""
)

# Create lessons for Module 2
Lesson.objects.create(
    module=module2_web,
    title="HTML Basics",
    content_type="markdown",
    content="""
# HTML Basics

HTML (HyperText Markup Language) is the standard markup language used to create web pages. It provides the structure and layout of a web page by using a system of tags and attributes.

## Example HTML Structure
```html
<!DOCTYPE html>
<html>
<head>
    <title>My First Web Page</title>
</head>
<body>

<h1>Hello, World!</h1>
<p>This is a paragraph.</p>

</body>
</html>
```
"""
)

Lesson.objects.create(
    module=module2_web,
    title="Introduction to CSS",
    content_type="markdown",
    content="""
# Introduction to CSS

CSS (Cascading Style Sheets) is a stylesheet language used to describe the presentation of a document written in HTML. It allows developers to control the appearance and layout of multiple web pages all at once.

## CSS Syntax
```css
/* This is a CSS comment */
body {
    background-color: lightblue;
    font-family: Arial, sans-serif;
}

h1 {
    color: navy;
    text-align: center;
}
```
"""
)

# Create lessons for Module 3
Lesson.objects.create(
    module=module3_web,
    title="Introduction to Backend Development",
    content_type="markdown",
    content="""
# Introduction to Backend Development

Backend development refers to the server-side development of web applications. It involves writing code that runs on the server and interacts with the database, handling user requests, and generating dynamic content.

## Technologies Used in Backend Development
- **Programming Languages (e.g., Python, Ruby, Node.js)**
- **Web Frameworks (e.g., Django, Flask, Ruby on Rails)**
- **Databases (e.g., MySQL, PostgreSQL, MongoDB)**
"""
)

Lesson.objects.create(
    module=module3_web,
    title="RESTful APIs",
    content_type="markdown",
    content="""
# RESTful APIs

REST (Representational State Transfer) is an architectural style for designing networked applications. A RESTful API is an application program interface (API) that uses HTTP requests to perform CRUD (Create, Read, Update, Delete) operations.

## Key Principles of REST
- **Statelessness**: Each request from a client must contain all the information necessary to understand and process the request.
- **Uniform Interface**: Resources are identified by URIs, and interactions are performed using standard HTTP methods (GET, POST, PUT, DELETE).
- **Client-Server Architecture**: The client and server are separate and independent components that interact through a uniform interface.

"""
)

# Create an exam for Module 2
frontend_exam = Exam.objects.create(
    module=module2_web,
    title="Frontend Development Exam"
)

# Create questions for the exam
Question.objects.create(
    exam=frontend_exam,
    question_text="What does HTML stand for?",
    choices=['HyperText Markup Language', 'Hyperlink and Text Markup Language', 'Hyperlink Transfer Markup Language', 'Home Tool Markup Language'],
    correct_answer=0  # 'HyperText Markup Language' is the correct answer
)

Question.objects.create(
    exam=frontend_exam,
    question_text="What is the purpose of CSS?",
    choices=['To define the structure of a web page', 'To describe the presentation of a web page', 'To add interactivity to a web page', 'To handle server-side logic'],
    correct_answer=1  # 'To describe the presentation of a web page' is the correct answer
)

Question.objects.create(
    exam=frontend_exam,
    question_text="Which HTML tag is used to create a hyperlink?",
    choices=['<link>', '<a>', '<href>', '<url>'],
    correct_answer=1  # '<a>' is the correct answer
)

print("Third sample course created successfully!")
