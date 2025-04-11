import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { Link } from "react-router-dom";

import "swiper/css";
import "swiper/css/navigation";

import fetchApi from "../../api/fetchApi.js";

import "./FeaturedCarousel.css";

/* const slides = [
  {
    name: "BESTPLUMA M Fiber Pillow",
    price: 100,
    default:
      "https://f.fcdn.app/imgs/ead870/www.viasono.com.uy/viasuy/2b3d/webp/catalogo/B104010058_104010010_1/460x460/almohada-de-fibra-bestpluma-m.jpg",
    hover:
      "https://f.fcdn.app/imgs/9cd79c/www.viasono.com.uy/viasuy/92bb/webp/catalogo/B104010058_104010010_2/460x460/almohada-de-fibra-bestpluma-m.jpg",
    url: "/products",
  },
  {
    name: "White Microfiber Sheet, Single Size",
    price: 80,
    default:
      "https://f.fcdn.app/imgs/05fb5a/www.viasono.com.uy/viasuy/68bf/webp/catalogo/B304031669_304030163_1/460x460/sabana-microfiber-blanco-1-plaza.jpg",
    hover:
      "https://f.fcdn.app/imgs/5780e6/www.viasono.com.uy/viasuy/586f/webp/catalogo/B304031669_304030163_2/460x460/sabana-microfiber-blanco-1-plaza.jpg",
    url: "/products",
  },
  {
    name: "Intimissimi White Sheet, Double Size",
    price: 290,
    default:
      "https://f.fcdn.app/imgs/e96fc1/www.viasono.com.uy/viasuy/8eed/webp/catalogo/B304031924_304031925_1/460x460/sabana-intimissimi-blanco-2-plazas.jpg",
    hover:
      "https://f.fcdn.app/imgs/a0954b/www.viasono.com.uy/viasuy/07c6/webp/catalogo/B304031924_304031925_2/460x460/sabana-intimissimi-blanco-2-plazas.jpg",
    url: "/products",
  },
  {
    name: "Essential Retro Duvet Beige, Double Size",
    price: 250,
    default:
      "https://f.fcdn.app/imgs/f808ac/www.viasono.com.uy/viasuy/d6e2/webp/catalogo/B304051927_304051250_1/460x460/edredon-retro-esencial-beige-2-plazas.jpg",
    hover:
      "https://f.fcdn.app/imgs/f5bcf8/www.viasono.com.uy/viasuy/adce/webp/catalogo/B304051927_304051250_2/460x460/edredon-retro-esencial-beige-2-plazas.jpg",
    url: "/products",
  },
  {
    name: "Essential Retro Duvet Beige, Double Size",
    price: 240,
    default:
      "https://f.fcdn.app/imgs/b79bde/www.viasono.com.uy/viasuy/46e1/webp/catalogo/B304071675_304070052_1/460x460/cubrecama-bamboo-muslin-blanco-1-plaza.jpg",
    hover:
      "https://f.fcdn.app/imgs/035170/www.viasono.com.uy/viasuy/075b/webp/catalogo/B304071675_304070052_2/460x460/cubrecama-bamboo-muslin-blanco-1-plaza.jpg",
    url: "/products",
  },
  {
    name: "BESTPLUMA M Fiber Pillow",
    price: 100,
    default:
      "https://f.fcdn.app/imgs/ead870/www.viasono.com.uy/viasuy/2b3d/webp/catalogo/B104010058_104010010_1/460x460/almohada-de-fibra-bestpluma-m.jpg",
    hover:
      "https://f.fcdn.app/imgs/9cd79c/www.viasono.com.uy/viasuy/92bb/webp/catalogo/B104010058_104010010_2/460x460/almohada-de-fibra-bestpluma-m.jpg",
    url: "/products",
  },
  {
    name: "White Microfiber Sheet, Single Size",
    price: 80,
    default:
      "https://f.fcdn.app/imgs/05fb5a/www.viasono.com.uy/viasuy/68bf/webp/catalogo/B304031669_304030163_1/460x460/sabana-microfiber-blanco-1-plaza.jpg",
    hover:
      "https://f.fcdn.app/imgs/5780e6/www.viasono.com.uy/viasuy/586f/webp/catalogo/B304031669_304030163_2/460x460/sabana-microfiber-blanco-1-plaza.jpg",
    url: "/products",
  },
  {
    name: "Intimissimi White Sheet, Double Size",
    price: 290,
    default:
      "https://f.fcdn.app/imgs/e96fc1/www.viasono.com.uy/viasuy/8eed/webp/catalogo/B304031924_304031925_1/460x460/sabana-intimissimi-blanco-2-plazas.jpg",
    hover:
      "https://f.fcdn.app/imgs/a0954b/www.viasono.com.uy/viasuy/07c6/webp/catalogo/B304031924_304031925_2/460x460/sabana-intimissimi-blanco-2-plazas.jpg",
    url: "/products",
  },
  {
    name: "Essential Retro Duvet Beige, Double Size",
    price: 250,
    default:
      "https://f.fcdn.app/imgs/f808ac/www.viasono.com.uy/viasuy/d6e2/webp/catalogo/B304051927_304051250_1/460x460/edredon-retro-esencial-beige-2-plazas.jpg",
    hover:
      "https://f.fcdn.app/imgs/f5bcf8/www.viasono.com.uy/viasuy/adce/webp/catalogo/B304051927_304051250_2/460x460/edredon-retro-esencial-beige-2-plazas.jpg",
    url: "/products",
  },
  {
    name: "Essential Retro Duvet Beige, Double Size",
    price: 240,
    default:
      "https://f.fcdn.app/imgs/b79bde/www.viasono.com.uy/viasuy/46e1/webp/catalogo/B304071675_304070052_1/460x460/cubrecama-bamboo-muslin-blanco-1-plaza.jpg",
    hover:
      "https://f.fcdn.app/imgs/035170/www.viasono.com.uy/viasuy/075b/webp/catalogo/B304071675_304070052_2/460x460/cubrecama-bamboo-muslin-blanco-1-plaza.jpg",
    url: "/products",
  },
]; */

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
    <div className="featuredCarousel-container">
      <div className="container position-relative">
        <h3 className="text-center heading">Our Customer Favorites</h3>
        <div className="pt-3">
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
                          : `${import.meta.env.VITE_SUPABASE_URL}/${product.image[0]}`
                      }
                      alt={product.name}
                      className="default"
                    />
                    <img
                      src={
                        product.image[1].includes("http")
                          ? product.image[1]
                          : `${import.meta.env.VITE_SUPABASE_URL}/${product.image[1]}`
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
  );
}

export default FeaturedCarousel;
