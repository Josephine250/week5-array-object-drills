import { orders } from "data.js&quot";
const ORIGINAL = JSON.stringify(orders)
//1.array of all order ids
const orderId = orders.map(({id}) => id);
//2.
const orederCustomerNames = orders.map(({customer:{name}}) => name);
//3.
const orderDelivered = orders.filter(({status}) => status ==="delivered");
//4.
const orderDeliveredGasabo = orders.filter(({ customer : { district}}) => district === "Gasabo");
//5.
const order106 = orders.find(({ id }) => id === 106);

const hasLowRating = orders.some(({ rating }) => rating !== null && rating <= 3);
const allPending = orders.filter(({status}) => status ==="pending") .every(({rating}) => rating === "null");
const uniqueCustomers = [...new Set(orders.map(({ customer: { name } }) => name))];
//7.
const orderTotal = ({ items }) => items.reduce((sum, { price, qty }) => sum + price * qty, 0);
//8.
const ordersWithTotals = orders.map((order) => ({...order,total: orderTotal(order),}));
//9.
const totalDeliveredRevenue = orders.filter(({ status }) => status === "delivered").reduce((sum, order) => sum + orderTotal(order), 0);
//10.
const ratedOrders = orders.filter(({ rating }) => rating !== null);
//11.
const averageRating = Number(
  (ratedOrders.reduce((sum, { rating }) => sum + rating, 0) / ratedOrders.length).toFixed(1)
);
//12.
const totalBrochettes = orders
  .flatMap(({ items }) => items)
  .filter(({ name }) => name === "Brochette")
  .reduce((sum, { qty }) => sum + qty, 0);
  //13.
const mostExpensiveOrder = orders.reduce(
  (max, order) => (orderTotal(order) > orderTotal(max) ? order : max),
  orders[0]
);
//14.
const ordersPerStatus = orders.reduce(
  (acc, { status }) => ({ ...acc, [status]: (acc[status] || 0) + 1 }),
  {}
);
//15.
const revenuePerDistrict = orders
  .filter(({ status }) => status === "delivered")
  .reduce((acc, order) => {
    const { district } = order.customer;
    return { ...acc, [district]: (acc[district] || 0) + orderTotal(order) };
  }, {});
  //16.
  const ordersByDate = Object.entries(Object.groupBy(orders, ({ date }) => date)).map(
  ([date, dailyOrders]) => ({
    date,
    count: dailyOrders.length,
    revenue: dailyOrders.reduce((sum, order) => sum + orderTotal(order), 0),
  })
);
// 17.
const topItems = Object.entries(
  orders
    .flatMap(({ items }) => items)
    .reduce((acc, { name, qty }) => ({ ...acc, [name]: (acc[name] || 0) + qty }), {})
)
  .map(([name, qty]) => ({ name, qty }))
  .toSorted((a, b) => b.qty - a.qty)
  .slice(0, 3);
  //18.
  const customerStats = Object.values(
  orders.reduce((acc, order) => {
    const { name } = order.customer;
    const spent = orderTotal(order);
    return {
      ...acc,
      [name]: {
        name,
        orders: (acc[name]?.orders || 0) + 1,
        spent: (acc[name]?.spent || 0) + spent,
      },
    };
  }, {})
).toSorted((a, b) => b.spent - a.spent);
// 19.
const menuPriceList = Object.fromEntries(
  orders.flatMap(({ items }) => items).map(({ name, price }) => [name, price])
);
//20.
const markDelivered = (orders, id) =>
  orders.map((order) =>
    order.id === id && order.status === "pending"
      ? { ...order, status: "delivered" }
      : order
  );
  //21.
  const rateOrder = (orders, id, rating) =>
  orders.map((order) =>
    order.id === id && order.status === "delivered"
      ? { ...order, rating }
      : order
  );
  //22.
  const changeDistrict = (orders, id, district) =>
  orders.map((order) =>
    order.id === id
      ? { ...order, customer: { ...order.customer, district } }
      : order
  );
  //23.
  const addItem = (orders, id, item) =>
  orders.map((order) =>
    order.id === id
      ? { ...order, items: [...order.items, item] }
      : order
  );
  //24.
  const removeCancelled = (orders) =>
  orders.filter(({ status }) => status !== "cancelled");
  //25.
  const applyDiscount = (orders, percent) =>
  orders.map((order) => ({
    ...order,
    items: order.items.map((item) => ({
      ...item,
      price: Math.round(item.price * (1 - percent / 100)),
    })),
  }));
  console.log("Immutability Maintained:", JSON.stringify(orders) === ORIGINAL);
