from django.contrib import admin

from .models import AppointmentRequest, Faq, Testimonial


@admin.register(AppointmentRequest)
class AppointmentRequestAdmin(admin.ModelAdmin):
    list_display = ['full_name', 'phone', 'email', 'treatment', 'preferred_date', 'is_handled', 'created_at']
    list_filter = ['is_handled', 'treatment', 'created_at']
    list_editable = ['is_handled']
    search_fields = ['full_name', 'phone', 'email']


@admin.register(Testimonial)
class TestimonialAdmin(admin.ModelAdmin):
    list_display = ['name', 'treatment', 'rating', 'order', 'is_published']
    list_editable = ['order', 'is_published']


@admin.register(Faq)
class FaqAdmin(admin.ModelAdmin):
    list_display = ['question', 'open_by_default', 'order', 'is_published']
    list_editable = ['open_by_default', 'order', 'is_published']
