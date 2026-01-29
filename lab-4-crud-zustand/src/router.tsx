import { createBrowserRouter } from "react-router";
import { BlogDetail } from "./pages/BlogDetail";
import { BlogEdit } from "./pages/BlogEdit";
import { BlogList } from "./pages/BlogList";
import { BlogNew } from "./pages/BlogNew";
import { Home } from "./pages/Home";
import { Trash } from "./pages/Trash";

export const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/blog", element: <BlogList /> },
  { path: "/blog/:id", element: <BlogDetail /> },
  { path: "/blog/new", element: <BlogNew /> },
  { path: "/blog/edit/:id", element: <BlogEdit /> },
  { path: "/trash", element: <Trash /> },
]);
