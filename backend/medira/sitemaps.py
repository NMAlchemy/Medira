from django.contrib.sitemaps import Sitemap
from .models import User

class ArtisanSitemap(Sitemap):
    changefreq = 'weekly'
    priority = 0.9

    def items(self):
        return User.objects.filter(is_artisan=True, artisanprofile__verified=True)

    def location(self, obj):
        return f'/artisan/{obj.id}'
