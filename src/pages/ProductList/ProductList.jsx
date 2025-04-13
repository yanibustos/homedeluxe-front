import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import fetchApi from "../../api/fetchApi";
import currencyFormatter from "../../helpers/formatPrice";
import { addToCart } from "../../redux/shoppingCartSlice";
import ProductCartQty from "../../components/commons/ProductCartQty/ProductCartQty";
import CustomSelect from "../../components/commons/CustomSelect/CustomSelect";
import BlackButton from "../../components/commons/BlackButton/BlackButton";
import Loading from "../../components/Loading/Loading";
import ChevronIcon from "../../components/commons/Chevron/ChevronIcon";

import "./ProductList.css";

function ProductList() {
  const [products, setProducts] = useState([]);
  const shoppingCart = useSelector((state) => state.shoppingCart);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const [showCategories, setShowCategories] = useState(false);
  const [showPrice, setShowPrice] = useState(false);

  const categories = ["Armchairs", "Sofas"];

  const getProducts = async () => {
    try {
      const data = await fetchApi({ method: "get", url: "/products" });
      setProducts(data);
    } catch (err) {
      setError(err.message);
      /*  toast.error("Failed to load products."); */
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  const isProductIncart = (productId) => {
    return shoppingCart.some((item) => item.id === productId);
  };

  const handleCategoryFilter = (e) => {
    toast.warning("Sorry, this feature is still under development");
  };

  return (
    <div className="productList-container overflow-hidden">
      <div className="container header-container d-md-flex justify-content-between align-items-center mt-4">
        <div className="text-center div-text-category">
          {products.length > 0 && <h5 className="fw-bold main-text text-uppercase">Products</h5>}
        </div>
        <div className="div-search-products">
          <div className="filter-wrapper d-flex">
            <span className="text-secondary items">{products.length} items</span>

            <span
              className="filter-btn btn-standard"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasFilter"
            >
              <i className="bi bi-funnel-fill"></i> <span className="filter-text">Filter</span>
            </span>
            <div
              className="offcanvas offcanvas-start"
              tabIndex="-1"
              id="offcanvasFilter"
              aria-labelledby="offcanvasFilterLabel"
            >
              <div className="offcanvas-body">
                <div className="filter-options">
                  <div className="categories">
                    <div
                      className="d-flex justify-content-between align-items-center"
                      onClick={() => setShowCategories(!showCategories)}
                    >
                      <p className="filter-heading mb-0">Categories</p>
                      <ChevronIcon isOpen={showCategories} />
                    </div>
                    {showCategories && (
                      <div className={`pt-2 filter-by-category ${showCategories ? "show" : ""}`}>
                        <ul className="list-unstyled d-flex flex-column gap-1">
                          {categories.map((category, index) => (
                            <li key={index} onClick={handleCategoryFilter}>
                              {category}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                  <hr />
                  <div className="price mb-3">
                    <div
                      className="d-flex justify-content-between align-items-center"
                      onClick={() => setShowPrice(!showPrice)}
                    >
                      <p className="filter-heading mb-0">Price (USD)</p>
                      <ChevronIcon isOpen={showPrice} />
                    </div>
                    {showPrice && (
                      <form
                        className={`filter-by-price-wrapper pt-3 ps-0 pe-0 ${
                          showPrice ? "show" : ""
                        }`}
                      >
                        <div className="d-flex gap-2">
                          <label htmlFor="minPrice" className="form-label" hidden>
                            Min Price
                          </label>
                          <input type="number" id="minPrice" placeholder=" Min Price" />
                          <span className="align-self-center">-</span>
                          <label htmlFor="maxPrice" className="form-label" hidden>
                            Max Price
                          </label>
                          <input type="number" id="maxPrice" placeholder=" Max Price" />
                        </div>
                        <BlackButton className="btn-price-filter mt-3" disabled>
                          OK
                        </BlackButton>
                      </form>
                    )}
                  </div>
                  <hr />
                </div>
                <button className="btn01 btn-standard border-0" data-bs-dismiss="offcanvas">
                  View Products
                </button>
              </div>
            </div>
          </div>
          <CustomSelect />
        </div>
      </div>
      <hr />

      <div className="container content-container">
        {!loading ? (
          products.length > 0 ? (
            <div className="d-flex flex-wrap my-4 justify-content-center text-center all-cards">
              {products.map((product) => (
                <Link key={product.id} to={`/products/${product.slug}`}>
                  <div className="p-0 mx-4 my-4 card-container mb-4">
                    <div className="card position-relative">
                      <div className="position-absolute rounded-circle d-flex justify-content-center align-items-center flex-wrap gap-1 price-container">
                        <small>{product.currency}</small>
                        {/* TODO: Check currencyFormatter and how affects price style */}
                        <span>{product.price}</span>
                      </div>
                      {product?.image?.length > 0 && (
                        <img
                          src={
                            product.image[0].includes("http")
                              ? product.image[0]
                              : `${import.meta.env.VITE_IMAGE_DB_URL}/${product.image[0]}`
                          }
                          className="card-img-top"
                          alt={product.name}
                        />
                      )}
                    </div>
                    <div className="p-4">
                      <p className="accesories-text fw-bold">{product.category.name}</p>
                      <h2 className="fw-bold main-text-card">{product.name}</h2>
                      <div className="div-border my-4"></div>
                      <div className="text-description mb-4">
                        <p>{product.description}</p>
                      </div>
                      {!isProductIncart(product.id) ? (
                        <button
                          className="card-text-btn rounded-pill"
                          onClick={(e) => {
                            e.preventDefault();
                            handleAddToCart(product);
                          }}
                          disabled={product.stock === 0}
                        >
                          <span>{product.stock !== 0 ? "Add to cart" : "Out of stock"}</span>
                        </button>
                      ) : (
                        <div
                          className="btn-update-cart rounded-pill btn-outline"
                          onClick={(e) => {
                            e.preventDefault();
                          }}
                        >
                          <ProductCartQty
                            product={shoppingCart.find((item) => item.id === product.id)}
                            inCard
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-5">
              <h3 className="fw-bold text-secondary">No products available</h3>
              <p className="text-secondary">Try adjusting your filters or check back later.</p>
            </div>
          )
        ) : (
          <Loading />
        )}
      </div>
    </div>
  );
}

export default ProductList;
