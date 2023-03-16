import React from "react";
import image from "./QIT Logo.png";
import Avatar from "@material-ui/core/Avatar";
import { FaClock } from "react-icons/fa";
import { FaVideo } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";
import Card from "./ImageMain";
import ValidEmailMain from "./ValidEmailMain";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const ValidEmail = () => {
  const navigate = useNavigate();
  return (
    <div>
      <Card>
        <div className="Container">
          <div
            className="row"
            style={{
              marginBottom: "25px",
            }}
          >
            <div className="col-md-5">
              <FaArrowLeft
                style={{
                  fontSize: "25px",
                  color: "#337AB7",
                  marginLeft: "30px",
                  marginTop: "50px",
                }}
                onClick={() =>
                  navigate("/scheduleTime/phoneAuthentication/EnterDetails")
                }
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
                </div>
              </div>
            </div>
            <div className="col-md-7">
              <ValidEmailMain />
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};
export default ValidEmail;
