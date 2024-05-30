from rest_framework import serializers
from .models import User, Course, Module, Lesson, Exam, Question, UserProgress

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name']


class QuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Question
        fields = '__all__'


class LessonSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lesson
        fields = '__all__'

class ExamSerializer(serializers.ModelSerializer):
    class Meta:
        model = Exam
        fields = '__all__'

    def create(self, validated_data):
        questions_data = validated_data.pop('questions')
        exam = Exam.objects.create(**validated_data)
        for question_data in questions_data:
            Question.objects.create(exam=exam, **question_data)
        return exam

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
