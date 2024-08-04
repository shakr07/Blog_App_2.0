import React, { useState, useEffect } from "react";
import "./details.css";
import "../../components/header/header.css";
import { BsPencilSquare } from "react-icons/bs";
import { AiOutlineDelete } from "react-icons/ai";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

export const DetailsPages = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [inputs, setInputs] = useState(null); // Initialize as null

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(`/single/${id}`);
        if (response.data && response.data.success) {
          setInputs(response.data.data);
        } else {
          toast.error("Blog not found");
        }
      } catch (error) {
        console.error("Error fetching blog:", error.message);
        toast.error(error.message || "Error fetching blog");
      }
    };

    fetchBlog();
  }, [id]);

  if (!inputs) return null; // Render nothing if inputs are not loaded

  return (
    <section className="singlePage">
      <div className="container">
        <div className="left">
          <img src={inputs.imageUrl} alt="" />
        </div>
        <div className="right">
          <div className="buttons">
            <button
              className="button"
              onClick={() => navigate(`/update/${id}`)}
            >
              <BsPencilSquare />
            </button>
            <button
              className="button"
              onClick={() => {
                /* delete logic here */
              }}
            >
              <AiOutlineDelete />
            </button>
          </div>
          <h1>{inputs.title}</h1>
          <p>{inputs.description}</p>
          <p>Author: {inputs.author}</p>
        </div>
      </div>
    </section>
  );
};
