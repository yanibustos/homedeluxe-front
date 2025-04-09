import React, { useState, useEffect } from "react";
import Carousel from "react-bootstrap/Carousel";
import "./ProductDetails.css";
import { toast } from "react-toastify";
import FeaturedCarousel from "../../components/FeaturedCarousel/FeaturedCarousel";
import fetchApi from "../../api/fetchApi";

function ProductDetails() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    try {
      const data = await fetchApi({ method: "get", url: "/products" });
      setProducts(data);
      setSelectedImage(data[0]?.image[0]);
    } catch (err) {
      setError(err.message);
      toast.error("Failed to load products.");
    } finally {
      setLoading(false);
    }
  };

  const handleWishlist = () => {
    toast.warning("Not available yet");
  };

  const limitedImages = products
    .filter((product) => product?.image?.length > 0)
    .map((product) => ({ image: product.image[0], name: product.name, id: product.id }))
    .slice(0, 4);

  return (
    <div className="productDetails-container me-2 overflow-hidden">
      <div className="product-content container position-relative">
        <div className="image-section d-flex">
          <div className="image-thumbnails d-lg-flex flex-column d-none">
            {limitedImages.map((product) => (
              <div key={product.id} className="img-styles ms-5 mt-4">
                <img
                  src={product.image}
                  alt={product.name}
                  className={`img-styles thumbnail ${
                    selectedImage === product.image ? "selected" : ""
                  }`}
                  onClick={() => setSelectedImage(product.image)}
                />
              </div>
            ))}
          </div>

          <Carousel
            activeIndex={limitedImages.findIndex((product) => product.image === selectedImage)}
            onSelect={(selectedIndex) => setSelectedImage(limitedImages[selectedIndex]?.image)}
            controls={false}
            indicators={false}
            interval={null}
            slide={false}
            className="main-carousel"
          >
            {limitedImages.map((product) => (
              <Carousel.Item key={product.id}>
                <div className="d-flex">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="main-image ms-5 mt-3 pt-1 d-lg-flex d-none"
                  />
                </div>
              </Carousel.Item>
            ))}
          </Carousel>

          <div className="carousel-container carousel-img mt-4">
            <div className="custom-carousel-controls d-lg-none d-flex justify-content-center">
              <Carousel
                activeIndex={limitedImages.findIndex((product) => product.image === selectedImage)}
                onSelect={(selectedIndex) => setSelectedImage(limitedImages[selectedIndex]?.image)}
                controls={false}
                indicators={false}
                interval={null}
                slide={false}
              >
                {limitedImages.map((product) => (
                  <Carousel.Item key={product.id}>
                    <img src={product.image} alt={product.name} className="carousel-img ms-3 " />
                    <div className="custom-carousel-controls ms-3 d-flex justify-content-center">
                      {limitedImages.map((productBtn) => (
                        <button
                          key={productBtn.id}
                          className={`carousel-btn d-lg-none me-3 mt-3 ${
                            selectedImage === productBtn.image ? "selected" : ""
                          }`}
                          onClick={() => setSelectedImage(productBtn.image)}
                        ></button>
                      ))}
                    </div>
                  </Carousel.Item>
                ))}
              </Carousel>
            </div>

            <div className="details-section ms-4 ">
              <h3>TRAVEL FOAM MATTRESS 1 PLACE</h3>
              <span className="usd-span fw-bold">
                USD<span className="ammount fw-bold"> 590</span>
              </span>
              <p className="my-4 ">
                Intermediate comfort with high resilience foam and Viscose fabric. Ideal support for
                a comfortable and lasting rest.
              </p>

              <div className="fixed-buttons ">
                <button className="btn heart-button  bg-white me-3" onClick={handleWishlist}>
                  <span className="text-center">
                    <i className="bi bi-suit-heart"></i>
                  </span>
                </button>
                <button className="buy-button text-uppercase fw-bold ">Add to cart</button>
              </div>
              <div className="payments-methods  mt-4 ms-1">
                <i className="payment-icon pe-4 bi bi-paypal fs-3"></i>
                <i className="payment-icon bi bi-credit-card fs-3"></i>
              </div>

              <div className="card-icons  p-2 mt-4">
                <div className="pb-2 d-flex align-items-center">
                  <i className="icons ms-2 bi bi-credit-card-2-front"></i>
                  <span className="ms-2 ps-1 text-icons">
                    Up to 12 installments with no additional charge
                  </span>
                </div>
                <div className="pb-2">
                  <i className="icons ms-2 bi bi-truck"></i>
                  <span className="ms-2 ps-1 text-icons">Free shipping</span>
                </div>

                <div className="pb-2">
                  <i className="icons ms-2 bi bi-arrow-return-left"></i>
                  <span className="ms-2 ps-1 text-icons">Free return</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="description-section container p-5">
          <div className="d-flex  flex-column justify-content-center align-items-center">
            <span className="description-text position-relative py-4">Description </span>
          </div>
          <hr />
          <div className="text-description mx-5 my-5">
            <p>
              <strong>Travel Viasano: Compact Comfort and Optimal Support</strong>
            </p>
            <p>
              <strong>Intermediate feel:</strong> The Travel Viasono mattress offers an intermediate
              firmness, ideal for those seeking a balanced rest. Its pillow with HR D32 foam
              provides an adaptable and comfortable surface for a restful sleep.
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
              <strong>Compact and Functional Height:</strong> With a height of 15 cm, this mattress
              is ideal for compact spaces, offering functionality without compromising comfort.
            </p>
            <p>With a 5-year warranty, the Travel Viasono is an investment in lasting rest.</p>
          </div>
        </div>
      </div>

      <FeaturedCarousel />
    </div>
  );
}

export default ProductDetails;
