const orderMeals = (m1, m2) => {
  if (m1.orders.length != 0 && m2.orders.length == 0) {
    return -1;
  } else if (m2.orders.length != 0 && m1.orders.length == 0) {
    return 1;
  } else if (m1.orders.length == 0 && m2.orders.length == 0) {
    return 0;
  }
  const maxOrderDateTimeM1 = findNewestOrderDate(m1.orders);
  const maxOrderDateTimeM2 = findNewestOrderDate(m2.orders);
  
  return maxOrderDateTimeM2 - maxOrderDateTimeM1;
};

const orderByDateOrdered = (o1, o2) => {
  const o1DateTime = new Date(o1.date_ordered).getTime()
  const o2DateTime = new Date(o2.date_ordered).getTime()

  return o2DateTime - o1DateTime
}

const findNewestOrderDate = (orders) => {
  let minDateTime = new Date(-8640000000000000).getTime();
  orders.forEach((order) => {
    const orderDateTime = new Date(order.date_ordered).getTime();
    if (orderDateTime > minDateTime) minDateTime = orderDateTime;
  });
  return minDateTime;
};

module.exports = {
  orderMeals,
  orderByDateOrdered
};
