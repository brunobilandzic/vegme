import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import PaginationCustom from "../../Shared/Components/PaginationCustom";
import { loadPaginatedOrdersForUser } from "../../Shared/Redux/orders/ordersActions";
import Loading from "../../Shared/UserInterface/Loading";

export const BrowseOrders = ({
  orders,
  loadPaginatedOrdersForUser,
  pageNumber,
  pageSize,
}) => {
  useEffect(() => {
    loadPaginatedOrdersForUser();
  }, []);
  return (
    <>
      <Loading />
      {JSON.stringify(orders?.items[pageNumber + "-" + pageSize])}
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
