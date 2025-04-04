import FeaturedCarousel from "../../components/FeaturedCarousel/FeaturedCarousel";
import Hero from "../../components/Hero/Hero";

import "./Home.css";

function Home() {
  return (
    <div className="home-container">
      <Hero />
      <FeaturedCarousel />
    </div>
  );
}

export default Home;
