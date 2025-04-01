import React from "react";
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
    image: "./img/hero/slide1.png",
    url: "/products",
  },
  {
    id: 2,
    image: "./img/hero/slide2.png",
    url: "/products",
  },
  {
    id: 3,
    image: "./img/hero/slide3.png",
    url: "/products",
  },
  {
    id: 3,
    image: "./img/hero/slide4.png",
    url: "/products",
  },
];

function Hero() {
  return (
    <div className="home-swipper">
      <Swiper
        modules={[Pagination, Autoplay, EffectFade]}
        pagination={{ clickable: true }}
        loop={true}
        spaceBetween={50}
        slidesPerView={1}
        autoplay={{
          delay: 5000,
        }}
        effect="fade"
        speed={2000}
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <Link to={slide.url}>
              <img src={slide.image} alt={`Slide ${slide.id}`} />
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default Hero;
