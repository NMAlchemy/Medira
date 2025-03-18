from django.contrib import admin
from django.urls import path, include
from django.contrib.sitemaps.views import sitemap
from repair_platform.sitemaps import ArtisanSitemap

sitemaps = {'artisans': ArtisanSitemap}

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('repair_platform.urls')),
    path('sitemap.xml', sitemap, {'sitemaps': sitemaps}, name='sitemap'),
]
