import { toast } from "react-toastify";
import "./ProductList.css";

function ProductList() {
  const handleFilter = () => {
    toast.warning("Not available yet");
  };
  return (
    <div className="productList-container">
      <div className="container header-container d-md-flex justify-content-between mt-3">
        <div className="text-center div-text-category">
          <h5 className="fw-bold main-text ">MATTRESSES AND SOMMIERS</h5>
        </div>
        <div className="text-center div-search-products">
          <span className="pe-3 d-md-inline-block d-none">6 items</span>
          <button
            className="filter-btn"
            onClick={() => {
              handleFilter();
            }}
          >
            <i class="bi bi-funnel-fill"></i> <span className="filter-text">Filter</span>
          </button>
          <select name="order" className="ms-3 select-option">
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
          <div className="d-flex flex-wrap mt-4 justify-content-center text-center all-cards">
            <div className="p-0 mx-4 my-4   card-container mb-4">
              <div className="card position-relative">
                <div className="position-absolute rounded-circle fw-bold d-flex justify-content-center align-items-center price-container">
                  <span>$15</span>
                </div>
                <img
                  src="https://f.fcdn.app/imgs/98edda/www.viasono.com.uy/viasuy/3e9e/webp/catalogo/B101021325_101020107_5/460x460/colchon-de-espuma-travel-1-plaza.jpg"
                  className="card-img-top"
                  alt="img"
                />
              </div>
              <div className="p-4 ">
                <p className="accesories-text fw-bold">Accesories</p>
                <h2 className="fw-bold main-text-card fs-1">ARTIFIC PLANT</h2>
                <div className="div-border my-4"></div>
                <div className="text-description">
                  <p>
                    Helps you to keep your desk clear from small things such as pens, rulers, mobile
                    phone and USBs. Available in Black / Brown / Beach (all leather).
                  </p>
                </div>
                <button className="card-text-btn  rounded-pill">
                  <span>Add to cart</span>
                </button>
              </div>
            </div>
            <div className=" p-0 mx-4 my-4 card-container mb-4">
              <div className="card position-relative">
                <div className="position-absolute rounded-circle fw-bold d-flex justify-content-center align-items-center price-container">
                  <span className="ammount pe-1">USD</span> <span>1500</span>
                </div>
                <img
                  src="https://f.fcdn.app/imgs/98edda/www.viasono.com.uy/viasuy/3e9e/webp/catalogo/B101021325_101020107_5/460x460/colchon-de-espuma-travel-1-plaza.jpg"
                  className="card-img-top"
                  alt="img"
                />
              </div>
              <div className="p-4">
                <p className="accesories-text fw-bold">Accesories</p>

                <h2 className="fw-bold main-text-card fs-1">ARTIFIC PLANT</h2>
                <div className="div-border my-4"></div>
                <div className="text-description">
                  <p>
                    Helps you to keep your desk clear from small things such as pens, rulers, mobile
                    phone and USBs. Available in Black / Brown / Beach (all leather).
                  </p>
                </div>
                <button className="card-text-btn  rounded-pill">
                  <span>Add to cart</span>
                </button>
              </div>
            </div>

            <div className=" p-0 mx-4 my-4 card-container mb-4">
              <div className="card position-relative">
                <div className="position-absolute rounded-circle fw-bold d-flex justify-content-center align-items-center price-container">
                  <span>$15</span>
                </div>
                <img
                  src="https://f.fcdn.app/imgs/98edda/www.viasono.com.uy/viasuy/3e9e/webp/catalogo/B101021325_101020107_5/460x460/colchon-de-espuma-travel-1-plaza.jpg"
                  className="card-img-top"
                  alt="img"
                />
              </div>
              <div className="p-4">
                <p className="accesories-text fw-bold">Accesories</p>

                <h2 className="fw-bold main-text-card fs-1">ARTIFIC PLANT</h2>
                <div className="div-border my-4"></div>
                <div className="text-description">
                  <p>
                    Helps you to keep your desk clear from small things such as pens, rulers, mobile
                    phone and USBs. Available in Black / Brown / Beach (all leather).
                  </p>
                </div>
                <button className="card-text-btn  rounded-pill">
                  <span>Add to cart</span>
                </button>
              </div>
            </div>
            <div className="  p-0 mx-4 my-4  card-container mb-4">
              <div className="card position-relative">
                <div className="position-absolute rounded-circle fw-bold d-flex justify-content-center align-items-center price-container">
                  <span>$15</span>
                </div>
                <img
                  src="https://f.fcdn.app/imgs/98edda/www.viasono.com.uy/viasuy/3e9e/webp/catalogo/B101021325_101020107_5/460x460/colchon-de-espuma-travel-1-plaza.jpg"
                  className="card-img-top"
                  alt="img"
                />
              </div>
              <div className="p-4">
                <p className="accesories-text fw-bold">Accesories</p>

                <h2 className="fw-bold main-text-card fs-1">ARTIFIC PLANT</h2>
                <div className="div-border my-4"></div>
                <div className="text-description">
                  <p>
                    Helps you to keep your desk clear from small things such as pens, rulers, mobile
                    phone and USBs. Available in Black / Brown / Beach (all leather).
                  </p>
                </div>
                <button className="card-text-btn  rounded-pill">
                  <span>Add to cart</span>
                </button>
              </div>
            </div>
            <div className=" p-0 mx-4 my-4 card-container mb-4">
              <div className="card position-relative">
                <div className="position-absolute rounded-circle fw-bold d-flex justify-content-center align-items-center price-container">
                  <span>$15</span>
                </div>
                <img
                  src="https://f.fcdn.app/imgs/98edda/www.viasono.com.uy/viasuy/3e9e/webp/catalogo/B101021325_101020107_5/460x460/colchon-de-espuma-travel-1-plaza.jpg"
                  className="card-img-top"
                  alt="img"
                />
              </div>
              <div className="p-4">
                <p className="accesories-text fw-bold">Accesories</p>

                <h2 className="fw-bold main-text-card fs-1">ARTIFIC PLANT</h2>
                <div className="div-border my-4"></div>
                <div className="text-description">
                  <p>
                    Helps you to keep your desk clear from small things such as pens, rulers, mobile
                    phone and USBs. Available in Black / Brown / Beach (all leather).
                  </p>
                </div>
                <button className="card-text-btn  rounded-pill">
                  <span>Add to cart</span>
                </button>
              </div>
            </div>
            <div className=" p-0 mx-4 my-4 card-container mb-4">
              <div className="card position-relative">
                <div className="position-absolute rounded-circle fw-bold d-flex justify-content-center align-items-center price-container">
                  <span>$15</span>
                </div>
                <img
                  src="https://f.fcdn.app/imgs/98edda/www.viasono.com.uy/viasuy/3e9e/webp/catalogo/B101021325_101020107_5/460x460/colchon-de-espuma-travel-1-plaza.jpg"
                  className="card-img-top"
                  alt="img"
                />
              </div>
              <div className="p-4">
                <p className="accesories-text fw-bold">Accesories</p>

                <h2 className="fw-bold main-text-card fs-1">ARTIFIC PLANT</h2>
                <div className="div-border my-4"></div>
                <div className="text-description">
                  <p>
                    Helps you to keep your desk clear from small things such as pens, rulers, mobile
                    phone and USBs. Available in Black / Brown / Beach (all leather).
                  </p>
                </div>
                <button className="card-text-btn  rounded-pill">
                  <span>Add to cart</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductList;
