import React from "react";
import { Link } from "react-router";

export const Home = () => {
  return (
    <div>
      <h1>👋 Hi! I'm Ellie 👋</h1>
      <Link to={"/blog"}>Go to blog</Link>
    </div>
  );
};
