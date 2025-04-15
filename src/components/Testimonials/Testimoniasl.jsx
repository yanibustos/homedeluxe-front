import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import { BsStarFill } from "react-icons/bs";
import { FiUser } from "react-icons/fi";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import "./Testimonials.css";

const testimonials = [
  {
    name: "Anna",
    text: "The furniture is beautiful and of excellent quality!",
  },
  {
    name: "Carlos",
    text: "Outstanding service and amazing design. Highly recommended!",
  },
  {
    name: "Laura",
    text: "They transformed my home with style. Thank you!",
  },
  {
    name: "Michael",
    text: "Great value for the price. The pieces look stunning in my living room!",
  },
  {
    name: "Sophia",
    text: "Impressed by the craftsmanship and fast delivery. Will definitely shop again!",
  },
];

function Testimoniasl() {
  return (
    <div className="testimonials-container">
      <div className="container">
        <h3 className="heading text-center mb-0">What Our Customers Say</h3>
        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={20}
          breakpoints={{
            1024: { slidesPerView: 3 },
            768: { slidesPerView: 2 },
            480: { slidesPerView: 1 },
          }}
          pagination={{ clickable: true }}
          autoplay={{ delay: 10000 }}
          loop
        >
          {testimonials.map((testimonial, index) => (
            <SwiperSlide key={index}>
              <div className="testimonial-slide p-4 text-center rounded-4 shadow-sm bg-white border">
                <FiUser className="testimonial-avatar-icon mb-3" />
                <div className="text-warning mb-2">
                  <BsStarFill />
                  <BsStarFill />
                  <BsStarFill />
                  <BsStarFill />
                  <BsStarFill />
                </div>
                <p className="mb-3 fst-italic">"{testimonial.text}"</p>
                <p className="fw-bold mb-0">{testimonial.name}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

export default Testimoniasl;
