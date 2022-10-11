import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { loadPaginatedFavouritesForUsername } from "../../../Redux/meals/mealsActions";
import PaginationCustom from "../../../Shared/Components/PaginationCustom";
import Loading from "../../../Shared/UserInterface/Loading";
import MyFavourites from "./MyFavourites";
import OtherPersonFavourites from "./OtherPersonFavourites";

export const FavouritesMainPage = ({
  user,
  loadPaginatedFavouritesForUsername,
  pageNumber,
  pageSize,
  allFavourites,
}) => {
  const { username } = useParams();
  const [isSameUser, setIsSameUser] = useState(false);
  const [favourites, setFavourites] = useState([]);

  useEffect(() => {
    const fetchFavourites = async () => {
      await loadPaginatedFavouritesForUsername(username, 1, 5);
    };
    setIsSameUser(username === user?.username);
    fetchFavourites();
  }, [user]);

  useEffect(() => {
    setFavourites(
      allFavourites[username]
        ? allFavourites[username][pageNumber + "-" + pageSize]
        : null
    );
  }, [allFavourites, pageNumber, pageSize]);

  return (
    <>
      {favourites ? (
        isSameUser ? (
          <MyFavourites meals={favourites} />
        ) : (
          <OtherPersonFavourites meals={favourites} username={username} />
        )
      ) : null}
      <Loading />
      <PaginationCustom
        type="favouriteMeals"
        loadItems={(pageNumber, pageSize) =>
          loadPaginatedFavouritesForUsername(username, pageNumber, pageSize)
        }
      />
    </>
  );
};

FavouritesMainPage.propTypes = {
  user: PropTypes.object,
  loadPaginatedFavouritesForUsername: PropTypes.func.isRequired,
  pageNumber: PropTypes.number,
  pageSize: PropTypes.number,
  allFavourites: PropTypes.object,
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
  pageNumber: state.pagination.favouriteMeals.pageNumber,
  pageSize: state.pagination.favouriteMeals.pageSize,
  allFavourites: state.meals.favouriteMeals,
});

const mapDispatchToProps = { loadPaginatedFavouritesForUsername };

export default connect(mapStateToProps, mapDispatchToProps)(FavouritesMainPage);
