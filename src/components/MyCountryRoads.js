import React, { useState } from "react";
import {ApplicationViews} from "./ApplicationViews";
import { Login } from "./Auth/Login";
import { Logout } from "./Auth/Logout";
import { Register } from "./Auth/Register";
import { Route, Routes, Navigate } from "react-router-dom";
import { PropsAndState } from "./PropsAndState";
import { NavBar } from "./nav/NavBar";


export const MyCountryRoads = () => {

  const [loggedin, setLoggedin] = useState(false);

  const changeState = (bool) => setLoggedin(bool);

  if (localStorage.getItem("roads_user")) {
    return (
      <>
        <NavBar />
        <PropsAndState yourName={""} />
        <h3>Thank you for logging on to My Country Roads - a message board
          for driving enthusiasts in West Virginia. We are interested in providing a forum you can use to 
          update others and find information about fun and challenging roads to drive on, and events
          that would interest those of like minds.

        </h3>
        <ApplicationViews />
      </>
    );
} 
else { 
  return (
    <Routes>
       <Route path="/" element={<Navigate to="login" />} />
        <Route path="/login" element={<Login setLoggedin={changeState} />} />
        <Route path="/register" element={<Register setLoggedin={changeState} />} />
        
    </Routes>
  );
}

};