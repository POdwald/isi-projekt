import json
from rest_framework import viewsets, permissions
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.hashers import make_password
from django.contrib.auth import authenticate, login, get_user_model
from .models import Course, Module, Lesson, Exam, Question, UserProgress
from .serializers import (
    CourseSerializer, ModuleSerializer, LessonSerializer, ExamSerializer,
    QuestionSerializer, UserProgressSerializer, UserSerializer
)

User = get_user_model()

@csrf_exempt
def login(request):
    if request.method == 'POST':
        # Parse JSON data from request body
        data = json.loads(request.body)
        username = data.get('username')
        password = data.get('password')

        # Validate input
        if not username or not password:
            return JsonResponse({'error': 'Invalid input'}, status=400)

        # Authenticate user
        user = authenticate(request, username=username, password=password)
        if user is not None:
            # Login the user
            login(request, user)
            return JsonResponse({'message': 'Login successful'})
        else:
            return JsonResponse({'error': 'Invalid credentials'}, status=400)

    # Return error for unsupported methods
    return JsonResponse({'error': 'Method not allowed'}, status=405)


@csrf_exempt
def signup(request):
    if request.method == 'POST':
        # Parse JSON data from request body
        data = json.loads(request.body)
        username = data.get('username')
        email = data.get('email')
        password = data.get('password')

        # Validate input
        if not username or not email or not password:
            return JsonResponse({'error': 'Invalid input'}, status=400)

        # Check if user already exists
        if User.objects.filter(username=username).exists():
            return JsonResponse({'error': 'Username already exists'}, status=400)

        # Create new user
        user = User.objects.create(
            username=username,
            email=email,
            password=make_password(password)  # Hash the password
        )

        # Return success response
        return JsonResponse({'message': 'User registered successfully'})

    # Return error for unsupported methods
    return JsonResponse({'error': 'Method not allowed'}, status=405)

class CourseViewSet(viewsets.ModelViewSet):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    permission_classes = [permissions.IsAuthenticated]

class ModuleViewSet(viewsets.ModelViewSet):
    queryset = Module.objects.all()
    serializer_class = ModuleSerializer
    permission_classes = [permissions.IsAuthenticated]

class LessonViewSet(viewsets.ModelViewSet):
    queryset = Lesson.objects.all()
    serializer_class = LessonSerializer
    permission_classes = [permissions.IsAuthenticated]

class ExamViewSet(viewsets.ModelViewSet):
    queryset = Exam.objects.all()
    serializer_class = ExamSerializer
    permission_classes = [permissions.IsAuthenticated]

class QuestionViewSet(viewsets.ModelViewSet):
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer
    permission_classes = [permissions.IsAuthenticated]

class UserProgressViewSet(viewsets.ModelViewSet):
    queryset = UserProgress.objects.all()
    serializer_class = UserProgressSerializer
    permission_classes = [permissions.IsAuthenticated]