import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import PaginationCustom from "../../Shared/Components/PaginationCustom";
import { loadPaginatedOrdersForUser } from "../../Redux/orders/ordersActions";
import Loading from "../../Shared/UserInterface/Loading";
import OrderItem from "./OrderItem";
import { v4 as uuid } from "uuid";

export const BrowseOrders = ({
  orders,
  loadPaginatedOrdersForUser,
  pageNumber,
  pageSize,
}) => {
  useEffect(() => {
    loadPaginatedOrdersForUser();
  }, []);
  const getOrders = () => {
    return orders?.items[pageNumber + "-" + pageSize]?.map((order) => (
      <OrderItem order={order} key={uuid()}></OrderItem>
    ));
  };
  return (
    <>
      <Loading />
      {getOrders()}
      <PaginationCustom
        type="orders"
        loadItems={loadPaginatedOrdersForUser}
      ></PaginationCustom>
    </>
  );
};

BrowseOrders.propTypes = {
  orders: PropTypes.object,
  pageNumber: PropTypes.number,
  pageSize: PropTypes.number,
  loadPaginatedOrdersForUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  orders: state.orders.browsing,
  pageNumber: state.pagination.orders.pageNumber,
  pageSize: state.pagination.orders.pageSize,
});

const mapDispatchToProps = {
  loadPaginatedOrdersForUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(BrowseOrders);
