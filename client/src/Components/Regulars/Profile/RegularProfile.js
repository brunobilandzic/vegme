import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { Button, ButtonGroup } from "react-bootstrap";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { getRegularByUsername } from "../../../Shared/Api/regular";
import { GUEST } from "../../../Shared/Constants/Roles";
import Modal from "../../../Shared/UserInterface/Modal";
import RegularOrders from "./RegularOrders";
import { v4 as uuid } from "uuid";

export const RegularProfile = ({ user }) => {
  const [userRole, setUserRole] = useState();
  const [chooseRolePrompt, setChooseRolePrompt] = useState(false);
  const [viewOrders, setViewOrders] = useState(false);
  const [regular, setRegular] = useState();
  const { username } = useParams();

  useEffect(() => {
    const fetchAndSet = async () => {
      setRegular(await getRegularByUsername(username));
    };
    fetchAndSet();
  }, []);

  useEffect(() => {
    if (user?.roles.map((r) => r.name).length === 1)
      setUserRole(user?.roles.map((r) => r.name)[0]);
    else if (user?.roles.map((r) => r.name).length >= 2)
      setChooseRolePrompt(true);
    else setUserRole(GUEST);
  }, [user]);

  const chooseRole = (roleName) => {
    setUserRole(roleName);
    setChooseRolePrompt(false);
  };

  const getRoleButtons = () => {
    return (
      <ButtonGroup className="modal-footer-buttons">
        {user?.roles.map((r) => (
          <Button key={uuid()} onClick={() => chooseRole(r.name)}>
            {r.name}
          </Button>
        ))}
      </ButtonGroup>
    );
  };
  return (
    <div>
      <Modal
        show={chooseRolePrompt}
        content={getRoleButtons()}
        header="Choose role with wich you want to interact"
        onCancel={() => setChooseRolePrompt(false)}
      ></Modal>
      RegularProfile
      {!viewOrders && (
        <Button
          onClick={() => {
            setViewOrders(true);
          }}
        >
          Show orders
        </Button>
      )}
      {viewOrders && (
        <Button onClick={() => setViewOrders(false)}>Hide orders</Button>
      )}
      {viewOrders && <RegularOrders orders={regular?.orders} />}
    </div>
  );
};

RegularProfile.propTypes = {};

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(RegularProfile);
