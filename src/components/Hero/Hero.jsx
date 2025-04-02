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
    caption: "Transform your home, transform your life",
  },
  {
    id: 2,
    image: "./img/hero/slide2.webp",
    url: "/products",
    caption: "Sweet Dreams Begin with the Perfect Bed!",
  },
  {
    id: 3,
    image: "./img/hero/slide3.webp",
    url: "/products",
    caption: "Now More Affordable Than Ever.",
  },
  {
    id: 4,
    image: "./img/hero/slide4.webp",
    url: "/products",
    caption: "Dine in Comfort, Live in Elegance",
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
          delay: 5000,
        }}
        effect="fade"
        speed={2000}
        onSlideChange={handleSlideChange}
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="slide-content position-relative">
              <Link to={slide.url}>
                <img src={slide.image} alt={`Slide ${slide.id}`} />
              </Link>
              <div className={`caption-container ${captionVisible ? "visible" : ""}`}>
                <div className="slide-caption">{slide.caption}</div>
                <Link to={slide.url}>
                  <button className="slide-button">Shop Now</button>
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default Hero;
