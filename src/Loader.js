import React from 'react';
import LoaderImg from './TLoader.gif';
import  ReactDOM  from 'react-dom';

// added
import './Loader.css';

const LoaderPortal = () => {
  // return ReactDOM.createPortal(
  //   <div className='wrapper' style={{
  //     position: "fixed",
  //     width: "100vw",
  //     height: "100vh",
  //     backgroundColor: "rgba(0, 0, 0, 0.7)",
  //     zIndex: 9
  //   }}>
  //       <div className='loader' style={{
  //         position: "fixed",
  //         left: "50%",
  //         top: "50%",
  //         transform: "translate(-50%, -50%)",
  //         zIndex: "999"
  //       }}>
  //           <img src={LoaderImg} alt = "Loading" />
  //       </div>
  //   </div>,
  //   document.getElementById("loader")
  // )
  return (
    <div className="loader-container">
      <img src={LoaderImg} alt="Loading..." className="loader-gif" />
    </div>
  );
};

export default LoaderPortal;
