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
import Spinner from "../../spinner/Spinner";
import toast from "react-hot-toast";

export const Card = () => {
  const [blogs, setBlogs] = useState([]);
  const [error, setError] = useState(null);
  const [likes, setLikes] = useState({});
  const [filterAuthor, setFilterAuthor] = useState(""); 
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get("/blogs");
        setBlogs(response.data.data);
        const initialLikes = {};
        response.data.data.forEach((blog) => {
          initialLikes[blog._id] = blog.likesCount || 0;
        });
        setLikes(initialLikes);
      } catch (error) {
        setError("Error fetching blogs.");
        console.error("Error fetching blogs:", error);
      }
    };
    fetchBlogs();
  }, [navigate]);

  const handleDelete = async (id,author) => {
    try {
       const value = localStorage.getItem("name");
       console.log(value);
       if (author === value) {
         await axios.delete(`/delete/${id}`);
         setBlogs(blogs.filter((blog) => blog._id !== id));
       } else toast.error("This is not your post you cannot delete");
      
    } catch (error) {
      console.error("Error deleting post:", error);
      toast.error("Failed to delete post");
    }
  };

  const handleEdit = (id,author) => {
    console.log(id+' '+author);
    const value = localStorage.getItem("name");
    console.log(value);
    
    if(author===value)
    {
      navigate(`/update/${id}`);
    }
    else
    toast.error("This is not your post you cannot edit");
  };

  const Content = (id) => {
    navigate(`/details/${id}`);
  };

  const handleLike = async (id) => {
    try {
      const username = localStorage.getItem('name');
      console.log(username);
      
      if (!username) {
        toast.error("Username not found");
        return;
      }

      const response = await axios.post(`/like/${id}/${username}`);
      if (response.data.success) {
        setLikes((prevLikes) => ({
          ...prevLikes,
          [id]: response.data.likesCount,
        }));
      } else {
        console.error("Failed to update like count.");
      }
    } catch (error) {
      console.error("Error liking post:", error);
      toast.error("Failed to like post");
    }
  };

  if (error) return <Spinner />;


  const filteredBlogs = blogs.filter((blog) => {
    if (!filterAuthor) return true;
    return blog.author.toLowerCase().includes(filterAuthor.toLowerCase());
  });

  return (
    <section className="blog">
      <div className="container">
       
        <div className="filter-controls">
          <input
            type="text"
            placeholder="Filter by author"
            value={filterAuthor}
            onChange={(e) => setFilterAuthor(e.target.value)}
          />
        </div>

       
        <div className="grid3">
          {filteredBlogs.map((item) => (
            <div className="box boxItems" key={item._id}>
              <div className="img">
                <img src={item.imageUrl} alt={item.title} />
              </div>
              <div className="details">
                <div className="tag">
                  <AiOutlineAudit className="icon" />
                  <p className="author">{item.author}</p>
                  <AiOutlineTags className="icon" />
                  <p className="tags">#{item.tag}</p>
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
                    onClick={() => handleEdit(item._id,item.author)}
                    style={{ cursor: "pointer", color: "green" }}
                  />
                  <AiOutlineDelete
                    className="icon"
                    onClick={() => handleDelete(item._id,item.author)}
                    style={{ cursor: "pointer", color: "black" }}
                  />
                  <AiOutlineLike
                    className="icon"
                    onClick={() => handleLike(item._id)}
                    style={{ cursor: "pointer", color: "orange" }}
                  />
                  <p>{likes[item._id] > 0 ? likes[item._id] : 0}</p>
                  <AiOutlineEye
                    className="icon"
                    onClick={() => Content(item._id)}
                    style={{ cursor: "pointer", color: "red" }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
