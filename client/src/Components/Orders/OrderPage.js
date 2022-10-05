import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchOrderFromServer, removeMealFromOrder } from "../../Shared/Api/orders";
import { COOK, REGULAR } from "../../Shared/Constants/Roles";
import OrderForCook from "./Cook/OrderForCook";
import OrderForRegular from "./Regular/OrderForRegular";

export const OrderPage = ({ user }) => {
  const [order, setOrder] = useState();
  const { orderId } = useParams();

  useEffect(() => {
    const fetchOrder = async () => {
      const fetchedOrder = await fetchOrderFromServer(orderId);
      setOrder(fetchedOrder);
    };
    fetchOrder();
  }, []);

  const removeMeal = async (mealId) => {
    setOrder({ ...order, meals: order.meals.filter((m) => m._id != mealId) });
    await removeMealFromOrder(orderId, mealId);
  };

  return (
    <>
      {order &&
        user?.roles.map((r) => r.name).includes(REGULAR) &&
        !user?.roles.map((r) => r.name).includes(COOK) && (
          <OrderForRegular removeMeal={removeMeal} order={order} />
        )}
      {order &&
        user?.roles.map((r) => r.name).includes(COOK) &&
        !user?.roles.map((r) => r.name).includes(REGULAR) && (
          <OrderForCook order={order} />
        )}
    </>
  );
};

OrderPage.propTypes = {
  user: PropTypes.object,
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(OrderPage);
