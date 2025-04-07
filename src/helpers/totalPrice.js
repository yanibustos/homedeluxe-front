import currencyFormatter from "./formatPrice";

function totalPrice(cart) {
  return currencyFormatter(
    cart.reduce((total, product) => total + (product.price * product.quantity || 0), 0),
  );
}

export default totalPrice;
