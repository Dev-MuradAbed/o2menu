import { Navbar } from "../components/navbar";
import HeroSection from "../components/hero-section";
import { AboutSection } from "../components/about-section";
import { ServicesSection } from "../components/services-section";
import { ReviewsSection } from "../components/reviews-section";
// import { StatsSection } from "../components/stats-section";
// import { GallerySection } from "../components/gallery-section";
import { ContactSection } from "../components/contact-section";
import { Footer } from "../components/Footer";
import Branches from "../components/branches-section";
import { SplashScreen } from "../components/splash-screen";

export default function Home() {
  return (
    <SplashScreen>
      <main className="min-h-screen bg-background overflow-x-hidden">
        <Navbar />
        <HeroSection />
        <div className="section-red-line" />
        <AboutSection />
        <div className="section-red-line" />
        <ServicesSection />
        <div className="section-red-line" />
        <Branches />
        <div className="section-red-line" />
        <ReviewsSection />
        {/* <StatsSection /> */}
        {/* <GallerySection /> */}
        <div className="section-red-line" />
        <ContactSection />
        <div className="section-red-line" />
        <Footer />
      </main>
    </SplashScreen>
  );
}
