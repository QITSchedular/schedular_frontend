import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from "react-router-dom";
import Button from "devextreme-react/button";
import TextBox from "devextreme-react/text-box";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import "./phoneOtp.css";
import notify from "devextreme/ui/notify";
import Validator, {
  RequiredRule,
  NumericRule,
  EmailRule,
  StringLengthRule,
  PatternRule,
  RangeRule,
} from "devextreme-react/validator";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB1EbkpxNL7s2pQp5nH3J106WCScDHFtzU",
  authDomain: "test-11d66.firebaseapp.com",
  projectId: "test-11d66",
  storageBucket: "test-11d66.appspot.com",
  messagingSenderId: "24718878064",
  appId: "1:24718878064:web:a18c686e06c9a969075bb5"
};
firebase.initializeApp(firebaseConfig);
const PhoneVerification = (props) => {
  const bookingDateTime = {props};
  console.log(bookingDateTime)
  const [phoneNumber, setPhoneNumber] = useState("");
  const [verificationId, setVerificationId] = useState("");
  const [code, setCode] = useState("");
  const navigate = useNavigate();
  const phonePattern = /^[02-9]\d{9}$/;
  const phoneRules = {
    X: /[02-9]/,
  };

  const handleSendCode = () => {
    console.log("phone", phoneNumber);
    const recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
      "send-code-button",
      {
        size: "invisible",
      }
    );
    firebase
      .auth()
      .signInWithPhoneNumber(phoneNumber, recaptchaVerifier)
      .then((confirmationResult) => {
        setVerificationId(confirmationResult.verificationId);
        notify(
          {
            message: "Verification code sent to your phone.",
            width: 600,
            shading: true,
            position: "center",
          },
          "success",
          1000
        );
      })
      .catch((error) => {
        console.log(error.message);
        notify(
          {
            message: error.message,
            width: 400,
            shading: true,
            position: "center",
          },
          "info",
          1000
        );
        // if (error.message === "reCAPTCHA has already been rendered in this element") {
        //   notify(
        //     {
        //       message: "Refreshing...",
        //       width: 400,
        //       shading: true,
        //       position: "center",
        //     },
        //     "info",
        //     1000
        //   );
        //   setTimeout(() => {
        //     window.location.reload(true);
        //   }, 1200);
        // } else {
        //   notify(
        //     {
        //       message: "Enter a Valid Phone Number",
        //       width: 600,
        //       shading: true,
        //       position: "center",
        //     },
        //     "error",
        //     1000
        //   );
        //   setTimeout(() => {
        //     window.location.reload(true);
        //   }, 1200);
        // }
      });
  };

  const handleVerifyCode = () => {
    const credential = firebase.auth.PhoneAuthProvider.credential(
      verificationId,
      code
    );
    firebase
      .auth()
      .signInWithCredential(credential)
      .then((userCredential) => {
        // alert("Phone verification successful!");
        notify(
          {
            message: "Phone verification is successfull!",
            width: 600,
            shading: true,
            position: "center",
          },
          "success",
          1000
        );
        navigate("./EnterDetails");
      })
      .catch((error) => {
        console.log(error.message);
        if (
          error.message ===
          "Firebase: The verification ID used to create the phone auth credential is invalid. (auth/invalid-verification-id)."
        ) {
          notify(
            {
              message: "Please Enter a Valid Phone Number....",
              width: 500,
              shading: true,
              position: "center",
            },
            "error",
            1000
          );
          setTimeout(() => {
            window.location.reload(true);
          }, 1200);
        } else if (
          error.message ===
          "Firebase: The SMS verification code used to create the phone auth credential is invalid. Please resend the verification code sms and be sure to use the verification code provided by the user. (auth/invalid-verification-code)."
        ) {
          notify(
            {
              message: "Verification Code is Invalid....",
              width: 500,
              shading: true,
              position: "center",
            },
            "error",
            1000
          );
          setTimeout(() => {
            window.location.reload(true);
          }, 1200);
        } else if (
          error.message ===
          "Firebase: The SMS code has expired. Please re-send the verification code to try again. (auth/code-expired)."
        ) {
          notify(
            {
              message: "SMS code has expired....",
              width: 500,
              shading: true,
              position: "center",
            },
            "error",
            1000
          );
          setTimeout(() => {
            window.location.reload(true);
          }, 1200);
        } else {
          notify(
            {
              message: error.message,
              width: 600,
              shading: true,
              position: "center",
            },
            "error",
            1000
          );
          setTimeout(() => {
            window.location.reload(true);
          }, 1200);
        }
      });
  };

  return (
    <div style={{ marginLeft: "20px", marginBottom: "20px" }}>
      <h4
        style={{
          fontSize: "18px",
          fontWeight: 700,
          marginTop: "25px",
          marginBottom: "22px",
        }}
      >
        Verify Your Phone Number
      </h4>
      <PhoneInput
        defaultCountry="IN"
        value={phoneNumber}
        onChange={setPhoneNumber}
        placeholder="Phone Number"
      />
      <button
        id="send-code-button"
        onClick={handleSendCode}
        className="btn btn-primary"
        style={{
          width: "160px",
          height: "40px",
          fontSize: "14px",
          backgroundColor: "#337AB7",
          marginTop: "5px",
          //marginBottom: "5px",
        }}
      >
        Send Code
      </button>
      <input
        type="text"
        placeholder="Enter OTP"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        className="form-control"
        style={{
          fontSize: "12px",
          width: "80%",
          marginTop: "30px",
          marginBottom: "20px",
        }}
      />
      <button
        onClick={handleVerifyCode}
        className="btn btn-primary"
        style={{
          width: "160px",
          height: "40px",
          fontSize: "14px",
          marginBottom: "30px",
          backgroundColor: "#337AB7",
          marginTop: "5px",
          marginBottom: "10px",
        }}
      >
        Verify Code
      </button>
      <br />
      <Link to="./EnterDetails" state = {bookingDateTime} style={{ textDecoration: "none" }}>
        <button
          className="btn btn-primary"
          style={{
            width: "160px",
            height: "40px",
            fontSize: "14px",
            backgroundColor: "#337AB7",
            marginTop: "5px",
            marginBottom: "20px",
          }}
        >
          Confirm
        </button>
      </Link>
    </div>
  );
};

export default PhoneVerification;
