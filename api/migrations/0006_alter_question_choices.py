# Generated by Django 5.0.6 on 2024-06-01 18:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0005_examattempt'),
    ]

    operations = [
        migrations.AlterField(
            model_name='question',
            name='choices',
            field=models.JSONField(default=list),
        ),
    ]
