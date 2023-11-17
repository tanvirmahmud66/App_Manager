
from django.contrib import admin
from django.urls import path, include
from . import views


urlpatterns = [
    path('email/auth/', views.EmailAuth.as_view(), name='Email Auth'),

    path('task/<int:email_id>/', views.TaskView.as_view(), name='task view'),
    path('task/completed/<int:email_id>/', views.TaskViewAddtional.as_view(), name='task view'),
]