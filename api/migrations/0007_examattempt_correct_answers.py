# Generated by Django 5.0.6 on 2024-06-01 20:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0006_alter_question_choices'),
    ]

    operations = [
        migrations.AddField(
            model_name='examattempt',
            name='correct_answers',
            field=models.JSONField(blank=True, null=True),
        ),
    ]
