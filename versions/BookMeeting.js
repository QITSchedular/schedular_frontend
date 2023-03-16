// // import React, { useEffect, useState } from "react";
// // import { useLocation } from "react-router-dom";

// // const Bookmeeting = () => {
// //   const location = useLocation();
// //   const [attendeeEmail, setAttendeeEmail] = useState("");
// //   const [meetSubject, setMeetSubject] = useState("");
// //   const [meetDate, setMeetDate] = useState("");
// //   const [meetTime, setMeetTime] = useState("");
  
// //   const config =     {
// //     "subject": "",
// //     "body": {
// //         "contentType": "HTML",
// //         "content": "Please Confrim the joining status of the meeting.."
// //     },
// //     "start": {
// //         "dateTime": "",
// //         "timeZone": "India Standard Time"
// //     },
// //     "end": {
// //         "dateTime": "",
// //         "timeZone": "India Standard Time"
// //     },
// //     "location":{
// //         "displayName":"Online Teams Meeting"
// //     },
// //     "attendees": [
// //         {
// //         "emailAddress": {
// //             "address":"",
// //             "name": ""
// //         },
// //         "type": "required"
// //         }
// //     ],
// //     "isOnlineMeeting":true,
// //     "onlineMeetingProvider":"teamsForBusiness"
// //     }

// //   useEffect(() => {
// //     const searchParams = new URLSearchParams(location.search);
// //     setAttendeeEmail(searchParams.get("attendeeEmail") || "");
// //     setMeetSubject(searchParams.get("meetSubject") || "");
// //     setMeetDate(searchParams.get("meetDate") || "");
// //     setMeetTime(searchParams.get("meetTime") || "");

// //     config.attendees[0].emailAddress.address = searchParams.get("attendeeEmail") || "";
// //     config.start.dateTime = `${searchParams.get("meetDate") || ""}T${searchParams.get("meetTime") || ""}:00:00`;
// //     config.end.dateTime = `${searchParams.get("meetDate") || ""}T${searchParams.get("meetTime") || ""}:00:00`;
// //     setMeetSubject(searchParams.get("meetSubject") || "Business Discussion");
// //     console.log(config)
// //   }, [location]);

// //   return (
// //     <div>
// //       <h1>Meeting Scheduled</h1>
// //       <p>
// //         Your meeting with {attendeeEmail} on {meetDate} at {meetTime} for{" "}
// //         {meetSubject} has been successfully scheduled.
// //       </p>
// //     </div>
// //   );
// // };

// //export default Bookmeeting;


// // version ---2
// import React, { useEffect, useState } from "react";
// import { redirect, useLocation } from "react-router-dom";
// import axios from "axios";
// import notify from "devextreme/ui/notify";
// import { doc, getDoc, updateDoc } from "firebase/firestore";
// import { db } from "./firebase";
// import Card from "./ImageMain";
// import { FaClock, FaVideo } from "react-icons/fa";
// import image from "./QIT Logo.png";

// const Bookmeeting = () => {
//   const location = useLocation();
//   const [attendeeEmail, setAttendeeEmail] = useState("");
//   const [meetSubject, setMeetSubject] = useState("");
//   const [meetDate, setMeetDate] = useState("");
//   const [meetTime, setMeetTime] = useState("");
//   const [meetEndTime, setEndMeetTime] = useState("");

//   const [meetingScheduled, setMeetingScheduled] = useState(false);
//   const [error, setError] = useState(false);

//   const config = {
//     subject: meetSubject,
//     body: {
//       contentType: "HTML",
//       content: "Please Confirm the joining status of the meeting..",
//     },
//     start: {
//       dateTime: `${meetDate}T${meetTime}:00:00`,
//       timeZone: "India Standard Time",
//     },
//     end: {
//       dateTime: `${meetDate}T${meetEndTime}:00:00`,
//       timeZone: "India Standard Time",
//     },
//     location: {
//       displayName: "Online Teams Meeting",
//     },
//     attendees: [
//       {
//         emailAddress: {
//           address: attendeeEmail,
//           name: "",
//         },
//         type: "required",
//       },
//     ],
//     isOnlineMeeting: true,
//     onlineMeetingProvider: "teamsForBusiness",
//   };

//   useEffect(() => {
//     const searchParams = new URLSearchParams(location.search);
//     // console.log(searchParams.get("query"));
//     const query = searchParams.get("query");
//     async function fetchDoc(){
      
