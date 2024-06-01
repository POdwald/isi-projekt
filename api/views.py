import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.hashers import make_password
from django.contrib.auth import get_user_model
from django.shortcuts import get_object_or_404, redirect
from rest_framework import status, viewsets, permissions
from rest_framework.generics import RetrieveAPIView
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from .models import Course, Module, Lesson, Exam, ExamAttempt, Question, UserProgress, Enrollment
from .serializers import (
    CourseSerializer, ModuleSerializer, LessonSerializer, ExamSerializer, ExamAttemptSerializer,
    ExamResultSerializer, QuestionSerializer, UserProgressSerializer, UserSerializer
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
    
    if created or not UserProgress.objects.filter(user=request.user, course=course).exists():
        modules = Module.objects.filter(course=course)
        for module in modules:
            lessons = Lesson.objects.filter(module=module)
            for lesson in lessons:
                UserProgress.objects.create(
                    user=request.user,
                    course=course,
                    module=module,
                    lesson=lesson
                )
            exams = Exam.objects.filter(module=module)
            for exam in exams:
                UserProgress.objects.create(
                    user=request.user,
                    course=course,
                    module=module,
                    exam=exam
                )
    
    if created:
        return Response({'status': 'enrolled'})
    else:
        return Response({'status': 'already_enrolled'})

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def check_user_enrollment(request, course_slug):
    course = get_object_or_404(Course, slug=course_slug)
    is_enrolled = Enrollment.objects.filter(user=request.user, course=course).exists()
    return Response({'isEnrolled': is_enrolled})

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def enrolled_courses(request):
    # Retrieve enrolled courses for the current user
    enrolled_courses = Enrollment.objects.filter(user=request.user).values_list('course', flat=True)
    courses = Course.objects.filter(id__in=enrolled_courses)
    serializer = CourseSerializer(courses, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def course_progress(request, course_slug):
    try:
        course = get_object_or_404(Course, slug=course_slug)
        progress = UserProgress.objects.filter(user=request.user, course=course)
        if not progress.exists():
            return Response({'error': 'No progress found for this course'}, status=status.HTTP_404_NOT_FOUND)
        
        serializer = UserProgressSerializer(progress, many=True)
        return Response(serializer.data)
    except Course.DoesNotExist:
        return Response({'error': 'Course not found'}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

### TODO: DELETE / UPDATE THIS DEBUG VIEW FOR PRODUCTION OR SOMETHING.
@api_view(['GET'])
def remove_enrollment(request, course_slug):
    admin_user = User.objects.get(username='admin')
    enrollment = get_object_or_404(Enrollment, user=admin_user, course__slug=course_slug)
    enrollment.delete()
    return Response({'status': 'enrollment_removed'})

class CourseDetailView(APIView):
    def get(self, request, course_slug):
        course = get_object_or_404(Course, slug=course_slug)
        serializer = CourseSerializer(course)
        return Response(serializer.data)

class CourseWelcomeView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, course_slug):
        course = get_object_or_404(Course, slug=course_slug)
        return Response({'course': course})

class LessonDetailView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, course_slug, module_slug, lesson_slug):
        course = get_object_or_404(Course, slug=course_slug)
        module = get_object_or_404(Module, slug=module_slug, course=course)
        lesson = get_object_or_404(Lesson, slug=lesson_slug, module=module)
        serializer = LessonSerializer(lesson)
        return Response(serializer.data)

class ExamDetailView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, course_slug, module_slug, exam_slug):
        course = get_object_or_404(Course, slug=course_slug)
        module = get_object_or_404(Module, slug=module_slug, course=course)
        exam = get_object_or_404(Exam, slug=exam_slug, module=module)
        serializer = ExamSerializer(exam)
        return Response(serializer.data)

class ExamAttemptView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, course_slug, module_slug, exam_slug):
        try:
            module = get_object_or_404(Module, slug=module_slug, course__slug=course_slug)
            exam = get_object_or_404(Exam, slug=exam_slug, module=module)
            answers = request.data.get('answers', {})

            correct_answers = 0
            total_questions = exam.questions.count()
            correct_answer_ids = []

            for question in exam.questions.all():
                correct_answer_id = str(question.correct_answer)
                user_answer_id = answers.get(str(question.id))

                if user_answer_id == correct_answer_id:
                    correct_answers += 1
                    correct_answer_ids.append(question.id)
                
            print('correct_answers', correct_answers)
            score = (correct_answers / total_questions) * 100
            
            # Create or get the ExamAttempt instance
            attempt = ExamAttempt.objects.create(
                user=request.user,
                exam=exam,
                answers=answers,
                correct_answers=correct_answer_ids,
                score=score
            )
            serializer = ExamAttemptSerializer(attempt)
            return Response(serializer.data)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)    

class ExamResultView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        attempts = ExamAttempt.objects.filter(user=request.user)
        latest_attempt = attempts.order_by('-submitted_at').first()

        if latest_attempt:
            serializer = ExamResultSerializer(latest_attempt)
            return Response(serializer.data)
        else:
            return Response({"error": "No attempts found"}, status=status.HTTP_404_NOT_FOUND)

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