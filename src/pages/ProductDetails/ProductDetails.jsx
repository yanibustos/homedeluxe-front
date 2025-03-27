import React, { useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import "./ProductDetails.css";

const images = [
  "https://f.fcdn.app/imgs/c8671a/www.viasono.com.uy/viasuy/ed68/webp/catalogo/B101021325_101020107_1/460x460/colchon-de-espuma-travel-1-plaza.jpg",
  "https://f.fcdn.app/imgs/f46744/www.viasono.com.uy/viasuy/e3ee/webp/catalogo/B101021325_101020107_2/460x460/colchon-de-espuma-travel-1-plaza.jpg",
  "https://f.fcdn.app/imgs/4a3fc6/www.viasono.com.uy/viasuy/0d19/webp/catalogo/B101021325_101020107_3/460x460/colchon-de-espuma-travel-1-plaza.jpg",
  "https://f.fcdn.app/imgs/dc39a3/www.viasono.com.uy/viasuy/3504/webp/catalogo/B101021325_101020107_4/460x460/colchon-de-espuma-travel-1-plaza.jpg",
  "https://f.fcdn.app/imgs/98edda/www.viasono.com.uy/viasuy/3e9e/webp/catalogo/B101021325_101020107_5/460x460/colchon-de-espuma-travel-1-plaza.jpg",
];

const ProductDetails = () => {
  const [index, setIndex] = useState(0);

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
              <h3>COLCHÓN DE ESPUMA TRAVEL 1 PLAZA</h3>
              <span className="usd-span fw-bold">
                USD<span className="ammount fw-bold"> 590</span>
              </span>
              <p className="my-4">
                Comodidad intermedia con espuma de alta resiliencia y tela Viscosa. Soporte ideal
                para un descanso confortable y duradero.
              </p>
              <div className="fixed-buttons">
                <button className="btn heart-button  bg-white me-3">
                  <span className="text-center">
                    <i class="bi bi-suit-heart"></i>
                  </span>
                </button>
                <button className="buy-button fw-bold">COMPRAR</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="description-section container">
        <div className="d-flex  flex-column justify-content-center align-items-center">
          <span className="description-text position-relative py-4">Descripción </span>
        </div>
        <hr />
        <div className="text-description ">
          <p>
            <strong>Travel Viasano: Confort Compacto y Soporte Óptimo</strong>
          </p>
          <p>
            <strong>Sensación intermedia:</strong> El colchón Travel Viasono ofrece una firmeza
            intermedia, ideal para quienes buscan un descanso equilibrado. Su pillow con espuma HR
            D32 proporciona una superficie adaptable y cómoda para un sueño reparador.
          </p>
          <p>
            <strong>Sistema de Espuma 32D:</strong> Con un sistema de espuma de alta densidad, el
            Travel Viasono asegura un soporte confiable de hasta 120 kg por lado, promoviendo una
            alineación saludable de la columna.
          </p>
          <p>
            <strong>Materiales de Calidad:</strong> Revestido con una mezcla de tela viscosa y
            algodón orgánico, el Travel Viasono crea un entorno de descanso suave y natural.
          </p>
          <p>
            <strong>Altura Compacta y Funcional:</strong> Con una altura de 15 cm, este colchón es
            ideal para espacios compactos, ofreciendo funcionalidad sin comprometer el confort.
          </p>
          <p>Con 5 años de garantía, el Travel Viasono es una inversión en descanso duradero.</p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
