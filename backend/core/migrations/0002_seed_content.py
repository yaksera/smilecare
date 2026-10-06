from django.db import migrations

TESTIMONIALS = [
    {
        'treatment': 'Whitening',
        'rating': 5,
        'quote': (
            '“I finally did the whitening treatment I’d been putting off for years. It was quick, painless, '
            'and I’m still catching myself smiling at photos now.”'
        ),
        'name': 'Sofia Martinez',
        'role': 'Whitening Patient',
        'image': '/images/patient-sofia.jpg',
    },
]

FAQS = [
    (
        'How much will my visit cost?',
        'Costs depend on the treatment you need. After your consultation we’ll give you a clear estimate before any work begins.',
        False,
    ),
    (
        'Are veneers right for me?',
        "If you're looking to change the shape, color, or spacing of your front teeth, veneers are usually a great fit "
        "— we'll confirm during a short consultation.",
        True,
    ),
    (
        'What happens during a tooth filling?',
        'We numb the area, remove the decay, and shape a tooth-colored composite to match your bite '
        '— most fillings take under an hour.',
        True,
    ),
    (
        'How often should I have tartar removed?',
        'Most patients benefit from a professional cleaning every six months, though some need more frequent visits '
        'depending on their gum health.',
        True,
    ),
    (
        'How do I know which treatment is right for me?',
        'Book a consultation and we’ll examine your teeth, talk through what you’d like to change, '
        'and recommend the options that suit you.',
        False,
    ),
]


def seed(apps, schema_editor):
    Testimonial = apps.get_model('core', 'Testimonial')
    Faq = apps.get_model('core', 'Faq')
    for i, t in enumerate(TESTIMONIALS):
        Testimonial.objects.create(order=i, **t)
    for i, (q, a, open_) in enumerate(FAQS):
        Faq.objects.create(question=q, answer=a, open_by_default=open_, order=i)


def unseed(apps, schema_editor):
    apps.get_model('core', 'Testimonial').objects.all().delete()
    apps.get_model('core', 'Faq').objects.all().delete()


class Migration(migrations.Migration):
    dependencies = [('core', '0001_initial')]
    operations = [migrations.RunPython(seed, unseed)]