//       const docRef = await doc(db, 'meetings', query);
//       //check if the document exits or not
//       const docSnap = await getDoc(docRef);
//         if (docSnap.exists()) {
//         await updateDoc(docRef, { ["flag"]: true });
//       } else {
//         console.log("Document does not exist.");
//       }
//     }
//     fetchDoc();
    
//   }, [location]);

//   const handleScheduleMeeting = async (e) => {
//   e.preventDefault();
//     // const url = "api/bookmeeting"
//     // const response = await axios.post(url,config);
//     // if(response.status == 201){
//     //   const options = {
//     //     message: "Your Meeting has been booked. Please Check your email for teams link.",
//     //     position: {
//     //         at: "center",
//     //         my: "center",
//     //         of: window
//     //     },
//     //     width: "100%",
//     //     type:"success",
//     //     displayTime: 1500,
//     //     shading: false
//     // };
    
//     // // show the notify widget with the options
//     // notify(options);
//     // redirect("/");
//     // } else{
//     //   const options = {
//     //     message: "Something went wrong, please try gain after sometime",
//     //     position: {
//     //         at: "center",
//     //         my: "center",
//     //         of: window
//     //     },
//     //     width: "100%",
//     //     type:"danger",
//     //     displayTime: 1500,
//     //     shading: false
//     // };
    
//     // // show the notify widget with the options
//     // notify(options);
//     // redirect("/");
//     // }
//   };

//   return (
//     // <div>
//     //   {!meetingScheduled && !error && (
//     //     <>
//     //       <h1>Schedule Meeting</h1>
//     //       <p>
//     //         Please confirm the details of your meeting with {attendeeEmail} on{" "}
//     //         {meetDate} at {meetTime} for {meetSubject}.
//     //       </p>
//     //       <button onClick={handleScheduleMeeting}>Schedule Meeting</button>
//     //     </>
//     //   )}

//     //   {meetingScheduled && (
//     //     <>
//     //       <h1>Meeting Scheduled</h1>
//     //       <p>
//     //         Your meeting with {attendeeEmail} on {meetDate} at {meetTime} for{" "}
//     //         {meetSubject} has been successfully scheduled.
//     //       </p>
//     //     </>
//     //   )}

//     //   {error && (
//     //     <>
//     //       <h1>Error</h1>
//     //       <p>There was an error scheduling your meeting.</p>
//     //     </>
//     //   )}
//     // </div>
//     <>

//     <Card>
//     <div className="Container">
//           <div className="row">
//             <div className="col-md-5">
//               <img
//                 src={image}
//                 alt=""
//                 style={{
//                   width: "200px",
//                   marginLeft: "60px",
//                   marginTop: "30px",
//                 }}
//               />
//               <hr />
//               <div style={{ marginLeft: "30px", paddingBottom: "5px" }}>
//                 <h2 style={{ fontWeight: 700 }}>
//                   Your Email has been confirmed.
//                   <p
//                                         style={{
//                                           fontSize: "13px",
//                                           fontWeight: 700,
//                                           color: "#737373",
//                                         }}
//                   >You can close this page and proceed with the booking</p>
//                 </h2>
//                 <div style={{ marginTop: "30px" }}>
//                   <p
//                     style={{
//                       fontSize: "13px",
//                       fontWeight: 700,
//                       color: "#737373",
//                     }}
//                   >
//                     {" "}
//                     <FaClock
//                       style={{ fontSize: "15px", marginRight: "10px" }}
//                     />
//                     30 min
//                   </p>
//                   <p
//                     style={{
//                       fontSize: "13px",
//                       fontWeight: 700,
//                       color: "#737373",
//                     }}
//                   >
//                     {" "}
//                     <FaVideo
//                       style={{ fontSize: "15px", marginRight: "10px" }}
//                     />
//                     Web conferencing details provided upon confirmation.
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//     </Card>

//     </>
//   );
// };

// export default Bookmeeting;

/// After Use Memo:
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import SelectBox from "devextreme-react/select-box";
import axios from 'axios';
import { pushslots }  from './services/calendar/PushSlots';
import LoaderPortal from './Loader';

