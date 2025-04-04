import React, { useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import "./ProductDetails.css";
import { toast } from "react-toastify";

const images = [
  "https://f.fcdn.app/imgs/c8671a/www.viasono.com.uy/viasuy/ed68/webp/catalogo/B101021325_101020107_1/460x460/colchon-de-espuma-travel-1-plaza.jpg",
  "https://f.fcdn.app/imgs/f46744/www.viasono.com.uy/viasuy/e3ee/webp/catalogo/B101021325_101020107_2/460x460/colchon-de-espuma-travel-1-plaza.jpg",
  "https://f.fcdn.app/imgs/4a3fc6/www.viasono.com.uy/viasuy/0d19/webp/catalogo/B101021325_101020107_3/460x460/colchon-de-espuma-travel-1-plaza.jpg",
  "https://f.fcdn.app/imgs/dc39a3/www.viasono.com.uy/viasuy/3504/webp/catalogo/B101021325_101020107_4/460x460/colchon-de-espuma-travel-1-plaza.jpg",
  "https://f.fcdn.app/imgs/98edda/www.viasono.com.uy/viasuy/3e9e/webp/catalogo/B101021325_101020107_5/460x460/colchon-de-espuma-travel-1-plaza.jpg",
];

const ProductDetails = () => {
  const [index, setIndex] = useState(0);
  const handleWishlist = () => {
    toast.warning("Not available yet");
  };

  return (
    <div className="productDetails-container me-2 overflow-hidden">
      <div className="product-content container position-relative">
        <div className="image-section d-flex">
          <div className="image-thumbnails d-lg-flex flex-column d-none">
            {images.map((src, i) => (
              <div key={i} className="img-styles ms-5 mt-4">
                <img
                  src={src}
                  alt={`Miniatura ${i}`}
                  className={`img-styles thumbnail ${index === i ? "selected" : ""}`}
                  onClick={() => setIndex(i)}
                />
              </div>
            ))}
          </div>

          <Carousel
            activeIndex={index}
            onSelect={(selectedIndex) => setIndex(selectedIndex)}
            controls={false}
            indicators={false}
            interval={null}
            slide={false}
            className="main-carousel"
          >
            {images.map((src, i) => (
              <Carousel.Item key={i}>
                <div className="d-flex">
                  <img
                    src={src}
                    alt={`Slide ${i}`}
                    className="main-image ms-5 mt-4 d-lg-flex d-none"
                  />
                </div>
              </Carousel.Item>
            ))}
          </Carousel>

          <div className="carousel-container carousel-img mt-4">
            <div className="custom-carousel-controls d-lg-none me-3 d-flex justify-content-center">
              <Carousel
                activeIndex={index}
                onSelect={(selectedIndex) => setIndex(selectedIndex)}
                controls={false}
                indicators={false}
                interval={null}
                slide={false}
              >
                {images.map((src, i) => (
                  <Carousel.Item key={i}>
                    <img src={src} alt={`Slide ${i}`} className="carousel-img ms-3 " />
                    <div className="custom-carousel-controls  ms-3 d-flex justify-content-center">
                      {images.map((_, i) => (
                        <button
                          key={i}
                          className={`carousel-btn d-lg-none me-3 mt-3 ${
                            index === i ? "active" : ""
                          }`}
                          onClick={() => setIndex(i)}
                        ></button>
                      ))}
                    </div>
                  </Carousel.Item>
                ))}
              </Carousel>
            </div>

            <div className="details-section ms-4 mt-1 pt-3">
              <h3>TRAVEL FOAM MATTRESS 1 PLACE</h3>
              <span className="usd-span fw-bold">
                USD<span className="ammount fw-bold"> 590</span>
              </span>
              <p className="my-4">
                Intermediate comfort with high resilience foam and Viscose fabric. Ideal support for
                a comfortable and lasting rest.
              </p>
              <div className="fixed-buttons">
                <button
                  className="btn heart-button  bg-white me-3"
                  onClick={() => {
                    handleWishlist();
                  }}
                >
                  <span className="text-center">
                    <i className="bi bi-suit-heart"></i>
                  </span>
                </button>
                <button className="buy-button text-uppercase fw-bold">Add to cart</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="description-section container">
        <div className="d-flex  flex-column justify-content-center align-items-center">
          <span className="description-text position-relative py-4">Description </span>
        </div>
        <hr />
        <div className="text-description ">
          <p>
            <strong>Travel Viasano: Compact Comfort and Optimal Support</strong>
          </p>
          <p>
            <strong>Intermediate feel:</strong> The Travel Viasono mattress offers an intermediate
            firmness, ideal for those seeking a balanced rest. Its pillow with HR D32 foam provides
            an adaptable and comfortable surface for a restful sleep.
          </p>
          <p>
            <strong>32D Foam System:</strong> With a high-density foam system, the Travel Viasono
            ensures reliable support of up to 120 kg per side, promoting healthy spinal alignment.
          </p>
          <p>
            <strong>Quality Materials:</strong> Covered with a blend of viscose fabric and organic
            cotton, the Travel Viasono creates a soft and natural sleeping environment.
          </p>
          <p>
            <strong>Compact and Functional Height:</strong> With a height of 15 cm, this mattress is
            ideal for compact spaces, offering functionality without compromising comfort.
          </p>
          <p>With a 5-year warranty, the Travel Viasono is an investment in lasting rest.</p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
