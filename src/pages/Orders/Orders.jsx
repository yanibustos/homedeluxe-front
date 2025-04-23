import { toast } from "react-toastify";
import BlackButton from "../../components/commons/BlackButton/BlackButton";
import "./Orders.css";
import { useEffect, useState } from "react";
import fetchApi from "../../api/fetchApi";
import { useSelector } from "react-redux";
import Loading from "../../components/Loading/Loading";
import { calculateOrderTotal } from "../../helpers/calculateOrderTotal";
import { formatDate } from "../../helpers/formatDate";

const capitalize = (word) => word.charAt(0).toUpperCase() + word.slice(1);

const statusStyles = {
  pending: {
    colorClass: "text-secondary",
    icon: <i className="bi bi-hourglass-split me-1"></i>,
  },
  paid: {
    colorClass: "text-success",
    icon: <i className="bi bi-cash-coin me-1"></i>,
  },
  processing: {
    colorClass: "text-warning",
    icon: <i className="bi bi-gear-fill me-1"></i>,
  },
  shipped: {
    colorClass: "text-info",
    icon: <i className="bi bi-truck me-1"></i>,
  },
  canceled: {
    colorClass: "text-danger",
    icon: <i className="bi bi-x-circle me-1"></i>,
  },
};

function Orders() {
  const user = useSelector((state) => state.user);
  const [expandedOrders, setExpandedOrders] = useState({});
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    getOrders();
  }, []);

  const getOrders = async () => {
    setLoading(true);
    try {
      const data = await fetchApi({
        method: "get",
        url: `/orders/getOrdersByUser/${user.id}`,
        accessToken: user.accessToken,
      });

      setOrders(data.orders);
    } catch (err) {
      setError(err.message);
      toast.error("Failed to load orders.");
    } finally {
      setLoading(false);
    }
  };

  const handleViewOrder = (orderId) => {
    setExpandedOrders((prev) => ({
      ...prev,
      [orderId]: !prev[orderId],
    }));
  };

  const handleViewInvoice = () => {
    toast.warning("Sorry, this feature is still under development");
  };

  // Loading indicator
  if (loading) {
    return <Loading />;
  }

  // Error message
  if (error) {
    return (
      <div className="text-center text-danger alert alert-danger">
        <span>Something went wrong, please try again.</span>
      </div>
    );
  }

  // No orders available
  if (orders.length === 0) {
    return (
      <div className="text-center">
        <span>No orders available.</span>
      </div>
    );
  }

  return (
    <div className="orders-container">
      <div className="orders-title fw-semibold mb-3">My Orders</div>
      {orders.map((order) => (
        <div key={order.id} className="order-wrapper mb-4">
          <div className="order-container flex-column flex-md-row d-flex justify-content-between p-4 shadow-sm border rounded gap-md-5">
            <div className="d-flex flex-column flex-md-row justify-content-start align-items-center gap-3 gap-md-5 mb-3 flex-md-wrap">
              <div className="d-flex flex-md-column">
                <span className="fw-semibold me-2">Order ID</span>
                <span className="text-center">{order.id}</span>
              </div>
              <div className="d-flex flex-md-column">
                <span className="fw-semibold me-2">Date Placed</span>
                <span className="text-center">{formatDate(order.createdAt)}</span>
              </div>
              <div className="d-flex flex-md-column">
                <span className="fw-semibold me-2">Total Amount</span>
                <span className="fw-semibold text-center">
                  {order.items[0].currency} {calculateOrderTotal(order)}
                </span>
              </div>
              <span
                className={`order-wrapper fw-semibold ${
                  statusStyles[order.status.toLowerCase()]?.colorClass || "text-muted"
                }`}
              >
                {statusStyles[order.status.toLowerCase()]?.icon}
                {capitalize(order.status)}
              </span>
            </div>
            <div className="d-flex justify-content-center justify-content-md-start gap-2 gap-sm-3">
              <BlackButton
                type="button"
                handleOnClick={() => handleViewOrder(order.id)}
                className="px-3 text-white order-buttons"
              >
                Details
                {expandedOrders[order.id] ? (
                  <>
                    <i className="bi bi-chevron-compact-up text-white ms-1"></i>
                  </>
                ) : (
                  <>
                    <i className="bi bi-chevron-compact-down ms-1"></i>
                  </>
                )}
              </BlackButton>
              <BlackButton
                type="button"
                name="Invoice"
                handleOnClick={handleViewInvoice}
                className="px-3 order-buttons"
              />
            </div>
          </div>

          {expandedOrders[order.id] && (
            <div className="order-details open">
              <ul className="list-unstyled my-3 px-4">
                {order.items.map((item) => (
                  <li key={item.id} className="order-item p-3 border rounded shadow-sm">
                    <div className="row align-items-center text-center text-sm-start p-2">
                      <div className="col-12 col-sm-2  mb-3 mb-sm-0">
                        <img
                          className="order-image img-fluid"
                          src={
                            item.image[0].includes("http")
                              ? item.image[0]
                              : `${import.meta.env.VITE_IMAGE_DB_URL}/${item.image[0]}`
                          }
                          alt={item.name}
                        />
                      </div>

                      <div className="col-12 col-sm-5 mb-2 mb-sm-0">
                        <div className="fw-semibold">{item.name}</div>
                      </div>
                      <div className="col-12 col-sm-2 text-md-center mb-2 mb-sm-0">
                        Quantity: <span className="fw-semibold">{item.quantity}</span>
                      </div>

                      <div className="col-12 col-sm-3 text-md-end fw-semibold mb-2 mb-sm-0">
                        <span className="me-1"> USD</span>
                        {Number(item.price) * item.quantity}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default Orders;