const timeSlotSelection = [
  "11.00 AM",
  "12.00 PM",
  "01.00 PM",
  "02.00 PM",
  "03.00 PM",
  "04.00 PM",
  "05.00 PM",
  "06.00 PM",
];
const now = new Date();
var availableSlots;

const TimeSlot = ({ meetingDate, onDateChange, meetDate}) => {
  const selectedMeetingDate = meetingDate.split('-')[2];
  const navigate = useNavigate();
  const [fromDateOne, setFromDateOne] = React.useState("");
  const [timeSlots, setTimeSlots] = React.useState([]);
  const [bookingDate, setBookingDate] = React.useState("");
  const [selectedTimeSlot, setSetSelectedTimeSlot] = React.useState("");
  const [mySelection, setMySelection] = React.useState(null);
  const [loader, setLoader] = React.useState(true);
  // React.useEffect(() => {
  //   setLoader(true);
  //   const now = new Date();
  //   const currentHour = now.getHours();
  //   let startHour, endHour;

  //   // If the meeting date is other than the current date
  //   if (parseInt(selectedMeetingDate) > now.getDate()) {
  //     startHour = new Date(
  //       now.getFullYear(),
  //       now.getMonth(),
  //       now.getDate(),
  //       11
  //     );
  //     endHour = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 18);
  //   }

  //   // if the current minute  is pass 30, skip the next hour slot
  //   else if(now.getMinutes() > 35) {
  //     startHour = new Date(
  //       now.getFullYear(),
  //       now.getMonth(),
  //       now.getDate(),
  //       currentHour + 2
  //     );
  //     endHour = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 18);
  //   } else {
  //     // for current date
  //     startHour = new Date(
  //       now.getFullYear(),
  //       now.getMonth(),
  //       now.getDate(),
  //       currentHour + 1
  //     ); // Start from the next hour
  //     endHour = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 18);
  //   }
  //   const slots = [];

  //   for (let i = 0; i < 7; i++) {
  //     // 8 slots for 1 hour interval from current hour to 6 PM
  //     const hour = startHour.getHours() + i; // 10+0
  //     if (hour > endHour.getHours()) {
  //       break; // Exit loop if current slot goes beyond 6 PM
  //     }
  //     const meridian = hour >= 12 ? "PM" : "AM";
  //     const formattedHour = hour % 12 || 12;
  //     const slotTime = `${formattedHour
  //       .toString()
  //       .padStart(2, "0")}:00 ${meridian}`; // Always show whole hour with :00
  //     slots.push(slotTime);
  //   }
    
  //   const fetchMeetingSlots = async ()=>{
  //     console.log("yes Bro again")
  //     const response = await axios.post(`api/test`,{
  //       meetingDate: meetingDate
  //     });
      
  //     const jsonString = response.data.substring(10);
  //     const jsonData = JSON.parse(jsonString);
  //     availableSlots = jsonData.value[0].availabilityView.split('');
  //     const slotsresponse = await pushslots(slots, availableSlots);
  //     setLoader(false);
      
  //     setTimeSlots(slotsresponse);
  //     setBookingDate(meetingDate);
  //     localStorage.setItem("flag","true");
  //   };
  //   const flag = localStorage.getItem("flag");
    
  //   fetchMeetingSlots();
  //   // console.log(typeof localStorage.getItem("flag"))
    
  // }, [selectedMeetingDate, meetingDate]);

  const slots = React.useMemo(() => {
    const now = new Date();
    const currentHour = now.getHours();
    let startHour, endHour;
  
    // If the meeting date is other than the current date
    if (parseInt(selectedMeetingDate) > now.getDate()) {
      startHour = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        11
      );
      endHour = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 18);
    }
  
    // if the current minute  is pass 30, skip the next hour slot
    else if(now.getMinutes() > 35) {
      startHour = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        currentHour + 2
      );
      endHour = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 18);
    } else {
      // for current date
      startHour = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        currentHour + 1
      ); // Start from the next hour
      endHour = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 18);
    }
    const slots = [];
  
    for (let i = 0; i < 7; i++) {
      // 8 slots for 1 hour interval from current hour to 6 PM
      const hour = startHour.getHours() + i; // 10+0
      if (hour > endHour.getHours()) {
        break; // Exit loop if current slot goes beyond 6 PM
      }
      const meridian = hour >= 12 ? "PM" : "AM";
      const formattedHour = hour % 12 || 12;
      const slotTime = `${formattedHour
        .toString()
        .padStart(2, "0")}:00 ${meridian}`; // Always show whole hour with :00
      slots.push(slotTime);
    }
  
    return slots;
  }, [selectedMeetingDate,mySelection]);
  
  const fetchMeetingSlots = React.useCallback(async () => {
    const response = await axios.post(`api/test`,{
      meetingDate: meetingDate
    });
    
    const jsonString = response.data.substring(10);
    const jsonData = JSON.parse(jsonString);
    availableSlots = jsonData.value[0].availabilityView.split('');
    const slotsresponse = await pushslots(slots, availableSlots);
    setLoader(false);
    setTimeSlots(slotsresponse);
    setBookingDate(meetingDate);
    localStorage.setItem("flag","true");
    setMySelection(localStorage.setItem("flag","true"))
    localStorage.setItem("mytime",slotsresponse[0]);
  }, [meetingDate]);
  
  React.useEffect(() => {
    setLoader(true);
    const flag = localStorage.getItem("flag");
    const selSlot = localStorage.getItem("selectedslot");
    if (flag === "true") {
      setMySelection(localStorage.getItem("mytime"))
      setTimeSlots(slots);
      setLoader(false);
    } else {
      fetchMeetingSlots();
    }
  }, [selectedMeetingDate, meetingDate, slots, fetchMeetingSlots]);

  const onTimeSlotChanged = (e) => {
    // console.log(e.value);

    let selectedTimeForMeet = parseInt(e.value.split(':')[0]);
    if(selectedTimeForMeet < 10){
      selectedTimeForMeet+=12;
      setSetSelectedTimeSlot(selectedTimeForMeet);
    }
    setSetSelectedTimeSlot(selectedTimeForMeet);
    onDateChange(e.value);
    localStorage.setItem("mytime",e.value);
    setMySelection(e.value);
  };

  return(
 <>
    {loader && <LoaderPortal />}
      <div style={{ marginLeft: "20px", marginBottom: "20px" }}>
      
      <div className="col-md-7">
        <h4
          style={{
            fontSize: "20px",
            fontWeight: 700,
            marginTop: "25px",
            marginBottom: "22px",
          }}
        >
          Select a Time Slot
        </h4>
        <div style={{ marginBottom: "50px" }}>
          <SelectBox
            dataSource={timeSlots}
            label="Book a Time Slot"
            labelMode="floating"
            defaultValue={timeSlots[0] || localStorage.getItem("mytime")}
            onValueChanged={onTimeSlotChanged}
            
          />

          <br />
          <Link 
          to="/scheduleTime/phoneAuthentication/EnterDetails"
          state={{meetingDate: meetingDate, selectedTimeSlot: selectedTimeSlot, mySelection: mySelection}} 
          style={{ textDecoration: "none" }}>
            <Button
              variant="contained"
              style={{
                marginTop: "30px",
                width: "160px",
                height: "40px",
                backgroundColor: "#337AB7",
                fontSize: "15px",
                color: "white",
              }}
            >
              Confirm
            </Button>
          </Link>
        </div>
      </div>
    </div>
    </>
    
  // ) : (
    // <div style={{ marginLeft: "20px", marginBottom: "20px" }}>
    //   <div className="col-md-7">
    //     <h3
    //       style={{
    //         fontSize: "20px",
    //         fontWeight: 700,
    //         marginTop: "25px",
    //         marginBottom: "22px",
    //       }}
    //     >
    //       Select a Time Slot
    //     </h3>
    //     <div style={{ marginBottom: "50px" }}>
    //       <SelectBox
    //         dataSource={timeSlots}
    //         label="Time Slot"
    //         labelMode="floating"
    //         value={timeSlotSelection[0]}
    //         onValueChanged={onTimeSlotChanged}
    //       />

    //       <br />
    //       <Link to="/scheduleTime/phoneAuthentication/EnterDetails" style={{ textDecoration: "none" }}>
    //         <Button
    //           variant="contained"
    //           style={{
    //             marginTop: "30px",
    //             width: "200px",
    //             height: "40px",
    //             backgroundColor: "#337AB7",
    //             fontSize: "15px",
    //             color: "white",
    //           }}
    //         >
    //           Submit
    //         </Button>
    //       </Link>
    //     </div>
    //   </div>
    // </div>
  );
};
export default TimeSlot;
