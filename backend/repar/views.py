from rest_framework import generics, status, serializers
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate
from django.core.mail import send_mail
import stripe
import shippo
import random
import string
from .models import User, ArtisanProfile, Message, Booking, VerificationRequest, Advertisement, Referral
from .serializers import UserSerializer, BookingSerializer, VerificationRequestSerializer, AdvertisementSerializer, ReferralSerializer
from .tasks import send_promo_email

stripe.api_key = 'your_stripe_secret_key'
shippo.config.api_key = 'your_shippo_api_key'

class RegisterView(generics.CreateAPIView):
    serializer_class = UserSerializer
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            user.set_password(request.data['password'])
            user.save()
            token, _ = Token.objects.get_or_create(user=user)
            return Response({'token': token.key}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LoginView(generics.GenericAPIView):
    def post(self, request):
        user = authenticate(username=request.data['username'], password=request.data['password'])
        if user:
            token, _ = Token.objects.get_or_create(user=user)
            return Response({'token': token.key})
        return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

class SearchArtisansView(generics.ListAPIView):
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]
    def get_queryset(self):
        query = self.request.query_params.get('q', '')
        location = self.request.query_params.get('location', '')
        return User.objects.filter(
            is_artisan=True, artisanprofile__skills__icontains=query, location__icontains=location, artisanprofile__verified=True
        )

class BookingView(generics.ListCreateAPIView):
    queryset = Booking.objects.all()
    serializer_class = BookingSerializer
    permission_classes = [IsAuthenticated]

class PaymentView(generics.GenericAPIView):
    permission_classes = [IsAuthenticated]
    def post(self, request):
        amount = request.data['amount']
        intent = stripe.PaymentIntent.create(amount=amount, currency='usd', metadata={'user_id': request.user.id})
        return Response({'client_secret': intent['client_secret']})

class LogisticsView(generics.GenericAPIView):
    permission_classes = [IsAuthenticated]
    def post(self, request):
        shipment = shippo.Shipment.create(
            address_from={'name': request.user.username, 'street1': request.data['from_address']},
            address_to={'name': request.data['artisan_name'], 'street1': request.data['to_address']},
            parcels=[{'length': '5', 'width': '5', 'height': '5', 'distance_unit': 'in', 'weight': '2', 'mass_unit': 'lb'}],
            async=False
        )
        return Response({'tracking_url': shipment.rates[0].tracking_url_provider})

class VerificationRequestView(generics.CreateAPIView):
    queryset = VerificationRequest.objects.all()
    serializer_class = VerificationRequestSerializer
    permission_classes = [IsAuthenticated]

class AdvertisementView(generics.CreateAPIView):
    queryset = Advertisement.objects.all()
    serializer_class = AdvertisementSerializer
    permission_classes = [IsAuthenticated]
    def perform_create(self, serializer):
        serializer.save(artisan=self.request.user)

class AnalyticsView(generics.GenericAPIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        bookings = Booking.objects.filter(artisan=request.user).count()
        return Response({'total_bookings': bookings})

class SendPromoEmailView(APIView):
    def post(self, request):
        recipient_list = request.data.get('emails', [])
        send_promo_email.delay('Join Now!', 'Special offer for you.', recipient_list)
        return Response({'status': 'Email task queued'})

class ReferralView(generics.CreateAPIView):
    serializer_class = ReferralSerializer
    permission_classes = [IsAuthenticated]
    def perform_create(self, serializer):
        code = ''.join(random.choices(string.ascii_uppercase + string.digits, k=6))
        serializer.save(referrer=self.request.user, code=code)
        send_mail(
            'You’ve Been Invited!',
            f'Use code {code} to join our platform.',
            'your_email@example.com',
            [serializer.validated_data['referred_email']],
      )
