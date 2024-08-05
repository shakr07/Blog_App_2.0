import Spinner from "../../spinner/Spinner";
import React,{useEffect }from "react";
import { useNavigate } from "react-router-dom";

function Logout() {
  const navigate = useNavigate();

  const out = () => {

    // localStorage.removeItem("username");
    // localStorage.removeItem("token"); 
    navigate("/login");
  };
  useEffect(() => {
    out();
  }, [navigate]);

  return (
    <div>
      <Spinner/>
      <p>Logging out...</p>
    </div>
  );
}

export default Logout;
