from django.contrib.auth.models import User
from api.models import Course, Module, Lesson, Exam, Question, UserProgress

# Create a sample course
machine_learning_course = Course.objects.create(
    title="Introduction to Machine Learning",
    description="A beginner-friendly course to understand the fundamentals of Machine Learning.",
    category="Data Science"
)

# Create modules for the course
module1_ml = Module.objects.create(
    course=machine_learning_course,
    title="Introduction to Machine Learning",
    description="Understanding the basics of Machine Learning and its applications."
)

module2_ml = Module.objects.create(
    course=machine_learning_course,
    title="Supervised Learning",
    description="Learn about supervised learning algorithms and their implementations."
)

module3_ml = Module.objects.create(
    course=machine_learning_course,
    title="Unsupervised Learning",
    description="Explore unsupervised learning techniques and their real-world applications."
)

# Create lessons for Module 1
Lesson.objects.create(
    module=module1_ml,
    title="What is Machine Learning?",
    content_type="markdown",
    content="""
# What is Machine Learning?

Machine Learning is a subset of artificial intelligence (AI) that focuses on the development of algorithms that enable computers to learn from and make predictions or decisions based on data. It allows computers to automatically learn and improve from experience without being explicitly programmed.

## Applications of Machine Learning
- **Predictive Analytics**
- **Recommendation Systems**
- **Natural Language Processing**
- **Image Recognition**
"""
)

Lesson.objects.create(
    module=module1_ml,
    title="Types of Machine Learning",
    content_type="markdown",
    content="""
# Types of Machine Learning

Machine Learning can be broadly categorized into three types:

1. **Supervised Learning**: In this type, the algorithm learns from labeled data, with each example being a pair consisting of an input object (typically a vector) and a desired output value.
2. **Unsupervised Learning**: Here, the algorithm learns from unlabeled data, finding patterns and structures within the data without any explicit guidance.
3. **Reinforcement Learning**: This type of learning involves an agent that learns to behave in an environment by performing actions and receiving rewards or penalties in return.
"""
)

# Create lessons for Module 2
Lesson.objects.create(
    module=module2_ml,
    title="Linear Regression",
    content_type="markdown",
    content="""
# Linear Regression

Linear regression is a supervised learning algorithm used for predictive analysis. It models the relationship between a dependent variable and one or more independent variables by fitting a linear equation to observed data.

## Formula
The linear regression equation can be represented as:

\[ y = mx + b \]

where:
- \( y \) is the dependent variable (target)
- \( x \) is the independent variable (input)
- \( m \) is the slope of the line
- \( b \) is the y-intercept
"""
)

# Create lessons for Module 3
Lesson.objects.create(
    module=module3_ml,
    title="K-means Clustering",
    content_type="markdown",
    content="""
# K-means Clustering

K-means clustering is an unsupervised learning algorithm used to partition a dataset into a set of \( k \) clusters. It aims to group similar data points together and discover underlying patterns or structures in the data.

## Algorithm
1. Initialize \( k \) centroids randomly.
2. Assign each data point to the nearest centroid.
3. Update the centroids by computing the mean of all data points assigned to each centroid.
4. Repeat steps 2 and 3 until convergence.

## Applications
- Customer Segmentation
- Image Compression
- Anomaly Detection
"""
)

# Create an exam for Module 2
supervised_learning_exam = Exam.objects.create(
    module=module2_ml,
    title="Supervised Learning Exam"
)

# Create questions for the exam
Question.objects.create(
    exam=supervised_learning_exam,
    question_text="What is the goal of supervised learning?",
    choices={
        'choices': ['To classify data into predefined categories', 'To learn from unlabeled data', 'To predict an outcome based on input data', 'To group similar data points together']
    },
    correct_answer=2  # 'To predict an outcome based on input data' is the correct answer
)

Question.objects.create(
    exam=supervised_learning_exam,
    question_text="Which algorithm is commonly used for regression problems?",
    choices={
        'choices': ['K-means clustering', 'Logistic regression', 'Decision trees', 'Linear regression']
    },
    correct_answer=3  # 'Linear regression' is the correct answer
)

Question.objects.create(
    exam=supervised_learning_exam,
    question_text="What is the main difference between classification and regression?",
    choices={
        'choices': ['Classification predicts categories, while regression predicts numerical values', 'Classification predicts numerical values, while regression predicts categories', 'There is no difference', 'They both use the same algorithms']
    },
    correct_answer=0  # 'Classification predicts categories, while regression predicts numerical values' is the correct answer
)

print("Second sample course created successfully!")
