from rest_framework import serializers

from .models import AppointmentRequest, Faq, Testimonial


class TestimonialSerializer(serializers.ModelSerializer):
    class Meta:
        model = Testimonial
        fields = ['treatment', 'rating', 'quote', 'name', 'role', 'image']


class FaqSerializer(serializers.ModelSerializer):
    class Meta:
        model = Faq
        fields = ['question', 'answer', 'open_by_default']


class AppointmentRequestSerializer(serializers.ModelSerializer):
    preferred_date = serializers.DateField(required=False, allow_null=True)

    class Meta:
        model = AppointmentRequest
        fields = ['id', 'full_name', 'phone', 'email', 'treatment', 'preferred_date', 'message', 'created_at']
        read_only_fields = ['id', 'created_at']

    def to_internal_value(self, data):
        # The form sends an empty string when no date is picked.
        if hasattr(data, 'copy'):
            data = data.copy()
        if data.get('preferred_date') == '':
            data['preferred_date'] = None
        return super().to_internal_value(data)
