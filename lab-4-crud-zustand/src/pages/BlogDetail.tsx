import React from "react";
import { Link, useNavigate, useParams } from "react-router";
import { usePostStore } from "../stores/post.store";
import toast, { Toaster } from "react-hot-toast";

export const BlogDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const post = usePostStore((s) => s.getPostById(id!));
  const softDeletePost = usePostStore((s) => s.softDeletePost);
  const togglePublished = usePostStore((s) => s.togglePublished);

  if (!post || post.isDeleted) return <p>Post not found</p>;

  return (
    <div>
      <Link to={"/blog"}>Go Back</Link>
      <Toaster />
      <h1>{post.title}</h1>
      <p>{post.content}</p>

      <button onClick={() => navigate(`/blog/edit/${post.id}`)}>✏️ Edit</button>
      <button
        onClick={() => {
          softDeletePost(post.id);
          toast.success("Post moved to trash");
          navigate("/blog");
        }}
      >
        🗑 Delete
      </button>
      <button onClick={() => togglePublished(post.id)}>
        {post.published ? "🚫 Unpublish" : "✅ Publish"}
      </button>
    </div>
  );
};
