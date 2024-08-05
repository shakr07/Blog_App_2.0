import React, { useEffect, useState } from "react";
import "./account.css";
import axios from "axios";

export const Account = () => {
  const [authors, setAuthors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAuthorsData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/account/");
        const blogs = response.data.user;  
        const uniqueAuthors = blogs.reduce((acc, blog) => {
          if (!acc.find((author) => author.name === blog.author)) {
            acc.push({ name: blog.author, email: blog.email });
          }
          return acc;
        }, []);

        setAuthors(uniqueAuthors);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching authors data:", error);
        setError("Failed to fetch authors data.");
        setLoading(false);
      }
    };

    fetchAuthorsData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!authors.length) return <div>No authors found.</div>;

  return (
    <section className="accountInfo">
      <div className="container">
        <h1>All Authors</h1>
        <div className="author-cards">
          {authors.map((author, index) => (
            <div className="author-card" key={index}>
              <h3>{author.name}</h3>
              <p>{author.email}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
