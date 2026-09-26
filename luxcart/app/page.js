import CategoriesSection from "../components/CategoriesSection";
import FeaturedProducts from "../components/FeaturedProducts";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";
import SaleBanner from "../components/SaleBanner";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <CategoriesSection />
        <FeaturedProducts />
        <SaleBanner />
        <Newsletter />
      </main>
      <Footer />
    </>
  );
}