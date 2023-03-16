import React, {
  useState,
  useEffect,
  useLayoutEffect,
  useCallback,
  useRef,
} from "react";
import {
  Form,
  SimpleItem,
  Label,
  GroupItem,
  ColCountByScreen,
  Item,
  EmptyItem,
} from "devextreme-react/form";
import TextBox from "devextreme-react/text-box";
import notify from "devextreme/ui/notify";
import "devextreme-react/text-area";
import "devextreme/dist/css/dx.light.css";
import Button from "devextreme-react/button";
import TextArea from "devextreme-react/text-area";
import { LoadPanel } from 'devextreme-react/load-panel';

import Validator, {
  RequiredRule,
  NumericRule,
  EmailRule,
  StringLengthRule,
  PatternRule,
  RangeRule,
} from "devextreme-react/validator";
import ValidationGroup from "devextreme-react/validation-group";
import { Link, redirect, useNavigate } from "react-router-dom";
import validator from "validator";
import { storage, db } from "./firebase";
import { auth, registerWithEmailAndPassword } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { sendSignInLinkToEmail } from "firebase/auth";
import { addDoc, collection, doc, getDoc } from "firebase/firestore";
import axios from "axios";
import dxLoadPanel from "devextreme/ui/load_panel";
import LoaderPortal from "./Loader";



