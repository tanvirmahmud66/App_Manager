import json
import secrets
import string
from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .utils import Util
from django.template.loader import render_to_string
from django.utils.html import strip_tags
from .models import EmailData, TaskDB
from .serializers import EmailAuthSerializer, TaskDBSerializer


#-------------------------- Token generate ---------------------- 
token_set = set()
def generate_token(length):
    characters = string.digits
    token = ''.join(secrets.choice(characters) for _ in range(length))
    length = len(token_set)
    token_set.add(token)
    if len(token_set)==length+1:
        return token
    else:
        generate_token(5)


# Create your views here.
class EmailAuth(APIView):
    def post(self,request):
        email = request.data['email']
        try:
            isEmailThere = EmailData.objects.get(email=email)
            serializer = EmailAuthSerializer(isEmailThere)
            return Response(serializer.data, status=status.HTTP_302_FOUND)
        except Exception as E:
            serializer = EmailAuthSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                subject = 'Welcome to Apps'
                link = f"http://127.0.0.1:3000/#/verified/{email}/{generate_token(5)}"
                html_message = render_to_string('emailVerify.html', {'link':link})
                body = strip_tags(html_message)
                data = {
                    'subject':subject,
                    'body':body,
                    'to_email':email
                }
                Util.send_email(data)
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def put(self, request):
        email = request.data['email']
        emailData = EmailData.objects.get(email=email)
        emailData.verified = True
        emailData.save()
        return Response(status=status.HTTP_200_OK)




# ============================================================== Task Manager View
class TaskView(APIView):
    def get(self, request, email_id):
        all_task = TaskDB.objects.filter(email=email_id, complete=False)
        serializer = TaskDBSerializer(all_task, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request, email_id):
        json_data = json.loads(request.body.decode('utf-8'))
        email = EmailData.objects.get(id=email_id)
        task = json_data.get('task')
        start = json_data.get('start')
        end = json_data.get('end')
        if start is not None and end is not None:
            newTask = TaskDB.objects.create(email=email, task=task, start=start, end=end)
        if start is not None and end is None:
            newTask = TaskDB.objects.create(email=email, task=task, start=start)
        if start is None and end is not None:
            newTask = TaskDB.objects.create(email=email, task=task, end=end)
        if start is None and end is None:
            newTask = TaskDB.objects.create(email=email, task=task)
        serializer = TaskDBSerializer(newTask)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
    def put(self,request,email_id):
        email = EmailData.objects.get(id=email_id)
        task_id = request.data['task_id']
        isComplete = request.data['isComplete']
        getTask = TaskDB.objects.get(id=task_id, email=email)
        getTask.complete = isComplete
        getTask.save()
        serializer = TaskDBSerializer(getTask)
        print(getTask)
        return Response(serializer.data,status=status.HTTP_302_FOUND)


class TaskViewAddtional(APIView):
    def get(self, request, email_id):
        all_completed_task = TaskDB.objects.filter(email=email_id, complete=True)
        serializer = TaskDBSerializer(all_completed_task, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def post(self, request, email_id):
        task_id = request.data['task_id']
        email = EmailData.objects.get(id=email_id)
        getTask = TaskDB.objects.get(email=email, id=task_id)
        getTask.delete()
        return Response(status=status.HTTP_410_GONE)
    
    def put(self, request, email_id):
        task_id = request.data['task_id']
        task_value = request.data['value']
        start_time = request.data['start']
        end_time = request.data['end']
        print(start_time)
        print(end_time)
        email = EmailData.objects.get(id=email_id)
        getTask = TaskDB.objects.get(email=email, id=task_id)
        getTask.task = task_value
        if start_time is not None:
            getTask.start = start_time
        if end_time is not None:
            getTask.end = end_time
        getTask.save()
        return Response(status=status.HTTP_200_OK)

