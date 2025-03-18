from django.urls import path
from . import views

urlpatterns = [
    path('api/register/', views.RegisterView.as_view(), name='register'),
    path('api/login/', views.LoginView.as_view(), name='login'),
    path('api/search/', views.SearchArtisansView.as_view(), name='search'),
    path('api/bookings/', views.BookingView.as_view(), name='bookings'),
    path('api/payment/', views.PaymentView.as_view(), name='payment'),
    path('api/logistics/', views.LogisticsView.as_view(), name='logistics'),
    path('api/verify/', views.VerificationRequestView.as_view(), name='verify'),
    path('api/advertise/', views.AdvertisementView.as_view(), name='advertise'),
    path('api/analytics/', views.AnalyticsView.as_view(), name='analytics'),
    path('api/send-promo/', views.SendPromoEmailView.as_view(), name='send-promo'),
    path('api/referral/', views.ReferralView.as_view(), name='referral'),
]
