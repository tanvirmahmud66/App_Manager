# Generated by Django 4.2.7 on 2023-11-15 13:01

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='EmailData',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('email', models.EmailField(max_length=254, unique=True)),
                ('verified', models.BooleanField(default=False)),
            ],
            options={
                'verbose_name': 'Email Database',
                'verbose_name_plural': 'Emails Database',
            },
        ),
    ]