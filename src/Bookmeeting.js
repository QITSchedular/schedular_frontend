// import React, { useEffect, useState } from "react";
// import { useLocation } from "react-router-dom";

// const Bookmeeting = () => {
//   const location = useLocation();
//   const [attendeeEmail, setAttendeeEmail] = useState("");
//   const [meetSubject, setMeetSubject] = useState("");
//   const [meetDate, setMeetDate] = useState("");
//   const [meetTime, setMeetTime] = useState("");
  
//   const config =     {
//     "subject": "",
//     "body": {
//         "contentType": "HTML",
//         "content": "Please Confrim the joining status of the meeting.."
//     },
//     "start": {
//         "dateTime": "",
//         "timeZone": "India Standard Time"
//     },
//     "end": {
//         "dateTime": "",
//         "timeZone": "India Standard Time"
//     },
//     "location":{
//         "displayName":"Online Teams Meeting"
//     },
//     "attendees": [
//         {
//         "emailAddress": {
//             "address":"",
//             "name": ""
//         },
//         "type": "required"
//         }
//     ],
//     "isOnlineMeeting":true,
//     "onlineMeetingProvider":"teamsForBusiness"
//     }

//   useEffect(() => {
//     const searchParams = new URLSearchParams(location.search);
//     setAttendeeEmail(searchParams.get("attendeeEmail") || "");
//     setMeetSubject(searchParams.get("meetSubject") || "");
//     setMeetDate(searchParams.get("meetDate") || "");
//     setMeetTime(searchParams.get("meetTime") || "");

//     config.attendees[0].emailAddress.address = searchParams.get("attendeeEmail") || "";
//     config.start.dateTime = `${searchParams.get("meetDate") || ""}T${searchParams.get("meetTime") || ""}:00:00`;
//     config.end.dateTime = `${searchParams.get("meetDate") || ""}T${searchParams.get("meetTime") || ""}:00:00`;
//     setMeetSubject(searchParams.get("meetSubject") || "Business Discussion");
//     console.log(config)
//   }, [location]);

//   return (
//     <div>
//       <h1>Meeting Scheduled</h1>
//       <p>
//         Your meeting with {attendeeEmail} on {meetDate} at {meetTime} for{" "}
//         {meetSubject} has been successfully scheduled.
//       </p>
//     </div>
//   );
// };

//export default Bookmeeting;


// version ---2
import React, { useEffect, useState } from "react";
import { redirect, useLocation } from "react-router-dom";
import axios from "axios";
import notify from "devextreme/ui/notify";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "./firebase";
import Card from "./ImageMain";
import { FaClock, FaVideo } from "react-icons/fa";
import image from "./QIT Logo.png";
import LoaderPortal from "./Loader";

