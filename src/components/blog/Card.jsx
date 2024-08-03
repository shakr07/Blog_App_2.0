import React, { useEffect, useState } from "react";
import "./blog.css";
import {
  AiOutlineTags,
  AiOutlineClockCircle,
  AiOutlineAudit,
  AiOutlineLike,
  AiOutlineDelete,
  AiOutlineEye,
  AiFillEdit,
} from "react-icons/ai";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Card = () => {
  const [blogs, setBlogs] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get("/blogs");
        setBlogs(response.data.data);
        navigate("/");
      } catch (error) {
        setError("Error fetching blogs.");
        console.error("Error fetching blogs:", error);
      }
    };
    fetchBlogs();
  }, [navigate]);
   
  const handleDelete = async (id) => {
    try {
      await axios.delete(`/delete/${id}`);
      setBlogs(blogs.filter((blog) => blog._id !== id));
    } catch (error) {
      console.error("Error deleting post:", error);
      alert("Failed to delete post");
    }
  };

  //Editing wala cheez
  const  handleEdit=(id)=>{
    navigate(`/update/${id}`);
  }

  if (error) return <div>{error}</div>;

  return (
    <section className="blog">
      <div className="container grid3">
        {blogs.map((item) => (
          <div className="box boxItems" key={item._id}>
            <div className="img">
              <img src={item.imageUrl} alt={item.title} />
            </div>
            <div className="details">
              <div className="tag">
                <AiOutlineAudit className="icon" />
                <p>{item.author}</p>
                <AiOutlineTags className="icon" />
                <a href="/">#{item.tag}</a>
              </div>
              <Link to={`/details/${item._id}`} className="link">
                <h3>{item.title}</h3>
              </Link>
              <p>{item.description.slice(0, 180)}...</p>
              <div className="date">
                <AiOutlineClockCircle className="icon" />
                <label>{new Date(item.createdAt).toLocaleDateString()}</label>
                <AiFillEdit
                  className="icon"
                  onClick={() => handleEdit(item._id)}
                  style={{ cursor: "pointer", color: "green" }}
                />
                <AiOutlineDelete
                  className="icon"
                  onClick={() => handleDelete(item._id)}
                  style={{ cursor: "pointer", color: "orange" }}
                />
                <AiOutlineLike className="icon" />
                <AiOutlineEye
                  className="icon"
                  onClick={() => handleDelete(item._id)}
                  style={{ cursor: "pointer", color: "red" }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
