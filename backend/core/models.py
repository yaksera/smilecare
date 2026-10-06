from django.db import models


class Testimonial(models.Model):
    treatment = models.CharField(max_length=60, help_text='Shown as the small label, e.g. "Whitening".')
    rating = models.PositiveSmallIntegerField(default=5)
    quote = models.TextField()
    name = models.CharField(max_length=120)
    role = models.CharField(max_length=120, help_text='e.g. "Whitening Patient".')
    image = models.CharField(
        max_length=255,
        blank=True,
        help_text="Image path inside frontend/public, e.g. /images/patient-sofia.jpg. Leave blank for the default photo.",
    )
    order = models.PositiveIntegerField(default=0)
    is_published = models.BooleanField(default=True)

    class Meta:
        ordering = ['order', 'id']

    def __str__(self):
        return f'{self.name} — {self.treatment}'


class Faq(models.Model):
    question = models.CharField(max_length=200)
    answer = models.TextField()
    open_by_default = models.BooleanField(default=False)
    order = models.PositiveIntegerField(default=0)
    is_published = models.BooleanField(default=True)

    class Meta:
        ordering = ['order', 'id']
        verbose_name = 'FAQ'

    def __str__(self):
        return self.question


class AppointmentRequest(models.Model):
    full_name = models.CharField(max_length=120)
    phone = models.CharField(max_length=32)
    email = models.EmailField(blank=True)
    treatment = models.CharField(max_length=60, blank=True)
    preferred_date = models.DateField(null=True, blank=True)
    message = models.TextField(blank=True)
    is_handled = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f'{self.full_name} ({self.phone})'
