import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

import CategoryCard from "../CategoryCard/CategoryCard";
import fetchApi from "../../api/fetchApi";
import useMediaQuery from "../../hooks/useMediaQuery";

import "./Categories.css";

function CategoryList() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [categories, setCategories] = useState([]);
  const isTablet = useMediaQuery("(max-width: 991px)");

  const getCategories = async () => {
    try {
      const response = await fetchApi({ method: "get", url: "/categories" });
      setCategories(response.categories);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    categories.length > 0 && (
      <div className="category-list-container">
        <div className="container">
          {!isTablet ? (
            <>
              <div className="row first-row justify-content-start d-flex position-relative">
                {categories.slice(0, 3).map((category) => (
                  <div className="col-2" key={category.id}>
                    <CategoryCard image={category.image} name={category.name} />
                  </div>
                ))}
                <div className="col-3 align-self-center content">
                  <h3 className="title fw-bold">Smart Offers</h3>
                  <p>Explore exclusive deals to transform your home with style</p>
                  <Link to="/products">
                    <button className="btn-standard btn01 border-0">Explore Now</button>
                  </Link>
                </div>
              </div>
              <div className="row second-row justify-content-start justify-content-lg-end mt-5">
                {categories
                  .filter((category) => !category.name.includes("Uncategorized"))
                  .slice(3, 8)
                  .map((category) => (
                    <div className="col-2" key={category.id}>
                      <CategoryCard image={category.image} name={category.name} />
                    </div>
                  ))}
              </div>
            </>
          ) : (
            <div className="row mobile-wrapper">
              <div className="col-12 align-self-center text-center content">
                <h3 className="title fw-bold">Smart Offers</h3>
                <p>Explore exclusive deals to transform your home with style</p>
                <Link to="/products">
                  <button className="btn-standard btn01 border-0">Explore Now</button>
                </Link>
              </div>
              <div className="mt-1">
                <Swiper
                  modules={[Navigation, Autoplay]}
                  navigation
                  loop
                  spaceBetween={20}
                  breakpoints={{
                    1024: { slidesPerView: 5 },
                    768: { slidesPerView: 3 },
                    480: { slidesPerView: 2 },
                  }}
                >
                  {categories
                    .filter((category) => !category.name.includes("Uncategorized"))
                    .map((category) => (
                      <SwiperSlide key={category.id}>
                        <div className="slide-content position-relative">
                          <Link to={`/products/categories/${category.slug}`}>
                            <img src={category.image} alt={`Slide ${category.id}`} />
                          </Link>
                        </div>
                      </SwiperSlide>
                    ))}
                </Swiper>
              </div>
            </div>
          )}
        </div>
      </div>
    )
  );
}

export default CategoryList;
