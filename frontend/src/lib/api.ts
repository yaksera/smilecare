import { DEFAULT_FAQS, DEFAULT_TESTIMONIALS, type Faq, type Testimonial } from "./content";

export const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

type ApiTestimonial = {
  treatment: string;
  rating: number;
  quote: string;
  name: string;
  role: string;
  image: string | null;
};

type ApiFaq = { question: string; answer: string; open_by_default: boolean };

async function getJson<T>(path: string): Promise<T | null> {
  try {
    const res = await fetch(`${API_URL}${path}`, {
      next: { revalidate: 60 },
      signal: AbortSignal.timeout(2500),
    });
    return res.ok ? ((await res.json()) as T) : null;
  } catch {
    return null; // backend offline — fall back to the design copy
  }
}

export async function getTestimonials(): Promise<Testimonial[]> {
  const data = await getJson<ApiTestimonial[]>("/api/testimonials/");
  if (!data?.length) return DEFAULT_TESTIMONIALS;
  return data.map((t) => ({
    treatment: t.treatment.toUpperCase(),
    rating: t.rating,
    quote: t.quote,
    name: t.name,
    role: t.role,
    image: t.image || DEFAULT_TESTIMONIALS[0].image,
  }));
}

export async function getFaqs(): Promise<Faq[]> {
  const data = await getJson<ApiFaq[]>("/api/faqs/");
  if (!data?.length) return DEFAULT_FAQS;
  return data.map((f) => ({ question: f.question, answer: f.answer, openByDefault: f.open_by_default }));
}
