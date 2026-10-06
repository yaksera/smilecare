# Smile Care — Landing Page

Pixel-matched build of the Smile Care design (1440px desktop frame) with GSAP motion.

- **frontend/** — Next.js 16 (App Router, TypeScript, Tailwind CSS v4, GSAP)
- **backend/** — Django 6.1 + Django REST Framework

## Run it

Backend:

```bash
cd backend
python -m venv .venv
.venv\Scripts\activate            # macOS/Linux: source .venv/bin/activate
pip install -r requirements.txt
python manage.py migrate          # also seeds the design's testimonial and FAQs
python manage.py createsuperuser  # login for /admin
python manage.py runserver 8000
```

Frontend (second terminal):

```bash
cd frontend
copy .env.example .env.local      # macOS/Linux: cp; set NEXT_PUBLIC_API_URL to your Django URL
npm install
npm run dev
```

Open http://localhost:3000 — the site also works without the backend (it falls back to the design copy).

## API

| Method | URL | Purpose |
| --- | --- | --- |
| GET | `/api/testimonials/` | Patient stories carousel |
| GET | `/api/faqs/` | FAQ accordion (`open_by_default` controls which start expanded) |
| POST | `/api/appointments/` | "Book an appointment" form |

Everything is editable in the Django admin: testimonials, FAQs (order, publish, open by default)
and incoming appointment requests (tick **handled** once the front desk has called back).
The page re-fetches content every 60 seconds.

## Animations

All motion lives in `frontend/src/components/Motion.tsx` (GSAP + ScrollTrigger, ScrollSmoother, SplitText):

- Preloader counter and curtain, then a hero intro (photo zoom-out, headline letter-by-letter, avatar/star pop-in, rating count-up)
- Rolling-text hover on every link and button (as designed in the Figma file)
- Treatment marquee that loops and speeds up with scroll velocity; slows on hover
- Section eyebrow lines draw in, headings rise line by line, cards and lists stagger in
- Before/after cards: the "after" half is unveiled with a wipe; cards tilt in 3D on hover
- Photo clip reveals with parallax, magnetic CTA buttons, scroll progress line
- Header turns solid after the hero and hides on scroll-down
- GSAP accordion for FAQs and a sliding testimonial carousel

Everything is switched off for visitors with *reduce motion* enabled.

## Design notes

- Font: **Geist** (500 for headings, 400 for body) via `next/font/google`.
- Icons in `components/icons.tsx` were extracted from the design's vector paths.
- Copy is kept exactly as designed, including its spellings
  ("Book an appoinment", "Dental Impacts", "Dental Hygenist", "Veeners", "Tartar Removals", "Why US").
