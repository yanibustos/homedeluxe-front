import React from "react";
import { Modal } from "react-bootstrap";
import BlackButton from "../../commons/BlackButton/BlackButton";

const RemoveModal = ({ showModal, itemToRemove, handleCancelRemove, handleConfirmRemove }) => {
  return (
    <Modal show={showModal} onHide={handleCancelRemove} centered>
      <Modal.Header closeButton>
        <Modal.Title>Confirm Removal</Modal.Title>
      </Modal.Header>
      <Modal.Body>Are you sure you want to remove this item?</Modal.Body>
      <Modal.Footer>
        <BlackButton
          name="Cancel"
          handleOnClick={handleCancelRemove}
          className="custom-modal-btn gray-button w-25"
        />
        <BlackButton
          name="Remove"
          handleOnClick={handleConfirmRemove}
          className="custom-modal-btn custom-modal w-25"
        />
      </Modal.Footer>
    </Modal>
  );
};

export default RemoveModal;
