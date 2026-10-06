from rest_framework import generics
from rest_framework.decorators import api_view
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from .models import AppointmentRequest, Faq, Testimonial
from .serializers import AppointmentRequestSerializer, FaqSerializer, TestimonialSerializer


@api_view(['GET'])
def health(request):
    return Response({'status': 'ok'})


class TestimonialList(generics.ListAPIView):
    queryset = Testimonial.objects.filter(is_published=True)
    serializer_class = TestimonialSerializer
    pagination_class = None


class FaqList(generics.ListAPIView):
    queryset = Faq.objects.filter(is_published=True)
    serializer_class = FaqSerializer
    pagination_class = None


class AppointmentRequestCreate(generics.CreateAPIView):
    queryset = AppointmentRequest.objects.all()
    serializer_class = AppointmentRequestSerializer
    permission_classes = [AllowAny]
