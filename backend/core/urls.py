from django.urls import path

from . import views

urlpatterns = [
    path('health/', views.health),
    path('testimonials/', views.TestimonialList.as_view()),
    path('faqs/', views.FaqList.as_view()),
    path('appointments/', views.AppointmentRequestCreate.as_view()),
]
