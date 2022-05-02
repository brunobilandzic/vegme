import React from "react";
import { CSSTransition } from "react-transition-group";
import ReactDOM from "react-dom"
import Backdrop from "./Backdrop";
import "./Modal.css"
const ModalBody = (props) => {
  return (
    <div className="modal_custom">
      <form onSubmit={props.onSubmit ? props.onSubmit : (e) => e.preventDefault()}>
      <div className="modal_custom__header">{props.header}</div>
        <div className="modal_custom__content">{props.children}</div>
        <div className="modal_custom__footer">
          {props.footer}
        </div>
      </form>
    </div>
  );
};

export default function Modal(props) {
  return ReactDOM.createPortal(
    <>
        {props.show && <Backdrop onClick={props.onCancel}/>}
        <CSSTransition
            in={props.show}
            mountOnEnter
            unmountOnExit
            timeout={200}
            classNames="modal_custom"
        >
            <ModalBody {...props}><div>{props.content}</div></ModalBody>
        </CSSTransition>
    </>,
    document.getElementById("modal-hook")
  );
}
