import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { Link } from "react-router-dom";

import "swiper/css";
import "swiper/css/navigation";

import fetchApi from "../../api/fetchApi.js";

import "./FeaturedCarousel.css";

function FeaturedCarousel() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [products, setProducts] = useState([]);

  const getFeaturedProducts = async () => {
    try {
      const response = await fetchApi({
        method: "get",
        url: "/products/featured",
      });
      setProducts(response.products);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getFeaturedProducts();
  }, []);

  return (
    products.length > 0 && (
      <div className="featuredCarousel-container">
        <div className="container position-relative">
          <h3 className="text-center heading">Our Customer Favorites</h3>
          <div className="pt-4">
            <Swiper
              modules={[Navigation, Autoplay]}
              loop
              spaceBetween={20}
              breakpoints={{
                1024: { slidesPerView: 5 },
                768: { slidesPerView: 3 },
                480: { slidesPerView: 2 },
              }}
              navigation={{
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
              }}
              className="featured-swipper"
            >
              {products.map((product) => (
                <SwiperSlide key={product.id}>
                  <div className="image-hover">
                    <Link to={`/products/${product.slug}`}>
                      <img
                        src={
                          product.image[0].includes("http")
                            ? product.image[0]
                            : `${import.meta.env.VITE_IMAGE_DB_URL}/${product.image[0]}`
                        }
                        alt={product.name}
                        className="default"
                      />
                      <img
                        src={
                          product.image[1].includes("http")
                            ? product.image[1]
                            : `${import.meta.env.VITE_IMAGE_DB_URL}/${product.image[1]}`
                        }
                        alt={`${product.name} hover`}
                        className="hover"
                      />
                    </Link>
                  </div>
                  <Link to={`/products/${product.slug}`} className="product-info">
                    {product.name}
                    <div>
                      <span className="currency">usd </span>
                      <span className="price">{product.price}</span>
                    </div>
                    <p className="fw-normal pt-2 small">12 payments, 0% interest </p>
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>
            <div className="swiper-button-prev" />
            <div className="swiper-button-next" />
          </div>
        </div>
      </div>
    )
  );
}

export default FeaturedCarousel;
