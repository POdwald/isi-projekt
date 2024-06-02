from rest_framework import serializers
from .models import User, Course, Module, Lesson, Exam, ExamAttempt, Question, UserProgress

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name']

class QuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Question
        fields = ['id', 'question_text', 'choices', 'correct_answer']

class LessonSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lesson
        fields = '__all__'

class ExamSerializer(serializers.ModelSerializer):
    questions = QuestionSerializer(many=True, read_only=True)

    class Meta:
        model = Exam
        fields = ['id', 'title', 'slug', 'questions', 'passing_score']  # Only include fields necessary for the exam

    def create(self, validated_data):
        questions_data = validated_data.pop('questions')
        exam = Exam.objects.create(**validated_data)
        for question_data in questions_data:
            Question.objects.create(exam=exam, **question_data)
        return exam

class ExamAttemptSerializer(serializers.ModelSerializer):
    class Meta:
        model = ExamAttempt
        fields = ['id', 'user', 'exam', 'answers', 'submitted_at']

class ExamResultSerializer(serializers.ModelSerializer):
    class Meta:
        model = ExamAttempt
        fields = ['id', 'user', 'exam', 'answers', 'correct_answers', 'score', 'submitted_at']

class ModuleSerializer(serializers.ModelSerializer):
    lessons = LessonSerializer(many=True)
    exams = ExamSerializer(many=True)

    class Meta:
        model = Module
        fields = '__all__'

    def create(self, validated_data):
        lessons_data = validated_data.pop('lessons')
        exams_data = validated_data.pop('exams')
        module = Module.objects.create(**validated_data)
        for lesson_data in lessons_data:
            Lesson.objects.create(module=module, **lesson_data)
        for exam_data in exams_data:
            questions_data = exam_data.pop('questions')
            exam = Exam.objects.create(module=module, **exam_data)
            for question_data in questions_data:
                Question.objects.create(exam=exam, **question_data)
        return module

class CourseSerializer(serializers.ModelSerializer):
    modules = ModuleSerializer(many=True)

    class Meta:
        model = Course
        fields = '__all__'

    def create(self, validated_data):
        modules_data = validated_data.pop('modules')
        course = Course.objects.create(**validated_data)
        for module_data in modules_data:
            lessons_data = module_data.pop('lessons')
            exams_data = module_data.pop('exams')
            module = Module.objects.create(course=course, **module_data)
            for lesson_data in lessons_data:
                Lesson.objects.create(module=module, **lesson_data)
            for exam_data in exams_data:
                questions_data = exam_data.pop('questions')
                exam = Exam.objects.create(module=module, **exam_data)
                for question_data in questions_data:
                    Question.objects.create(exam=exam, **question_data)
        return course

class UserProgressSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProgress
        fields = '__all__'
