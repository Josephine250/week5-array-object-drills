import { orders } from "data.js&quot";
const ORIGINAL = JSON.stringify(orders)
//1.array of all order ids
const orderId = orders.map(({id}) => id);
const orederCustomerNames = orders.map(({customer:{name}}) => name);
const orderDelivered = orders.filter(({status}) => status ==="delivered");
const orderDeliveredGasabo = orders.filter(({ customer : { district}}) => district === "Gasabo");
const order106 = orders.find(({ id }) => id === 106);
const hasLowRating = orders.some(({ rating }) => rating !== null && rating <= 3);
const allPending = orders.filter(({status}) => status ==="pending") .every(({rating}) => rating === "null");
const uniqueCustomers = [...new Set(orders.map(({ customer: { name } }) => name))];
const orderTotal = ({ items }) => items.reduce((sum, { price, qty }) => sum + price * qty, 0);
const ordersWithTotals = orders.map((order) => ({...order,total: orderTotal(order),}));
const totalDeliveredRevenue = orders.filter(({ status }) => status === "delivered").reduce((sum, order) => sum + orderTotal(order), 0);
const ratedOrders = orders.filter(({ rating }) => rating !== null);
const averageRating = Number(
  (ratedOrders.reduce((sum, { rating }) => sum + rating, 0) / ratedOrders.length).toFixed(1)
);
const totalBrochettes = orders
  .flatMap(({ items }) => items)
  .filter(({ name }) => name === "Brochette")
  .reduce((sum, { qty }) => sum + qty, 0);
const mostExpensiveOrder = orders.reduce(
  (max, order) => (orderTotal(order) > orderTotal(max) ? order : max),
  orders[0]
);
const ordersPerStatus = orders.reduce(
  (acc, { status }) => ({ ...acc, [status]: (acc[status] || 0) + 1 }),
  {}
);