const Bookmeeting = () => {
  const location = useLocation();
  const [attendeeEmail, setAttendeeEmail] = useState("");
  const [meetSubject, setMeetSubject] = useState("");
  const [meetDate, setMeetDate] = useState("");
  const [meetTime, setMeetTime] = useState("");
  const [meetEndTime, setEndMeetTime] = useState("");

  const [meetingScheduled, setMeetingScheduled] = useState(false);
  const [loader, setLoader] = useState(false);

  const config = {
    subject: meetSubject,
    body: {
      contentType: "HTML",
      content: "Please Confirm the joining status of the meeting..",
    },
    start: {
      dateTime: `${meetDate}T${meetTime}:00:00`,
      timeZone: "India Standard Time",
    },
    end: {
      dateTime: `${meetDate}T${meetEndTime}:00:00`,
      timeZone: "India Standard Time",
    },
    location: {
      displayName: "Online Teams Meeting",
    },
    attendees: [
      {
        emailAddress: {
          address: attendeeEmail,
          name: "",
        },
        type: "required",
      },
    ],
    isOnlineMeeting: true,
    onlineMeetingProvider: "teamsForBusiness",
  };

  useEffect(() => {
    setLoader(true);
    const searchParams = new URLSearchParams(location.search);
    // console.log(searchParams.get("query"));
    const query = searchParams.get("query");
    async function fetchDoc(){
      
      const docRef = await doc(db, 'meetings', query);
      //check if the document exits or not
      const docSnap = await getDoc(docRef);
      setLoader(false);
        if (docSnap.exists()) {
        await updateDoc(docRef, { ["flag"]: true });
      } else {
        console.log("Document does not exist.");
      }
    }
    fetchDoc();
    
  }, [location]);

  const handleScheduleMeeting = async (e) => {
  e.preventDefault();
    // const url = "api/bookmeeting"
    // const response = await axios.post(url,config);
    // if(response.status == 201){
    //   const options = {
    //     message: "Your Meeting has been booked. Please Check your email for teams link.",
    //     position: {
    //         at: "center",
    //         my: "center",
    //         of: window
    //     },
    //     width: "100%",
    //     type:"success",
    //     displayTime: 1500,
    //     shading: false
    // };
    
    // // show the notify widget with the options
    // notify(options);
    // redirect("/");
    // } else{
    //   const options = {
    //     message: "Something went wrong, please try gain after sometime",
    //     position: {
    //         at: "center",
    //         my: "center",
    //         of: window
    //     },
    //     width: "100%",
    //     type:"danger",
    //     displayTime: 1500,
    //     shading: false
    // };
    
    // // show the notify widget with the options
    // notify(options);
    // redirect("/");
    // }
  };

  return (
    // <div>
    //   {!meetingScheduled && !error && (
    //     <>
    //       <h1>Schedule Meeting</h1>
    //       <p>
    //         Please confirm the details of your meeting with {attendeeEmail} on{" "}
    //         {meetDate} at {meetTime} for {meetSubject}.
    //       </p>
    //       <button onClick={handleScheduleMeeting}>Schedule Meeting</button>
    //     </>
    //   )}

    //   {meetingScheduled && (
    //     <>
    //       <h1>Meeting Scheduled</h1>
    //       <p>
    //         Your meeting with {attendeeEmail} on {meetDate} at {meetTime} for{" "}
    //         {meetSubject} has been successfully scheduled.
    //       </p>
    //     </>
    //   )}

    //   {error && (
    //     <>
    //       <h1>Error</h1>
    //       <p>There was an error scheduling your meeting.</p>
    //     </>
    //   )}
    // </div>
    <>

    <Card>
      {loader && <LoaderPortal />}
    <div className="Container">
          <div className="row">
            <div className="col d-flex flex-column align-items-center">
              <img
                src={image}
                alt=""
                style={{
                  width: "350px",
                  marginTop: "30px",
                  objectFit:"cover"
                }}
              />
              <hr />
              <div style={{ marginLeft: "30px", paddingBottom: "5px" }}>
                <h2 style={{ fontWeight: 700 }}>
                  Your Email has been confirmed.
                  <p
                                        style={{
                                          fontSize: "13px",
                                          fontWeight: 700,
                                          color: "#737373",
                                        }}
                  >You can close this page and proceed with the booking</p>
                </h2>
                <div style={{ marginTop: "30px" }}>
                  <p
                    style={{
                      fontSize: "13px",
                      fontWeight: 700,
                      color: "#737373",
                    }}
                  >
                    {" "}
                    <FaClock
                      style={{ fontSize: "15px", marginRight: "10px" }}
                    />
                    30 min
                  </p>
                  <p
                    style={{
                      fontSize: "13px",
                      fontWeight: 700,
                      color: "#737373",
                    }}
                  >
                    {" "}
                    <FaVideo
                      style={{ fontSize: "15px", marginRight: "10px" }}
                    />
                    Web conferencing details provided upon confirmation.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
    </Card>

    </>
  );
};

export default Bookmeeting;

