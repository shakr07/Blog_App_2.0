import React from "react";
import { IoCreateOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { MdDeleteForever } from "react-icons/md";

export const User = () => {
  const user = true;

  return (
    <div className="profile">
      {user ? (
        <>
          <div className="userOptions">

            <Link to="/create" className="option">
              <IoCreateOutline className="icon" />
              <h4>Create Post</h4>
            </Link>
            <Link to="/create" className="option">
              <MdDeleteForever className="icon" />
              <h4>Delete</h4>
            </Link>
           
          </div>
        </>
      ) : (
        <button>My Account</button>
      )}
    </div>
  );
};
