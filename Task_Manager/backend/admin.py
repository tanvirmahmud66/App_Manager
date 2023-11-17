from django.contrib import admin
from .models import EmailData, TaskDB



# Register your models here.
class EmailDataAdmin(admin.ModelAdmin):
    list_display = ('id', 'email', 'verified')


# =====================================Task Manager
class TaskDBAdmin(admin.ModelAdmin):
    list_display = ('id', 'email','task', 'complete','start', 'end','created_at')






admin.site.register(EmailData, EmailDataAdmin)
admin.site.register(TaskDB, TaskDBAdmin)

