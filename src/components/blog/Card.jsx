import React, { useEffect, useState } from "react";
import "./blog.css";
import { AiOutlineTags, AiOutlineClockCircle, AiOutlineAudit,AiOutlineLike } from "react-icons/ai";
import { Link } from "react-router-dom";
import axios from "axios";

export const Card = () => {
  const [blogs, setBlogs] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get("/blogs"); 
        setBlogs(response.data.data);
      } catch (error) {
        setError("Error fetching blogs.");
        console.error("Error fetching blogs:", error);
      }
    };

    fetchBlogs();
  }, []);
    
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
                <p>#{item.author}</p>
                <AiOutlineTags className="icon" />
                <a href="/">#{item.tag}</a>
              </div>
              <Link to={`/details/${item._id}`} className="link">
                <h3>{item.title}</h3>
              </Link>
              <p>{item.description.slice(0, 180)}...</p>{" "}
              {/* Changed 'desc' to 'description' */}
              <div className="date">
                <AiOutlineClockCircle className="icon" />
                <label htmlFor="">
                  {new Date(item.createdAt).toLocaleDateString()}
                </label>
                <AiOutlineLike className="icon" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
