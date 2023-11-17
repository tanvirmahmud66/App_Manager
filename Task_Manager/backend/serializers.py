from rest_framework import serializers 
from .models import EmailData, TaskDB



# =========================================================EmailAuth Serializer
class EmailAuthSerializer(serializers.ModelSerializer):
    class Meta:
        model = EmailData
        fields = "__all__"


# =========================================================TaskDB Serializer
class TaskDBSerializer(serializers.ModelSerializer):
    class Meta:
        model = TaskDB
        fields = "__all__"