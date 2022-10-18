import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { loadAllRegulars } from "../../../Redux/regulars/regularsActions";
import PaginationCustom from "../../../Shared/Components/PaginationCustom";
import RegularItem from "./RegularItem";

export const BrowseRegulars = ({
  loadAllRegulars,
  regulars,
  pageNumber,
  pageSize,
}) => {
  useEffect(() => {
    loadAllRegulars();
  }, []);

  const getItems = () => {
    return regulars?.items[pageNumber + "-" + pageSize]?.map((r) => (
      <RegularItem regular={r} />
    ));
  };

  return (
    <div>
      {getItems()}
      <PaginationCustom
        type="regulars"
        loadItems={loadAllRegulars}
      />
    </div>
  );
};

BrowseRegulars.propTypes = {
  loadAllRegulars: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  regulars: state.regulars,
  pageNumber: state.pagination.regulars.pageNumber,
  pageSize: state.pagination.regulars.pageSize,
});

const mapDispatchToProps = { loadAllRegulars };

export default connect(mapStateToProps, mapDispatchToProps)(BrowseRegulars);
