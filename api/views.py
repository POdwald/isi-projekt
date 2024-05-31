import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.hashers import make_password
from django.contrib.auth import get_user_model
from django.shortcuts import get_object_or_404, redirect
from rest_framework import status, viewsets, permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from .models import Course, Module, Lesson, Exam, Question, UserProgress, Enrollment
from .serializers import (
    CourseSerializer, ModuleSerializer, LessonSerializer, ExamSerializer,
    QuestionSerializer, UserProgressSerializer, UserSerializer
)

User = get_user_model()

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

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def user_profile(request):
    user = request.user
    profile_data = {
        'username': user.username,
        'email': user.email
    }
    return JsonResponse(profile_data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_course(request):
    if request.method == 'POST':
        serializer = CourseSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def enroll_in_course(request, course_slug):
    course = get_object_or_404(Course, slug=course_slug)
    enrollment, created = Enrollment.objects.get_or_create(user=request.user, course=course)
    if created:
        return Response({'status': 'enrolled'})
    else:
        return Response({'status': 'already_enrolled'})

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def enrolled_courses(request):
    # Retrieve enrolled courses for the current user
    enrolled_courses = Enrollment.objects.filter(user=request.user).values_list('course', flat=True)
    courses = Course.objects.filter(id__in=enrolled_courses)
    serializer = CourseSerializer(courses, many=True)
    return Response(serializer.data)

class CourseDetailView(APIView):
    def get(self, request, course_slug):
        course = get_object_or_404(Course, slug=course_slug)
        serializer = CourseSerializer(course)
        return Response(serializer.data)

class CourseWelcomeView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, course_slug):
        course = get_object_or_404(Course, slug=course_slug)
        if not course.is_user_enrolled(request.user):
            return redirect('enroll_in_course', course_slug=course_slug)
        return Response({'course': course})

class ModuleDetailView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, course_slug, module_id):
        course = get_object_or_404(Course, slug=course_slug)
        if not course.is_user_enrolled(request.user):
            return redirect('enroll_in_course', course_slug=course_slug)
        module = get_object_or_404(Module, id=module_id, course=course)
        return Response({'module': module, 'course': course})

class LessonDetailView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, course_slug, module_id, lesson_slug):
        course = get_object_or_404(Course, slug=course_slug)
        if not course.is_user_enrolled(request.user):
            return redirect('enroll_in_course', course_slug=course_slug)
        module = get_object_or_404(Module, id=module_id, course=course)
        lesson = get_object_or_404(Lesson, slug=lesson_slug, module=module)
        return Response({'lesson': lesson, 'course': course})

class ExamDetailView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, course_slug, module_id, exam_slug):
        course = get_object_or_404(Course, slug=course_slug)
        if not course.is_user_enrolled(request.user):
            return redirect('enroll_in_course', course_slug=course_slug)
        module = get_object_or_404(Module, id=module_id, course=course)
        exam = get_object_or_404(Exam, slug=exam_slug, module=module)
        return Response({'exam': exam, 'course': course})

class ExamAttemptView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, course_slug, module_id, exam_slug):
        course = get_object_or_404(Course, slug=course_slug)
        if not course.is_user_enrolled(request.user):
            return redirect('enroll_in_course', course_slug=course_slug)
        module = get_object_or_404(Module, id=module_id, course=course)
        exam = get_object_or_404(Exam, slug=exam_slug, module=module)
        # Handle exam attempt logic here (e.g., displaying questions, submitting answers)
        return Response({'exam': exam, 'course': course})

    def post(self, request, course_slug, module_id, exam_slug):
        # Handle exam submission logic here
        pass


class CourseViewSet(viewsets.ModelViewSet):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer

    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            permission_classes = [permissions.AllowAny]
        else:
            permission_classes = [permissions.IsAuthenticated]
        return [permission() for permission in permission_classes]

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