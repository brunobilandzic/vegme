import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { Button, ButtonGroup } from "react-bootstrap";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Modal from "../../Shared/UserInterface/Modal";

export const RegularsMainPage = ({ user }) => {
  const [userRole, setUserRole] = useState();
  const [chooseRolePrompt, setChooseRolePrompt] = useState(true);

  useEffect(() => {
    if (user?.roles.map((r) => r.name).length === 1)
      setUserRole(user?.roles.map((r) => r.name)[0]);
    else setChooseRolePrompt(true);
  }, [user]);

  const chooseRole = (roleName) => {
    setUserRole(roleName);
    setChooseRolePrompt(false);
  };

  const getRoleButtons = () => {
    return (
      <ButtonGroup>
        {user?.roles.map((r) => (
          <Button onClick={() => chooseRole(r.name)}>{r.name}</Button>
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
      <Link to="browse">Browse</Link>
    </div>
  );
};

RegularsMainPage.propTypes = {
  user: PropTypes.object,
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(RegularsMainPage);
