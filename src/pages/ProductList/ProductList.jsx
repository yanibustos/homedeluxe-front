import { toast } from "react-toastify";
import "./ProductList.css";

const products = [
  {
    id: "d5XJf9QzL3Kv7yW8A1mN",
    name: "SOFA SENSE White 2-Seater",
    sku: "SKU001",
    price: 890,
    description:
      "Two-Seater Sofa, upholstered in soft off-white fabric, ideal for creating an elegant and cozy atmosphere in your home.",
    quantity: 15,
    category: "Sofas and Armchairs",
    image:
      "https://f.fcdn.app/imgs/24194d/www.viasono.com.uy/viasuy/18b0/webp/catalogo/B204051941_204050283_1/460x460/sofa-sense-blanco-2-cuerpos.jpg",
    slug: "sofa-sense-white-2-seater",
  },
  {
    id: "B2aZ7YpXq9Jv5rT6C0Lg",
    name: "Captivating Brown Circular Coffee Table",
    sku: "SKU002",
    price: 990,
    description:
      "Captivating brown circular coffee table, perfect for enhancing any living room décor.",
    quantity: 23,
    category: "Coffee Tables",
    image:
      "https://f.fcdn.app/imgs/5a0333/www.viasono.com.uy/viasuy/91bf/webp/catalogo/B205041844_205040167_1/460x460/mesa-de-centro-cautiva-marron-circular.jpg",
    slug: "coffee-table-cautiva-brown-circular",
  },
  {
    id: "B2aZ7YpXq9Jv5rT6C0Lg",
    name: "URBAN BEIGE Right Modular Sofa",
    sku: "SKU003",
    price: 4610,
    description:
      "Four-seater modular sofa with right chaise, upholstered in beige fabric, perfect for creating a modern and cozy atmosphere.",
    quantity: 12,
    category: "Modular Sofas",
    image:
      "https://f.fcdn.app/imgs/8cadb0/www.viasono.com.uy/viasuy/00e4/webp/catalogo/B204071264_204070080_1/460x460/sofa-modular-urban-beige-derecho.jpg",
    slug: "four-seater-modular-sofa-right-chaise-beige",
  },
  {
    id: "d5XJf9QzL3Kv7yW8A1mN",
    name: "SOFA SENSE White 2-Seater",
    sku: "SKU001",
    price: 890,
    description:
      "Two-Seater Sofa, upholstered in soft off-white fabric, ideal for creating an elegant and cozy atmosphere in your home.",
    quantity: 15,
    category: "Sofas and Armchairs",
    image:
      "https://f.fcdn.app/imgs/24194d/www.viasono.com.uy/viasuy/18b0/webp/catalogo/B204051941_204050283_1/460x460/sofa-sense-blanco-2-cuerpos.jpg",
    slug: "sofa-sense-white-2-seater",
  },
  {
    id: "B2aZ7YpXq9Jv5rT6C0Lg",
    name: "Captivating Brown Circular Coffee Table",
    sku: "SKU002",
    price: 990,
    description:
      "Captivating brown circular coffee table, perfect for enhancing any living room décor.",
    quantity: 23,
    category: "Coffee Tables",
    image:
      "https://f.fcdn.app/imgs/5a0333/www.viasono.com.uy/viasuy/91bf/webp/catalogo/B205041844_205040167_1/460x460/mesa-de-centro-cautiva-marron-circular.jpg",
    slug: "coffee-table-cautiva-brown-circular",
  },
  {
    id: "B2aZ7YpXq9Jv5rT6C0Lg",
    name: "URBAN BEIGE Right Modular Sofa",
    sku: "SKU003",
    price: 4610,
    description:
      "Four-seater modular sofa with right chaise, upholstered in beige fabric, perfect for creating a modern and cozy atmosphere.",
    quantity: 12,
    category: "Modular Sofas",
    image:
      "https://f.fcdn.app/imgs/8cadb0/www.viasono.com.uy/viasuy/00e4/webp/catalogo/B204071264_204070080_1/460x460/sofa-modular-urban-beige-derecho.jpg",
    slug: "four-seater-modular-sofa-right-chaise-beige",
  },
];

function ProductList() {
  const handleFilter = () => {
    toast.warning("Not available yet");
  };
  return (
    <div className="productList-container overflow-hidden">
      <div className="container header-container d-md-flex justify-content-between mt-4">
        <div className="text-center div-text-category">
          <h5 className="fw-bold main-text ">MATTRESSES AND SOMMIERS</h5>
        </div>
        <div className="text-center div-search-products">
          <span className="pe-3 d-md-inline-block d-none">{products.length} items</span>
          <button
            className="filter-btn"
            onClick={() => {
              handleFilter();
            }}
          >
            <i class="bi bi-funnel-fill"></i> <span className="filter-text">Filter</span>
          </button>
          <select
            name="order"
            className="ms-3 p-1 select-option "
            onChange={() => {
              handleFilter();
            }}
          >
            <option value="recommended" selected>
              Recommended
            </option>
            <option value="recent">Recent</option>
            <option value="category">Category</option>
            <option value="lowerPrice">Lower Price</option>
            <option value="higherPrice">Higher Price</option>
          </select>
        </div>
      </div>
      <hr />

      <div className="container">
        <div className="container-fluid">
          <div className="d-flex flex-wrap mt-4 justify-content-center text-center all-cards py-5">
            {products.map((product) => (
              <div key={product.id} className="p-0 mx-4 my-4 card-container mb-4">
                <div className="card position-relative">
                  <div className="position-absolute rounded-circle d-flex justify-content-center align-items-center price-container">
                    <span>
                      <span className="usd-text">USD </span>

                      {product.price}
                    </span>
                  </div>
                  <img src={product.image} className="card-img-top" alt={product.name} />
                </div>
                <div className="p-4">
                  <p className="accesories-text fw-bold">{product.category}</p>
                  <h2 className="fw-bold main-text-card">{product.name}</h2>
                  <div className="div-border my-4"></div>
                  <div className="text-description mb-4">
                    <p>{product.description}</p>
                  </div>
                  <button className="card-text-btn rounded-pill">
                    <span>Add to cart</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductList;
