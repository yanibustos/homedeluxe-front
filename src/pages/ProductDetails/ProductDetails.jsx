import React, { useState, useEffect } from "react";
import Carousel from "react-bootstrap/Carousel";
import "./ProductDetails.css";
import { toast } from "react-toastify";
import FeaturedCarousel from "../../components/FeaturedCarousel/FeaturedCarousel";
import { addToCart } from "../../redux/shoppingCartSlice";
import Loading from "../../components/Loading/Loading";
import NotFound from "../../components/Error/NotFound/NotFound";

import fetchApi from "../../api/fetchApi";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";

function ProductDetails() {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");
  const dispatch = useDispatch();

  const params = useParams();

  useEffect(() => {
    getProduct();
  }, [params.slug]);

  const getProduct = async () => {
    try {
      const data = await fetchApi({
        method: "get",
        url: `/products/${params.slug}`,
      });
      if (data && data.product) {
        setProduct(data.product);
        setSelectedImage(data.product?.image[0]);
      } else {
        setError("Product not found");
      }
    } catch (err) {
      setError(err.message);
      toast.error("Failed to load product.");
    } finally {
      setLoading(false);
    }
  };

  const handleWishlist = () => {
    toast.warning("Sorry this feature is not available yet");
  };

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  if (loading) {
    return (
      <div className="vh-100">
        <Loading />
      </div>
    );
  }

  if (error) {
    return <NotFound />;
  }

  if (!product) {
    return (
      <div className="text-center">
        <span>Product not found.</span>
      </div>
    );
  }

  return (
    <div className="productDetails-container me-2 overflow-hidden">
      <div className="product-content container position-relative">
        <div className="image-section d-flex">
          <div className="image-thumbnails d-lg-flex flex-column d-none">
            {product?.image?.map((image, index) => (
              <div key={index} className="img-styles ms-5 mt-4">
                <img
                  src={
                    image.includes("http") ? image : `${import.meta.env.VITE_IMAGE_DB_URL}/${image}`
                  }
                  alt={product.name}
                  className={`img-styles thumbnail ${selectedImage === image ? "selected" : ""}`}
                  onClick={() => setSelectedImage(image)}
                />
              </div>
            ))}
          </div>

          <Carousel
            activeIndex={product?.image?.indexOf(selectedImage)}
            onSelect={(selectedIndex) => setSelectedImage(product?.image[selectedIndex])}
            controls={false}
            indicators={false}
            interval={null}
            slide={false}
            className="main-carousel"
          >
            {product?.image?.map((image, index) => (
              <Carousel.Item key={index}>
                <div className="d-flex">
                  <img
                    src={
                      image.includes("http")
                        ? image
                        : `${import.meta.env.VITE_IMAGE_DB_URL}/${image}`
                    }
                    alt={product.name}
                    className="main-image ms-5 mt-3 pt-1 d-lg-flex d-none"
                  />
                </div>
              </Carousel.Item>
            ))}
          </Carousel>

          <div className="carousel-container  mt-4">
            <div className="custom-carousel-controls d-lg-none d-flex justify-content-center">
              <Carousel
                activeIndex={product?.image?.indexOf(selectedImage)}
                onSelect={(selectedIndex) => setSelectedImage(product?.image?.[selectedIndex])}
                controls={false}
                indicators={false}
                interval={null}
                slide={false}
              >
                {product?.image?.map((item, i) => (
                  <Carousel.Item key={i}>
                    <img
                      src={
                        item.includes("http")
                          ? item
                          : `${import.meta.env.VITE_IMAGE_DB_URL}/${item}`
                      }
                      alt={product.name}
                      className="carousel-img ms-3 "
                    />
                  </Carousel.Item>
                ))}
              </Carousel>
            </div>

            <div className="details-section ms-4">
              <div className="custom-carousel-controls pb-5 ms-3 d-flex justify-content-center d-lg-none">
                {product?.image?.map((image, index) => (
                  <button
                    key={index}
                    className={`carousel-btn d-lg-none me-3 mt-3 ${
                      selectedImage === image ? "selected" : ""
                    }`}
                    onClick={() => setSelectedImage(image)}
                  ></button>
                ))}
              </div>
              <h3 className="pb-3">{product?.name}</h3>
              <span className="usd-span fw-bold">
                {product?.currency}
                <span className="ammount fw-bold ps-2">{product?.price}</span>
              </span>
              <p className="my-4 info-paragraph">{product?.info}</p>

              <div className="fixed-buttons ">
                <button className="btn heart-button  bg-white me-3" onClick={handleWishlist}>
                  <span className="text-center">
                    <i className="bi bi-suit-heart"></i>
                  </span>
                </button>
                <button
                  className="buy-button text-uppercase fw-bold"
                  onClick={(e) => {
                    e.preventDefault();
                    handleAddToCart(product);
                  }}
                >
                  Add to cart
                </button>
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
            {product ? <p>{product.description}</p> : <p>Loading product description...</p>}
          </div>
        </div>
      </div>

      <FeaturedCarousel />
    </div>
  );
}

export default ProductDetails;
