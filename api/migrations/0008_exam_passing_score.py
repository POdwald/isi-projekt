# Generated by Django 5.0.6 on 2024-06-02 11:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0007_examattempt_correct_answers'),
    ]

    operations = [
        migrations.AddField(
            model_name='exam',
            name='passing_score',
            field=models.FloatField(blank=True, null=True),
        ),
    ]