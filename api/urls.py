from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import CourseViewSet, ModuleViewSet, LessonViewSet, ExamViewSet, QuestionViewSet, UserProgressViewSet
from .views import signup, user_profile, create_course, enroll_in_course, remove_enrollment, enrolled_courses, check_user_enrollment, course_progress, complete_lesson, complete_exam
from .views import CourseDetailView, CourseWelcomeView, LessonDetailView, ExamDetailView, ExamAttemptView, ExamResultView

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
    path('learn/<slug:course_slug>/module/<slug:module_slug>/lesson/<slug:lesson_slug>/', LessonDetailView.as_view(), name='lesson_detail'),
    path('learn/<slug:course_slug>/module/<slug:module_slug>/exam/<slug:exam_slug>/', ExamDetailView.as_view(), name='exam_detail'),
    path('learn/<slug:course_slug>/module/<slug:module_slug>/exam/<slug:exam_slug>/attempt/', ExamAttemptView.as_view(), name='exam_attempt'),
    path('exam_attempts/last_result/', ExamResultView.as_view(), name='exam_result'),
    path('complete_lesson/<slug:course_slug>/<slug:module_slug>/<slug:lesson_slug>/', complete_lesson, name='complete_lesson'),
    path('complete_exam/<slug:course_slug>/<slug:module_slug>/<slug:exam_slug>/', complete_exam, name='complete_exam'),
    path('enroll/<slug:course_slug>/', enroll_in_course, name='enroll_in_course'),
    path('enrollment/<slug:course_slug>/', check_user_enrollment, name='check_user_enrollment'),
    path('unenroll/<slug:course_slug>/', remove_enrollment, name='unenroll'),
    path('enrolled_courses/', enrolled_courses, name='enrolled_courses'),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('user_progress/<slug:course_slug>/', course_progress, name='course_progress'),

    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
