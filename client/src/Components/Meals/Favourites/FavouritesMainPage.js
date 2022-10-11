import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { getFavourites } from "../../../Shared/Api/regular";
import MyFavourites from "./MyFavourites";
import OtherPersonFavourites from "./OtherPersonFavourites";

export const FavouritesMainPage = ({ user }) => {
  const { username } = useParams();
  const [isSameUser, setIsSameUser] = useState(false);
  const [favourites, setFavourites] = useState([]);

  useEffect(() => {
    const fetchFavourites = async () => {
      setFavourites(await getFavourites(username));
    };
    setIsSameUser(username === user?.username);
    fetchFavourites();
  }, [user]);

  return <>
    {isSameUser ? <MyFavourites /> : <OtherPersonFavourites />}
  </>
};

FavouritesMainPage.propTypes = {
  user: PropTypes.object
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(FavouritesMainPage);