const FormMain = (props) => {
  const propData = {props};
  const meetData = propData.props.meetData;
  console.log(meetData);
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [password, setPassword] = useState("");

  const [companyName, setCompanyName] = useState("");
  const [subject, setSubject] = useState("");
  const [flag, setFlag] = useState(false);
  const [docId, setDocId] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const [loader, setLoader] = useState(false);

  const register = async() => {
    setLoader(true);
    const config = {
      attendeeEmail: email,
      meetSubject: subject,
      meetDate: meetData.meetingDate,
      meetTime: meetData.selectedTimeSlot

    };
    if(!email || !name || !website || !companyName || !subject){
      setLoader(false);
      return notify(
        {
          message: "Please add all the fields to schedule the meet...",
          width: 500,
        },
        "error",
        1000
      );
    } else{
      try {
        // set the data in database first
        
        const meetConfig = {
          attendeeEmail: email,
          meetSubject: subject,
          meetDate: meetData.meetingDate,
          meetTime: meetData.selectedTimeSlot,
          flag: false,
          companyName: companyName,
          website:website,
          name: name
        }
        setLoader(true);
        const docIdRef = await addDoc(collection(db, "meetings"), meetConfig);
        setDocId(docIdRef.id);
        setLoader(false);
        setFlag(true);

        const queryParams = new URLSearchParams({
          // attendeeEmail: email,
          // meetSubject: subject,
          // meetDate: meetData.meetingDate,
          // meetTime: meetData.selectedTimeSlot
          query:docIdRef.id
        }).toString();
        setLoader(true);
        sendSignInLinkToEmail(auth, email, {
          url: `http://localhost:3000/bookmeeting?${queryParams}`,
          handleCodeInApp: true
        }).then((data)=>{
          setLoader(false);
          return notify({
            message: "Click on the link recieved on you email to proceed.",
            width: 500
          },
          "info", 500
          );
        })
      } catch (error) {
        setLoader(false);
        console.log(error);
      }
    }
     
  };

  // onAuthStateChanged - observer function
  // useEffect(() => {
  //   if (loading) return;
  //   if (user)
  //     navigate(
  //       "/scheduleTime/phoneAuthentication/EnterDetails/EmailVerification"
  //     );
  // }, [user, loading]);

  const namePattern = /^[^0-9]+$/;
  const phonePattern = /^[02-9]\d{9}$/;
  const phoneRules = {
    X: /[02-9]/,
  };
  // For Email Validation
  const [emailError, setEmailError] = useState("");
  const validateEmail = (e) => {
    var email = e.target.value;
    if (validator.isEmail(email)) {
      setEmailError("Valid Email :)");
    } else {
      setEmailError("Enter valid Email!");
    }
  };

  const scheduleEvent = async (e) => {
    try{
      setLoader(true);
      const docIdRef = await doc(db, 'meetings', docId);
      const docSnap = await getDoc(docIdRef);
      if (docSnap.exists() && docSnap.data().flag === false) {
        setLoader(false);
        return(
          notify(
               {
          message:
            "Looks like you email has not been verified, please verify your email to proceed",
          width: 600,
          shading: true,
          position: "center",
        },
        "error",
        2000 
          )
        )
      }

      // Schedule the meet
        const endTime = parseInt(meetData.selectedTimeSlot) + 1;
        const meetConfig = {
          subject: subject,
          body: {
            contentType: "HTML",
            content: "Please Confirm the joining status of the meeting..",
          },
          start: {
            dateTime: `${meetData.meetingDate}T${meetData.selectedTimeSlot}:00:00`,
            timeZone: "India Standard Time",
          },
          end: {
            dateTime: `${meetData.meetingDate}T${endTime}:00:00`,
            timeZone: "India Standard Time",
          },
          location: {
            displayName: "Online Teams Meeting",
          },
          attendees: [
            {
              emailAddress: {
                address: email,
                name: name,
              },
              type: "required",
            },
          ],
          isOnlineMeeting: true,
          onlineMeetingProvider: "teamsForBusiness",
        };
        const url = "http://localhost:8000/api/bookmeeting"
        const response = await axios.post(url,meetConfig);
        if(response.status == 201){
          
            const options = {
        message: "Meeting has be scheduled, check you email for more details.",
        position: {
            at: "center",
            my: "center",
            of: window
        },
        width: "100%",
        type:"success",
        displayTime: 2000,
        shading: false
    };
        localStorage.removeItem("mydate");
        localStorage.removeItem("flag");
        localStorage.removeItem("mytime");
        setLoader(false);
        await notify(options);
    navigate("/")
        }     
      else{
        setLoader(false);
        console.log("Failed Booking")
    
      }
    } catch(error){
      setLoader(false);
      console.error('Error updating docIdument: ', error);
    }
  };

  function refreshPage() {
   return setTimeout(window.location.reload(true), 1500);
  }
  return (
    <React.Fragment>
      {loader && <LoaderPortal />}
      <div
        style={{
          marginRight: "25px",
          marginLeft: "25px",
          marginTop: "20px",
          marginBottom: "40px",
        }}
      >
        <div
          style={{
            marginBottom: "5px",
          }}
        >
          <h3
            style={{
              fontSize: "18px",
              fontWeight: 700,
              marginTop: "25px",
              marginBottom: "22px",
            }}
          >
            Enter your Details
          </h3>
        </div>
        <div
          style={{
            marginTop: "5px",
          }}
        >
          <ValidationGroup>
            <Form
              colCount={2}
              labelMode="floating"
              labelLocation="left"
            >
              <GroupItem>
                <TextBox
                  label="Full Name"
                  labelMode="floating"
                  mode="text"
                  defaultValue={name}
                  onValueChanged={(e) => {
                    setName(e.value);
                  }}
                  height={40}
                >
                  <Validator>
                    <RequiredRule message="Name is required" />
                    <PatternRule
                      message="Do not use digits in the Name"
                      pattern={namePattern}
                    />
                    <StringLengthRule
                      message="Name must have atleast 2 symbols"
                      min={2}
                    />
                  </Validator>
                </TextBox>

                <TextBox
                  label="Email Address"
                  labelMode="floating"
                  mode="email"
                  defaultValue={email}
                  onValueChanged={(e) => {
                    setEmail(e.value);
                  }}
                  height={40}
                >
                  {emailError}
                  <Validator>
                    <RequiredRule message="Email is required" />
                    <EmailRule message="Email Format is invalid" />
                  </Validator>
                </TextBox>
                <TextBox
                  label="Website"
                  labelMode="floating"
                  mode="url"
                  defaultValue={website}
                  onValueChanged={(e) => {
                    setWebsite(e.value);
                  }}
                  height={40}
                ></TextBox>
              </GroupItem>
              <GroupItem>
                <TextBox
                  label="Company Name"
                  labelMode="floating"
                  mode="text"
                  defaultValue={companyName}
                  onValueChanged={(e) => {
                    setCompanyName(e.value);
                  }}
                  height={40}
                >
                  <Validator>
                    <RequiredRule message="Company Name is required" />

                    <StringLengthRule
                      message="Company Name must have atleast 2 symbols"
                      min={2}
                    />
                  </Validator>
                </TextBox>

                {/* <TextBox
                  label="Password"
                  labelMode="floating"
                  mode="password"
                  defaultValue={password}
                  onValueChanged={(e) => {
                    setPassword(e.value);
                  }}
                  height={40}
                  style={{
                    display:"none"
                  }}
                ></TextBox> */}
                <TextArea
                  label="Please add a subject for this meeting."
                  labelMode="floating"
                  mode="text"
                  defaultValue={subject}
                  onValueChanged={(e) => {
                    setSubject(e.value);
                  }}
                  height={40}
                >
                  <Validator>
                    <RequiredRule message="Subject is required" />
                    <StringLengthRule
                      message="Subject must have atleast 4 symbols"
                      min={4}
                    />
                  </Validator>
                </TextArea>
              </GroupItem>
            </Form>
          </ValidationGroup>
        </div>
        <div
          style={{
            display:"flex",
            marginTop: "20px",
            justifyContent:"center"
          }}
        >
          {flag === false &&(

          <Button
            width={250}
            height={40}
            text="Verify your Email"
            type="default"
            stylingMode="contained"
            onClick = {register}
          >
          </Button>
          )}
          {flag === true && (
            
            <Button
            width={160}
            height={40}
            text="Schedule Meeting"
            type="success"
            stylingMode="contained"
            onClick={scheduleEvent}
          ></Button>
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

export default FormMain;
