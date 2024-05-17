import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

function VoteModal({ show, onClose, type, message, onConfirm }) {
	return (
		<Modal aria-labelledby="contained-modal-title-vcenter" centered show={show} onHide={onClose}>
			<Modal.Header closeButton>
				<Modal.Title>{type === "success" ? "สำเร็จ" : type === "error" ? "ผิดพลาด" : "ยืนยันการโหวต"}</Modal.Title>
			</Modal.Header>
			<Modal.Body>{message}</Modal.Body>
			<Modal.Footer>
				{type === "confirm" && (
					<Button variant="primary" onClick={onConfirm}>
						ยืนยัน
					</Button>
				)}
				<Button variant="danger" onClick={onClose}>
					ยกเลิก
				</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default VoteModal;
