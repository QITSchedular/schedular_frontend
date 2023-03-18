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
  const displayTime = localStorage.getItem('mytime');
  const selectedMeetingDate = meetingDate.split('-')[2];
  const navigate = useNavigate();
  const [fromDateOne, setFromDateOne] = React.useState("");
  const [timeSlots, setTimeSlots] = React.useState([]);
  const [bookingDate, setBookingDate] = React.useState("");
  const [selectedTimeSlot, setSetSelectedTimeSlot] = React.useState("");
  const [mySelection, setMySelection] = React.useState("");
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
  }, [meetingDate]);
  
  const fetchMeetingSlots = React.useCallback(async () => {
    const response = await axios.post(`https://subd.qitsolution.co.in/api/test`,{
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

    localStorage.setItem("mytime",slotsresponse[0]);
    setMySelection(localStorage.getItem('mytime'));
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
            defaultValue={localStorage.getItem("mytime")}
            onValueChanged={onTimeSlotChanged}
            
          />

          <br />
          <Link 
          to="/scheduleTime/phoneAuthentication/EnterDetails"
          state={{meetingDate: meetingDate, selectedTimeSlot: selectedTimeSlot, mySelection: mySelection, displayTime: displayTime}} 
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
