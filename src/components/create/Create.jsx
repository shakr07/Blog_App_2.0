import React, { useState } from "react";
import axios from "axios";
import "./create.css";
import toast from "react-hot-toast";
export const Create = () => {
  const [formData, setFormData] = useState({
    author: "",
    title: "",
    tag: "",
    description: "",
    imageUrl: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/create", formData);
      if (response.data.success) {
        toast.success("Blog created successfully");
        
      }
    } catch (error) {
      toast.error("Error creating blog:", error);
    }
  };

  return (
    <section className="newPost">
      <div className="container boxItems">
        <div className="img">
          <img
            src="https://www.shutterstock.com/shutterstock/photos/2156639653/display_1500/stock-photo-fox-head-symbol-graphic-design-with-a-simple-and-clean-shape-2156639653.jpg"
            alt="Preview"
            className="image-preview"
          />
        </div>
        <form onSubmit={handleSubmit}>
          <div className="inputfile">
            <input
              type="file"
              accept="image/*"
              id="fileInput"
              onChange={(e) => handleChange(e)}
            />
          </div>
          <input
            type="text"
            name="author"
            placeholder="Author Name"
            value={formData.author}
            onChange={handleChange}
            className="inputField"
            required
          />
          <input
            type="text"
            name="title"
            placeholder="Blog Title"
            value={formData.title}
            onChange={handleChange}
            className="inputField"
            required
          />
          <input
            type="text"
            name="tag"
            placeholder="Blog Tag"
            value={formData.tag}
            onChange={handleChange}
            className="inputField"
            required
          />
          <textarea
            name="description"
            placeholder="Blog Description"
            rows="10"
            value={formData.description}
            onChange={handleChange}
            className="textareaField"
            required
          ></textarea>
          <input
            type="text"
            name="imageUrl"
            placeholder="Image URL"
            value={formData.imageUrl}
            onChange={handleChange}
            className="inputField"
            required
          />
          <button type="submit" className="button">
            Create Post
          </button>
        </form>
      </div>
    </section>
  );
};
