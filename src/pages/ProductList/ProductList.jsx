import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import fetchApi from "../../api/fetchApi";
import currencyFormatter from "../../helpers/formatPrice";
import { addToCart } from "../../redux/shoppingCartSlice";
import ProductCartQty from "../../components/commons/ProductCartQty/ProductCartQty";
import CustomSelect from "../../components/commons/CustomSelect/CustomSelect";
import BlackButton from "../../components/commons/BlackButton/BlackButton";
import Loading from "../../components/Loading/Loading";
import ChevronIcon from "../../components/commons/Chevron/ChevronIcon";

import "./ProductList.css";

//Uncomment when not using DB
// const products = [
//   {
//     id: "d5XJf9QzL3Kv7yW8A1mN",
//     name: "SOFA SENSE White 2-Seater",
//     sku: "SKU001",
//     price: 890,
//     description:
//       "Two-Seater Sofa, upholstered in soft off-white fabric, ideal for creating an elegant and cozy atmosphere in your home.",
//     quantity: 15,
//     category: "Sofas and Armchairs",
//     image:
//       "https://f.fcdn.app/imgs/24194d/www.viasono.com.uy/viasuy/18b0/webp/catalogo/B204051941_204050283_1/460x460/sofa-sense-blanco-2-cuerpos.jpg",
//     slug: "sofa-sense-white-2-seater",
//   },
//   {
//     id: "B2aZ7YpXq9Jv5rT6C0Lj",
//     name: "Captivating Brown Circular Coffee Table",
//     sku: "SKU002",
//     price: 990,
//     description:
//       "Captivating brown circular coffee table, perfect for enhancing any living room décor.",
//     quantity: 23,
//     category: "Coffee Tables",
//     image:
//       "https://f.fcdn.app/imgs/5a0333/www.viasono.com.uy/viasuy/91bf/webp/catalogo/B205041844_205040167_1/460x460/mesa-de-centro-cautiva-marron-circular.jpg",
//     slug: "coffee-table-cautiva-brown-circular",
//   },
//   {
//     id: "B2aZ7YpXq9Jv5rT6C0Lh",
//     name: "URBAN BEIGE Right Modular Sofa",
//     sku: "SKU003",
//     price: 4610,
//     description:
//       "Four-seater modular sofa with right chaise, upholstered in beige fabric, perfect for creating a modern and cozy atmosphere.",
//     quantity: 12,
//     category: "Modular Sofas",
//     image:
//       "https://f.fcdn.app/imgs/8cadb0/www.viasono.com.uy/viasuy/00e4/webp/catalogo/B204071264_204070080_1/460x460/sofa-modular-urban-beige-derecho.jpg",
//     slug: "four-seater-modular-sofa-right-chaise-beige",
//   },
//   {
//     id: "d5XJf9QzL3Kv7yW8A1ma",
//     name: "SOFA SENSE White 2-Seater",
//     sku: "SKU001",
//     price: 890,
//     description:
//       "Two-Seater Sofa, upholstered in soft off-white fabric, ideal for creating an elegant and cozy atmosphere in your home.",
//     quantity: 15,
//     category: "Sofas and Armchairs",
//     image:
//       "https://f.fcdn.app/imgs/24194d/www.viasono.com.uy/viasuy/18b0/webp/catalogo/B204051941_204050283_1/460x460/sofa-sense-blanco-2-cuerpos.jpg",
//     slug: "sofa-sense-white-2-seater",
//   },
//   {
//     id: "B2aZ7YpXq9Jv5rT6C0Lr",
//     name: "Captivating Brown Circular Coffee Table",
//     sku: "SKU002",
//     price: 990,
//     description:
//       "Captivating brown circular coffee table, perfect for enhancing any living room décor.",
//     quantity: 23,
//     category: "Coffee Tables",
//     image:
//       "https://f.fcdn.app/imgs/5a0333/www.viasono.com.uy/viasuy/91bf/webp/catalogo/B205041844_205040167_1/460x460/mesa-de-centro-cautiva-marron-circular.jpg",
//     slug: "coffee-table-cautiva-brown-circular",
//   },
//   {
//     id: "B2aZ7YpXq9Jv5rT6C0Lq",
//     name: "URBAN BEIGE Right Modular Sofa",
//     sku: "SKU003",
//     price: 4610,
//     description:
//       "Four-seater modular sofa with right chaise, upholstered in beige fabric, perfect for creating a modern and cozy atmosphere.",
//     quantity: 12,
//     category: "Modular Sofas",
//     image:
//       "https://f.fcdn.app/imgs/8cadb0/www.viasono.com.uy/viasuy/00e4/webp/catalogo/B204071264_204070080_1/460x460/sofa-modular-urban-beige-derecho.jpg",
//     slug: "four-seater-modular-sofa-right-chaise-beige",
//   },
// ];

function ProductList() {
  const [products, setProducts] = useState([]);
  const shoppingCart = useSelector((state) => state.shoppingCart);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const [showCategories, setShowCategories] = useState(false);
  const [showPrice, setShowPrice] = useState(false);

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

  const handleFilter = () => {
    toast.warning("Not available yet");
  };

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  const isProductIncart = (productId) => {
    return shoppingCart.some((item) => item.id === productId);
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
                  <div className="categories" onClick={() => setShowCategories(!showCategories)}>
                    <div className="d-flex justify-content-between align-items-center">
                      <p className="filter-heading mb-0">Categories</p>
                      <ChevronIcon isOpen={showCategories} />
                    </div>
                    {showCategories && (
                      <div className={`pt-3 filter-by-category ${showCategories ? "show" : ""}`}>
                        <p className="mb-1">Armchairs (20)</p>
                        <p>Sofas (12)</p>
                      </div>
                    )}
                  </div>
                  <hr />
                  <div className="price mb-3" onClick={() => setShowPrice(!showPrice)}>
                    <div className="d-flex justify-content-between align-items-center">
                      <p className="filter-heading mb-0">Price (USD)</p>
                      <ChevronIcon isOpen={showPrice} />
                    </div>
                    {showPrice && (
                      <form className={`filter-by-price-wrapper pt-3 ${showPrice ? "show" : ""}`}>
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
                        <BlackButton className="btn-price-filter mt-3">OK</BlackButton>
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
                        <span>{currencyFormatter(product.price)}</span>
                      </div>
                      {product?.image?.length > 0 && (
                        <img src={product.image[0]} className="card-img-top" alt={product.name} />
                      )}
                    </div>
                    <div className="p-4">
                      <p className="accesories-text fw-bold">{product.category}</p>
                      <h2 className="fw-bold main-text-card">{product.name}</h2>
                      <div className="div-border my-4"></div>
                      <div className="text-description mb-4">
                        <p>{product.description}</p>
                      </div>
                      {!isProductIncart(product.id) ? (
                        <button
                          className="card-text-btn rounded-pill"
                          onClick={() => handleAddToCart(product)}
                          disabled={product.stock === 0}
                        >
                          <span>{product.stock !== 0 ? "Add to cart" : "Out of stock"}</span>
                        </button>
                      ) : (
                        <div className="btn-update-cart rounded-pill btn-outline">
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
