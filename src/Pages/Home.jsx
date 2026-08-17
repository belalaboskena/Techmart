import Hero from "../components/home/Hero";
import ShopbyCategory from "../components/home/ShopbyCategory";
import Bestsellers from "../components/home/Bestsellers";
import Sales from "../components/home/Salles";
import Brands from "../components/home/Brands";
import WhyChosseUs from "../components/home/WhyChosseUs";
import Reviews from "../components/home/Reviews";
import HomeHeader from "../components/Header/HomeHeader";
import MainHeader from "../components/Header/MainHeader";
import Newarrivals from "../components/home/Newarrivals";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import ScrollToHero from "../components/home/ScrollToHero";
function Home() {
  const location = useLocation();

  useEffect(() => {
    if (location.state?.section) {
      const element = document.getElementById(location.state.section);

      if (!element) return;

      const y = element.getBoundingClientRect().top + window.pageYOffset - 68;

      window.scrollTo({
        top: y,
        behavior: "smooth",
      });
    }
  }, [location]);
  return (
    <>
      <MainHeader />
      <section id="hero">
        <HomeHeader />
      </section>
      <section>
        <Hero />
      </section>

      <section id="shop">
        <ShopbyCategory />
      </section>
      <section id="new-arrivals">
        <Newarrivals />
      </section>
      <section id="best-sellers">
        <Bestsellers />
      </section>
      <section id="sales">
        <Sales />
      </section>
      <Brands />
      <section id="about-us">
        <WhyChosseUs />
      </section>
      <Reviews />
      <ScrollToHero />
    </>
  );
}

export default Home;
