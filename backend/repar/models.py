from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    is_artisan = models.BooleanField(default=False, db_index=True)
    phone_number = models.CharField(max_length=15, blank=True)
    location = models.CharField(max_length=100, blank=True, db_index=True)

class ArtisanProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    skills = models.CharField(max_length=200)
    verified = models.BooleanField(default=False)

class Message(models.Model):
    sender = models.ForeignKey(User, on_delete=models.CASCADE, related_name='sent_messages')
    receiver = models.ForeignKey(User, on_delete=models.CASCADE, related_name='received_messages')
    content = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)

class Booking(models.Model):
    consumer = models.ForeignKey(User, on_delete=models.CASCADE, related_name='bookings')
    artisan = models.ForeignKey(User, on_delete=models.CASCADE, related_name='appointments')
    date = models.DateTimeField()
    status = models.CharField(max_length=20, default='pending')

class VerificationRequest(models.Model):
    artisan = models.ForeignKey(User, on_delete=models.CASCADE)
    document = models.FileField(upload_to='verifications/')
    status = models.CharField(max_length=20, default='pending')

class Advertisement(models.Model):
    artisan = models.ForeignKey(User, on_delete=models.CASCADE)
    tier = models.CharField(max_length=20, choices=[('basic', 'Basic'), ('premium', 'Premium')])
    active = models.BooleanField(default=False)

class Referral(models.Model):
    referrer = models.ForeignKey(User, on_delete=models.CASCADE, related_name='referrals')
    referred_email = models.EmailField()
    code = models.CharField(max_length=10, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
