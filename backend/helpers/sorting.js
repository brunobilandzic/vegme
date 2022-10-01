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
  return (
    new Date(o2.date_ordered).getTime() - new Date(o1.date_ordered).getTime()
  );
};

const findNewestOrderDate = (orders) => {
  let minDateTime = new Date(-8640000000000000).getTime();
  orders.forEach((order) => {
    const orderDateTime = new Date(order.date_ordered).getTime();
    if (orderDateTime > minDateTime) minDateTime = orderDateTime;
  });
  return minDateTime;
};

const orderByDateCreated = (m1, m2) => {
  return (
    new Date(m2.meal.date_created).getTime() -
    new Date(m1.meal.date_created).getTime()
  );
};

module.exports = {
  orderMeals,
  orderByDateOrdered,
  orderByDateCreated,
};
