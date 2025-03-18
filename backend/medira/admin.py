from django.contrib import admin
from .models import VerificationRequest, ArtisanProfile

@admin.register(VerificationRequest)
class VerificationRequestAdmin(admin.ModelAdmin):
    list_display = ['artisan', 'status']
    actions = ['approve']

    def approve(self, request, queryset):
        for req in queryset:
            req.status = 'approved'
            req.save()
            ArtisanProfile.objects.update_or_create(user=req.artisan, defaults={'verified': True})

admin.site.register(ArtisanProfile)
