// Default copy from the Smile Care design. FAQs and testimonials are replaced by
// the Django API when it is reachable (see lib/api.ts), so the clinic can edit them in the admin.

export type Testimonial = {
  treatment: string;
  rating: number;
  quote: string;
  name: string;
  role: string;
  image: string;
};

export type Faq = {
  question: string;
  answer: string;
  openByDefault: boolean;
};

export const PHONE_DISPLAY = "+977 9812345678";
export const PHONE_DISPLAY_ALT = "(977) 9812345678";
export const PHONE_HREF = "tel:+9779812345678";
export const EMAIL = "contact@smilecare.com";
export const ADDRESS = "123, Newroad, Kathmandu";
export const HOURS = "Mon–Fri 8am–6pm, Sat 9am–2pm";

export const NAV_LINKS = [
  { label: "Services", href: "#services" },
  { label: "Why Us", href: "#why-us" },
  { label: "Reviews", href: "#reviews" },
  { label: "FAQs", href: "#faqs" },
];

export const DEFAULT_TESTIMONIALS: Testimonial[] = [
  {
    treatment: "WHITENING",
    rating: 5,
    quote:
      "“I finally did the whitening treatment I’d been putting off for years. It was quick, painless, and I’m still catching myself smiling at photos now.”",
    name: "Sofia Martinez",
    role: "Whitening Patient",
    image: "/images/patient-sofia.jpg",
  },
];

export const DEFAULT_FAQS: Faq[] = [
  {
    question: "How much will my visit cost?",
    answer:
      "Costs depend on the treatment you need. After your consultation we’ll give you a clear estimate before any work begins.",
    openByDefault: false,
  },
  {
    question: "Are veneers right for me?",
    answer:
      "If you're looking to change the shape, color, or spacing of your front teeth, veneers are usually a great fit — we'll confirm during a short consultation.",
    openByDefault: true,
  },
  {
    question: "What happens during a tooth filling?",
    answer:
      "We numb the area, remove the decay, and shape a tooth-colored composite to match your bite — most fillings take under an hour.",
    openByDefault: true,
  },
  {
    question: "How often should I have tartar removed?",
    answer:
      "Most patients benefit from a professional cleaning every six months, though some need more frequent visits depending on their gum health.",
    openByDefault: true,
  },
  {
    question: "How do I know which treatment is right for me?",
    answer:
      "Book a consultation and we’ll examine your teeth, talk through what you’d like to change, and recommend the options that suit you.",
    openByDefault: false,
  },
];
