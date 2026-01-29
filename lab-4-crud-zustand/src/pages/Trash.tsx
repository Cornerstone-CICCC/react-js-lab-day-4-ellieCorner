import { Link } from "react-router";
import { usePostStore } from "../stores/post.store";
import toast, { Toaster } from "react-hot-toast";

export const Trash = () => {
  const posts = usePostStore((s) => s.posts);
  const deletedPosts = posts.filter((p) => p.isDeleted);
  const recoverPost = usePostStore((s) => s.recoverPost);
  const deletePermanently = usePostStore((s) => s.deletePermanently);

  return (
    <div>
      <Link to={"/blog"}>Go back</Link>
      <Toaster />
      <h1>🗑 Trash</h1>

      {deletedPosts.length === 0 && <p>No deleted posts</p>}

      <ul>
        {deletedPosts.map((post) => (
          <li key={post.id}>
            <strong>{post.title}</strong>

            <button
              onClick={() => {
                recoverPost(post.id);
                toast.success("Post recovered");
              }}
            >
              ♻ Recover
            </button>

            <button
              onClick={() => {
                deletePermanently(post.id);
                toast.error("Post permanently deleted");
              }}
            >
              ❌ Delete permanently
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
