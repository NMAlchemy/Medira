from rest_framework import serializers
from .models import User, ArtisanProfile, Message, Booking, VerificationRequest, Advertisement, Referral

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'is_artisan', 'phone_number', 'location']

class ArtisanProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = ArtisanProfile
        fields = ['user', 'skills', 'verified']

class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = '__all__'

class BookingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Booking
        fields = '__all__'

class VerificationRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = VerificationRequest
        fields = ['artisan', 'document']

class AdvertisementSerializer(serializers.ModelSerializer):
    class Meta:
        model = Advertisement
        fields = ['artisan', 'tier']

class ReferralSerializer(serializers.ModelSerializer):
    class Meta:
        model = Referral
        fields = ['referred_email']
