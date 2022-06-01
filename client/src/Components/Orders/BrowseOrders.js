import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import PaginationCustom from "../../Shared/Components/PaginationCustom";
import { loadPaginatedOrdersForUser } from "../../Shared/Redux/orders/ordersActions";

export const BrowseOrders = ({ orders, loadPaginatedOrdersForUser, pageNumber, pageSize }) => {
  useEffect(() => {
    loadPaginatedOrdersForUser();
  }, []);
  return (
    <>
      {JSON.stringify(orders?.items[pageNumber + "-" + pageSize])}
      <PaginationCustom
        loadItems={loadPaginatedOrdersForUser}
      ></PaginationCustom>
    </>
  );
};

BrowseOrders.propTypes = {
  orders: PropTypes.object,
  pageNumber: PropTypes.number,
  pageSize: PropTypes.number,
  loadPaginatedOrdersForUser: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  orders: state.orders.browsing,
  pageNumber: state.pagination.pageNumber,
  pageSize: state.pagination.pageSize
});

const mapDispatchToProps = {
  loadPaginatedOrdersForUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(BrowseOrders);
