from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CourseViewSet, ModuleViewSet, LessonViewSet, ExamViewSet, QuestionViewSet, UserProgressViewSet

router = DefaultRouter()
router.register(r'courses', CourseViewSet)
router.register(r'modules', ModuleViewSet)
router.register(r'lessons', LessonViewSet)
router.register(r'exams', ExamViewSet)
router.register(r'questions', QuestionViewSet)
router.register(r'progress', UserProgressViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
