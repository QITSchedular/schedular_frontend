import React, { useState } from 'react';
import { Toast, ToastContainer } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import  ReactDOM  from 'react-dom';


// import './ToastComponent.css';

const Popbox = () => {
    const [show, setShow] = useState(true);
    const handleClose = () => {
      setShow(false);
      //onDataFromChild(false);
    }
    // console.log(modalData);
    
    
    return (
    //   <Modal show={show} onHide={handleClose} centered>
    //     <Modal.Header closeButton>
    //       <Modal.Title>{"modalData.message"}</Modal.Title>
    //     </Modal.Header>
    //     <Modal.Body></Modal.Body>
    //     <Modal.Footer>
    //       <Button variant="secondary" onClick={handleClose}>
    //         Close
    //       </Button>
    //     </Modal.Footer>
    //   </Modal>
    
    <Toast 
    show={show} 
    onClose={handleClose}
    className="d-inline-block m-1"
          bg={"primary"}
          key={"1"}
          delay={5000} 
          autohide
    >
          <Toast.Header>
            <img
              src="holder.js/20x20?text=%20"
              className="rounded me-2"
              alt=""
            />
            <strong className="me-auto">Bootstrap</strong>
            <small>11 mins ago</small>
          </Toast.Header>
          <Toast.Body className={'Dark text-white'}>Woohoo, you're reading this text in a Toast!</Toast.Body>
        </Toast>
  
       )
};

export default Popbox;
