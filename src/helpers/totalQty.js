function totalQty(cart) {
  return cart.reduce((total, product) => total + product.quantity, 0);
}

export default totalQty;
