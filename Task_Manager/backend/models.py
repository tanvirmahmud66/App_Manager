from django.db import models


#=================================== Email Models
class EmailData(models.Model):
    email = models.EmailField(unique=True)
    verified = models.BooleanField(default=False, null=True, blank=True)

    class Meta:
        verbose_name = "Email Database"
        verbose_name_plural = "Emails Database"

    def __str__(self):
        return self.email





#-----------------------------------Task manager Models.
class TaskDB(models.Model):
    email = models.ForeignKey(EmailData, on_delete=models.CASCADE)
    task = models.TextField()
    complete = models.BooleanField(default=False)
    start = models.DateTimeField(null=True, blank=True)
    end = models.TimeField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = "Task Database"
        verbose_name_plural = "Task Database"

    def __str__(self):
        return self.task
