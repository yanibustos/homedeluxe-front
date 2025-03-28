import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, EffectFade } from "swiper/modules";
import { Link } from "react-router-dom";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

import "./index.css";

const slides = [
  {
    id: 1,
    image:
      "https://f.fcdn.app/imgs/7d0621/www.viasono.com.uy/viasuy/644d/webp/recursos/1517/1920x1100/banner-kids-1920-x-1100.jpg",
    url: "/products",
  },
  {
    id: 2,
    image:
      "https://f.fcdn.app/imgs/64487c/www.viasono.com.uy/viasuy/25f7/webp/recursos/1480/1920x1100/alma-collection25.jpg",
    url: "/products",
  },
  {
    id: 3,
    image:
      "https://f.fcdn.app/imgs/7d3dc1/www.viasono.com.uy/viasuy/9acc/webp/recursos/1227/1920x1100/1920x1100-7.jpg",
    url: "/products",
  },
  {
    id: 4,
    image:
      "https://f.fcdn.app/imgs/ae1b19/www.viasono.com.uy/viasuy/23ea/webp/recursos/1380/1920x1100/1920x1100-3.jpg",
    url: "/products",
  },
];

function Index() {
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

export default Index;
