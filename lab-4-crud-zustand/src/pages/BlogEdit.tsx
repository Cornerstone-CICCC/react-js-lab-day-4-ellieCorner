import React, { useState } from "react";
import { useParams, useNavigate } from "react-router";
import { usePostStore } from "../stores/post.store";
import toast, { Toaster } from "react-hot-toast";

export const BlogEdit = () => {
  const { id } = useParams();
  const post = usePostStore((s) => s.getPostById(id!));
  const updatePost = usePostStore((s) => s.updatePost);
  const navigate = useNavigate();

  const [title, setTitle] = useState(post?.title || "");
  const [content, setContent] = useState(post?.content || "");

  if (!post) return <p>Post not found</p>;

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <h1>✏️ Edit Post</h1>
      <Toaster />
      <label htmlFor="title">Title</label>{" "}
      <input
        name="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <label htmlFor="content">Content</label>{" "}
      <textarea
        name="content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button
        onClick={() => {
          updatePost(post.id, title, content);
          toast.success("Post Updated");
          navigate(`/blog/${post.id}`);
        }}
      >
        Save
      </button>
    </div>
  );
};
