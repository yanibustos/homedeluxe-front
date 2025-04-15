import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, EffectFade } from "swiper/modules";
import { Link } from "react-router-dom";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

import "./Hero.css";

const slides = [
  {
    id: 1,
    image: "./img/hero/slide1.webp",
    url: "/products",
    caption: "Transform your home, transform your life.",
    highlight: "New Arrival",
  },
  {
    id: 2,
    image: "./img/hero/slide2.webp",
    url: "/products",
    caption: "Sweet Dreams Begin with the Perfect Bed!",
    highlight: "Exclusive",
  },
  {
    id: 3,
    image: "./img/hero/slide3.webp",
    url: "/products",
    caption: "Now More Affordable Than Ever.",
    highlight: "Limited Time",
  },
  {
    id: 4,
    image: "./img/hero/slide4.webp",
    url: "/products",
    caption: "Dine in Comfort, Live in Elegance.",
    highlight: "Top Picks",
  },
];

function Hero() {
  const [captionVisible, setCaptionVisible] = useState(false);

  const handleSlideChange = () => {
    setCaptionVisible(false);
    setTimeout(() => setCaptionVisible(true), 500);
  };

  return (
    <div className="home-swipper">
      <Swiper
        modules={[Pagination, Autoplay, EffectFade]}
        pagination={{ clickable: true }}
        loop
        spaceBetween={50}
        slidesPerView={1}
        slidesPerGroup={1}
        autoplay={{
          delay: 10000,
        }}
        effect="fade"
        speed={2000}
        onSlideChange={handleSlideChange}
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="container position-relative">
              <div className={`caption-container ${captionVisible ? "visible" : ""}`}>
                <p className="slide-heading mb-0">{slide.highlight}</p>
                <p className="slide-caption">{slide.caption}</p>
                <Link to={slide.url}>
                  <button className="slide-button">Shop Now</button>
                </Link>
              </div>
            </div>

            <div className="slide-content">
              <Link to={slide.url}>
                <img src={slide.image} alt={`Slide ${slide.id}`} />
              </Link>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default Hero;
