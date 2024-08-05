import React from "react";
import { IoCreateOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
export const User = () => {

  return (
    <div className="profile">
  
          <div className="userOptions">

            <Link to="/logout" className="option">
              <IoCreateOutline className="icon" />
              <h4>Logout</h4>
            </Link>

           
          </div>

    </div>
  );
};
