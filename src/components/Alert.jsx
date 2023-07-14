import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom/dist";
export const Alert = ({ show, setShow }) => {
  const navigate = useNavigate();
  const handleClose = () => setShow(false);
  const handleNavigate = () => {
    setShow(false);
    navigate("/");
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Transaction</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, transaction successfull!</Modal.Body>
        <Modal.Footer>
          <Button
            className="bg-emerald-500 !border-emerald-500 hover:bg-emerald-500"
            onClick={handleNavigate}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
