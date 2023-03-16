import React, { useState } from "react";
import image from "./QIT Logo.png";
import { FaCalendar, FaClock } from "react-icons/fa";
import { FaVideo } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";
import Card from "./ImageMain";
import { Link, useLocation } from "react-router-dom";
import PhoneVerification from "./PhoneOtp";
import { useNavigate } from "react-router-dom";
import TimeSlot from "./TimeSlot";

const TimeSlotMain = (props) => {
  const location = useLocation();
  const [meetDate, setMeetDate] = useState("");
  
  const meetingDate = location.state.meetingDate;
  const navigate = useNavigate();
  function onTimeSlotChanged(date) {
    setMeetDate(date);
  }
  return (
    <div>
      <Card>
        <div className="Container">
          <div
            className="row"
            style={{
              marginBottom: "20px",
            }}
          >
            <div className="col-md-5">
              <FaArrowLeft
                style={{
                  fontSize: "25px",
                  color: "#337AB7",
                  marginLeft: "30px",
                  marginBottom: "-30px",
                }}
                onClick={() => navigate(-1)}
              />

              <img
                src={image}
                alt=""
                style={{
                  width: "200px",
                  marginLeft: "60px",
                  marginTop: "30px",
                }}
              />
              <hr />
              <div style={{ marginLeft: "30px", paddingBottom: "5px" }}>
                <h3 style={{ fontWeight: 700, fontSize: "19px" }}>
                  Discovery Call with Quantum IT
                </h3>

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
                      //marginBottom: "10px",
                    }}
                  >
                    {" "}
                    <FaVideo
                      style={{
                        fontSize: "15px",
                        marginRight: "10px",
                        // marginBottom: "20px",
                      }}
                    />
                    Web conferencing details provided upon confirmation.
                  </p>
                  {/* Selected Meeting Date */}
                  <p
                    style={{
                      fontSize: "13px",
                      fontWeight: 700,
                      color: "#737373",
                      //marginBottom: "10px",
                    }}
                  >
                    {" "}
                    <FaCalendar
                      style={{
                        fontSize: "15px",
                        marginRight: "10px",
                        // marginBottom: "20px",
                      }}
                    />
                    {meetingDate} 
                  </p>

                  {/* selected Time slot */}
                  {meetDate && (

                  <p
                    style={{
                      fontSize: "13px",
                      fontWeight: 700,
                      color: "#737373",
                      //marginBottom: "10px",
                    }}
                  >
                    {" "}
                    <FaClock
                      style={{
                        fontSize: "15px",
                        marginRight: "10px",
                        // marginBottom: "20px",
                      }}
                    />
                    {meetDate} 
                  </p>
                  )}
                </div>
              </div>
            </div>
            <div className="col-md-7">
              <TimeSlot meetingDate={meetingDate} onDateChange={onTimeSlotChanged}/>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};
export default TimeSlotMain;
