import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CalendarRender from "./Image";
import TimeSlotMain from "./TimeSlotMain";
import PhoneOtpMain from "./PhoneOtpMain";
import Form from "./Form";
import ValidEmail from "./ValidEmail";
import IsEmailVerified from "./IsEmailVerified";
import Bookmeeting from "./Bookmeeting";

export default function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<CalendarRender />} />

          <Route path="/scheduleTime" element={<TimeSlotMain />} />
          <Route
            path="/scheduleTime/phoneAuthentication/"
            element={<PhoneOtpMain />}
          />
          <Route
            path="/scheduleTime/phoneAuthentication/EnterDetails"
            element={<Form />}
          />
          <Route
            path="/scheduleTime/phoneAuthentication/EnterDetails/EmailVerification"
            element={<ValidEmail />}
          />
          <Route
            path="/scheduleTime/phoneAuthentication/EnterDetails/EmailVerification/Status"
            element={<IsEmailVerified />}
          />

          {/* After click on the email link: redirection here */}
          <Route
            path="/bookmeeting"
            element={<Bookmeeting />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
