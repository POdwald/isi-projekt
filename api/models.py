from django.conf import settings
from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.text import slugify
from django.core.exceptions import ValidationError

class User(AbstractUser):
    # Add any additional fields or methods here
    pass


class Course(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    category = models.CharField(max_length=100)
    slug = models.SlugField(max_length=255, unique=True, blank=True)

    def save(self, *args, **kwargs):
        # Generate slug if it's empty
        if not self.slug:
            self.slug = slugify(self.title)
        super(Course, self).save(*args, **kwargs)
    
    def is_user_enrolled(self, user):
        return Enrollment.objects.filter(user=user, course=self).exists()

class Enrollment(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    enrolled_on = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('user', 'course')

class Module(models.Model):
    course = models.ForeignKey(Course, related_name='modules', on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    description = models.TextField()
    slug = models.SlugField(max_length=255, blank=True)

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super(Module, self).save(*args, **kwargs)

class Lesson(models.Model):
    module = models.ForeignKey(Module, related_name='lessons', on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    slug = models.SlugField(max_length=255, unique=True, blank=True)
    content_type = models.CharField(max_length=50, choices=(('video', 'Video'), ('text', 'Text')))
    content = models.TextField()

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super(Lesson, self).save(*args, **kwargs)

class Exam(models.Model):
    module = models.ForeignKey(Module, related_name='exams', on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    slug = models.SlugField(max_length=255, unique=True, blank=True)
    passing_score = models.FloatField(null=True, blank=True)

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super(Exam, self).save(*args, **kwargs)

class ExamAttempt(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    exam = models.ForeignKey(Exam, on_delete=models.CASCADE)
    answers = models.JSONField()
    correct_answers = models.JSONField(null=True, blank=True)
    score = models.FloatField(null=True, blank=True)
    submitted_at = models.DateTimeField(auto_now_add=True)

class Question(models.Model):
    exam = models.ForeignKey(Exam, related_name='questions', on_delete=models.CASCADE)
    question_text = models.TextField()
    choices = models.JSONField(default=list)
    correct_answer = models.IntegerField()

class UserProgress(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    module = models.ForeignKey(Module, on_delete=models.CASCADE)
    lesson = models.ForeignKey(Lesson, on_delete=models.CASCADE, null=True, blank=True)
    exam = models.ForeignKey(Exam, on_delete=models.CASCADE, null=True, blank=True)
    completed = models.BooleanField(default=False)
    score = models.FloatField(null=True, blank=True)

    def save(self, *args, **kwargs):
        if self.lesson and self.exam:
            raise ValidationError("A progress record can't be tied to both a lesson and an exam.")
        super(UserProgress, self).save(*args, **kwargs)

    def mark_completed(self, score=None):
        self.completed = True
        if score is not None:
            self.score = score
        self.save()
