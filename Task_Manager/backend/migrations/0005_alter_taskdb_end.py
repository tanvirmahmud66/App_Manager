# Generated by Django 4.2.7 on 2023-11-17 18:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0004_alter_taskdb_end'),
    ]

    operations = [
        migrations.AlterField(
            model_name='taskdb',
            name='end',
            field=models.TimeField(blank=True, null=True),
        ),
    ]
