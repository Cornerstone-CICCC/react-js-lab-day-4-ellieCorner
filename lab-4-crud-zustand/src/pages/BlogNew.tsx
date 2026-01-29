import React, { useState } from "react";
import { usePostStore } from "../stores/post.store";
import { Link, useNavigate } from "react-router";

export const BlogNew = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const addPost = usePostStore((s) => s.addPost);
  const navigate = useNavigate();

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Link to={"/blog"}>Go back</Link>
      <h1>➕ New Post</h1>
      <label htmlFor="title">Title</label>
      <input
        name="title"
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <label htmlFor="content">Content</label>
      <textarea
        name="content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button
        onClick={() => {
          addPost(title, content);
          navigate("/blog");
        }}
      >
        🎉 Create
      </button>
    </div>
  );
};
