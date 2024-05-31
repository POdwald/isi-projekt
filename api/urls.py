from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import CourseViewSet, ModuleViewSet, LessonViewSet, ExamViewSet, QuestionViewSet, UserProgressViewSet
from .views import signup, user_profile, create_course, enroll_in_course, enrolled_courses
from .views import CourseDetailView, CourseWelcomeView, ModuleDetailView, LessonDetailView, ExamDetailView, ExamAttemptView

router = DefaultRouter()
router.register(r'courses', CourseViewSet)
router.register(r'modules', ModuleViewSet)
router.register(r'lessons', LessonViewSet)
router.register(r'exams', ExamViewSet)
router.register(r'questions', QuestionViewSet)
router.register(r'progress', UserProgressViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('signup/', signup, name='signup'),
    path('profile/', user_profile, name='user_profile'),
    path('create_course/', create_course, name='create_course'),
    path('learn/<slug:course_slug>/', CourseDetailView.as_view(), name='course_detail'),
    path('learn/<slug:course_slug>/home/welcome/', CourseWelcomeView.as_view(), name='course_welcome'),
    path('learn/<slug:course_slug>/home/module/<int:module_id>/', ModuleDetailView.as_view(), name='module_detail'),
    path('learn/<slug:course_slug>/module/<int:module_id>/lesson/<slug:lesson_slug>/', LessonDetailView.as_view(), name='lesson_detail'),
    path('learn/<slug:course_slug>/module/<int:module_id>/exam/<slug:exam_slug>/', ExamDetailView.as_view(), name='exam_detail'),
    path('learn/<slug:course_slug>/module/<int:module_id>/exam/<slug:exam_slug>/attempt/', ExamAttemptView.as_view(), name='exam_attempt'),
    path('enroll/<slug:course_slug>/', enroll_in_course, name='enroll_in_course'),
    path('enrolled_courses/', enrolled_courses, name='enrolled_courses'),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
