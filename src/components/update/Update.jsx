import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./update.css";
import toast from "react-hot-toast";

export const Update = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    author: "",
    title: "",
    tag: "",
    description: "",
    imageUrl: "",
  });

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

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/update/${id}`, inputs);
      toast.success("Blog updated successfully");
      navigate("/");
    } catch (error) {
      console.error("Error updating blog:", error.message);
      toast.error(error.message || "Error updating blog");
    }
  };

  return (
    <section className="newPost">
      <div className="container boxItems">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Author Name"
            name="author"
            value={inputs.author}
            onChange={handleChange}
            className="inputField"
          />
          <input
            type="text"
            placeholder="Blog Title"
            name="title"
            value={inputs.title}
            onChange={handleChange}
            className="inputField"
          />
          <input
            type="text"
            placeholder="Blog Tag"
            name="tag"
            value={inputs.tag}
            onChange={handleChange}
            className="inputField"
          />
          <textarea
            placeholder="Blog Description"
            rows="10"
            name="description"
            value={inputs.description}
            onChange={handleChange}
            className="textareaField"
          ></textarea>
          <input
            type="text"
            placeholder="Image URL"
            name="imageUrl"
            value={inputs.imageUrl}
            onChange={handleChange}
            className="inputField"
          />
          <button className="button" type="submit">
            Update Post
          </button>
        </form>
      </div>
    </section>
  );
};
