import Hero from "../../components/Hero/Hero";
import WhyChooseUs from "../../components/WhyChooseUs/WhyChooseUs";
import Categories from "../../components/Categories/Categories";
import Testimoniasl from "../../components/Testimonials/Testimoniasl";
//import FeaturedCarousel from "../../components/FeaturedCarousel/FeaturedCarousel";

import "./Home.css";

function Home() {
  return (
    <div className="home-container">
      <Hero />
      <WhyChooseUs />
      <Categories />
      <Testimoniasl />
      {/* <FeaturedCarousel /> */}
    </div>
  );
}
export default Home;
