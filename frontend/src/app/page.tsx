import { BookingDialog } from "@/components/BookingDialog";
import { Contact } from "@/components/Contact";
import { Difference } from "@/components/Difference";
import { Faqs } from "@/components/Faqs";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Marquee } from "@/components/Marquee";
import { Motion } from "@/components/Motion";
import { Preloader, ProgressBar } from "@/components/Preloader";
import { Services } from "@/components/Services";
import { Stories } from "@/components/Stories";
import { Team } from "@/components/Team";
import { getFaqs, getTestimonials } from "@/lib/api";

export default async function Home() {
  const [testimonials, faqs] = await Promise.all([getTestimonials(), getFaqs()]);

  return (
    <>
      <Preloader />
      <ProgressBar />
      <Header />
      <Motion>
        <main>
          <Hero />
          <Marquee />
          <Services />
          <Difference />
          <Team />
          <Stories testimonials={testimonials} />
          <Faqs faqs={faqs} />
          <Contact />
        </main>
        <Footer />
      </Motion>
      <BookingDialog />
    </>
  );
}
