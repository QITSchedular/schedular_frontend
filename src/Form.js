import React, { useContext } from "react";
import image from "./QIT Logo.png";
import Avatar from "@material-ui/core/Avatar";
import { FaCalendar, FaCalendarAlt, FaClock } from "react-icons/fa";
import { FaVideo } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";
import Card from "./ImageMain";
import FormMain from "./FormMain";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Form = () => {
  const navigate = useNavigate();
  const location =  useLocation();
  const meetData = location.state;
  
  // Formatting the date
  const dateString = meetData.meetingDate;
  const date = new Date(dateString);
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = date.toLocaleDateString('en-US', options);
  console.log(formattedDate); // "Saturday, March 18, 2023"

  // Formatting the time:
  const am = meetData.mySelection.split(' ')[1];
  let endTime
  if(am === 'PM'){
    endTime = `${meetData.mySelection.split(' ')[0]} - ${meetData.mySelection.split(':')[0]}:30 PM`
  } else{
    endTime = `${meetData.mySelection.split(' ')[0]} - ${meetData.mySelection.split(':')[0]}:30 AM`
  }
  console.log(endTime)
// const timeString = meetData.mySelection;
// const startDate = new Date(`2000-01-01T${timeString}`);

// const endDate = new Date(startDate);
// endDate.setMinutes(endDate.getMinutes() + 30);

// const startFormatted = startDate.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
// const endFormatted = endDate.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });

// const formattedTime = `${startFormatted} - ${endFormatted}`;
// console.log(formattedTime); // "2:00 PM - 2:30 PM"

  
  
  return (
    <div>
      <Card>
        <div className="Container">
          <div className="row">
            <div className="col-md-5">
              <FaArrowLeft
                style={{
                  fontSize: "25px",
                  color: "#337AB7",
                  marginLeft: "30px",
                  marginTop: "50px",
                }}
                onClick={() => navigate(-1)}
              />

              <img
                src={image}
                alt=""
                style={{
                  width: "200px",
                  marginLeft: "60px",
                  marginTop: "50px",
                }}
              />
              <hr />
              <div style={{ marginLeft: "30px", paddingBottom: "5px" }}>
                <h2 style={{ fontWeight: 700, fontSize: "19px" }}>
                  Discovery Call with Quantum IT
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
                  <p
                    style={{
                      fontSize: "13px",
                      fontWeight: 700,
                      color: "#737373",
                    }}
                  >
                    {" "}
                    <FaCalendar
                      style={{ fontSize: "15px", marginRight: "10px" }}
                    />
                    {endTime + ", " + formattedDate}
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-7">
              <FormMain meetData={meetData}/>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};
export default Form;
