import React from "react";
import { usePostStore } from "../stores/post.store";
import { Link } from "react-router";

export const BlogList = () => {
  const posts = usePostStore((s) => s.posts);
  const visiblePosts = posts.filter((p) => !p.isDeleted);

  return (
    <div>
      <Link to={"/"}>Go back </Link>
      <h1>📄 Post List</h1>
      <Link to={"/blog/new"}>Create Post</Link>
      {visiblePosts.length > 0 ? (
        <ul>
          {visiblePosts.map((post) => (
            <li key={post.id}>
              <Link to={`/blog/${post.id}`}>
                {post.title} {post.published ? "🟢" : "🔴"}
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>There's no post...</p>
      )}
      <Link to={"/trash"}>Go to Trash</Link>
    </div>
  );
};
