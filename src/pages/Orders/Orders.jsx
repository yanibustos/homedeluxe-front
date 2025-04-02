import { toast } from "react-toastify";
import BlackButton from "../../components/commons/BlackButton/BlackButton";
import "./Orders.css";
import { useState } from "react";

const orders = [
  {
    id: "123456",
    created_at: "25/05/2025",
    amount: "USD 460",
    items: [
      {
        id: "p1",
        name: "SOFA SENSE White 2-Seater",
        price: "USD 890",
        quantity: 1,
        status: "Processing",
        image:
          "https://f.fcdn.app/imgs/24194d/www.viasono.com.uy/viasuy/18b0/webp/catalogo/B204051941_204050283_1/460x460/sofa-sense-blanco-2-cuerpos.jpg",
      },
      {
        id: "p2",
        name: "Captivating Brown Circular Coffee Table",
        price: "USD 990",
        quantity: 2,
        status: "Shipped",
        image:
          "https://f.fcdn.app/imgs/5a0333/www.viasono.com.uy/viasuy/91bf/webp/catalogo/B205041844_205040167_1/460x460/mesa-de-centro-cautiva-marron-circular.jpg",
      },
    ],
  },
  {
    id: "987654",
    created_at: "01/04/2025",
    amount: "USD 1200",
    items: [
      {
        id: "p1",
        name: "SOFA SENSE White 2-Seater",
        price: "USD 600",
        quantity: 1,
        status: "Processing",
        image:
          "https://f.fcdn.app/imgs/24194d/www.viasono.com.uy/viasuy/18b0/webp/catalogo/B204051941_204050283_1/460x460/sofa-sense-blanco-2-cuerpos.jpg",
      },
      {
        id: "p2",
        name: "Captivating Brown Circular Coffee Table",
        price: "USD 600",
        quantity: 1,
        status: "Shipped",
        image:
          "https://f.fcdn.app/imgs/5a0333/www.viasono.com.uy/viasuy/91bf/webp/catalogo/B205041844_205040167_1/460x460/mesa-de-centro-cautiva-marron-circular.jpg",
      },
    ],
  },
];

function Orders() {
  const [expandedOrders, setExpandedOrders] = useState({});

  const handleViewOrder = (orderId) => {
    setExpandedOrders((prev) => ({
      ...prev,
      [orderId]: !prev[orderId],
    }));
  };

  const handleViewInvoice = () => {
    toast.warning("Sorry, this feature is still under development");
  };

  return (
    <div className="orders-container">
      <div className="orders-title fw-semibold mb-3">Orders</div>
      {orders.map((order) => (
        <div key={order.id} className="order-wrapper mb-4">
          <div className="order-container flex-column flex-md-row d-flex justify-content-between p-4 shadow-sm border rounded">
            <div className="d-flex flex-column flex-md-row justify-content-start align-items-center gap-3 gap-md-5 mb-3">
              <div className="d-flex flex-md-column">
                <span className="fw-semibold me-2">Order ID</span>
                <span>{order.id}</span>
              </div>
              <div className="d-flex flex-md-column">
                <span className="fw-semibold me-2">Date Placed</span>
                <span>{order.created_at}</span>
              </div>
              <div className="d-flex flex-md-column">
                <span className="fw-semibold me-2">Total Amount</span>
                <span className="fw-semibold">{order.amount}</span>
              </div>
            </div>
            <div className="d-flex justify-content-center justify-content-md-start gap-2 gap-sm-3">
              <BlackButton
                type="button"
                name={expandedOrders[order.id] ? "Hide Order" : "View Order"}
                handleOnClick={() => handleViewOrder(order.id)}
                className="px-3"
              />
              <BlackButton
                type="button"
                name="View Invoice"
                handleOnClick={handleViewInvoice}
                className="px-3"
              />
            </div>
          </div>

          {expandedOrders[order.id] && (
            <div className="order-details open">
              <ul className="list-unstyled my-3 px-4">
                {order.items.map((item) => (
                  <li key={item.id} className="order-item p-3 border rounded shadow-sm">
                    <div className="row align-items-center p-2">
                      <div className="col-md-2 col-3">
                        <img className="order-image img-fluid" src={item.image} alt={item.name} />
                      </div>

                      <div className="col-md-5 col-6">
                        <div className="fw-semibold">{item.name}</div>
                        <div className="text-muted">Status: {item.status}</div>
                      </div>

                      <div className="col-md-2 col-3 text-center">
                        Qty: <span className="fw-semibold">{item.quantity}</span>
                      </div>

                      <div className="col-md-3 col-6 text-end fw-semibold">{item.price}</div>
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
