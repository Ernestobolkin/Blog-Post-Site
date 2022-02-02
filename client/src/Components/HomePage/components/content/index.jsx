import { Routes, Route } from "react-router";
import { PostsList } from "../postsList";
export const Content = () => {
  return (
    <Routes>
      <Route path="/home" element={<PostsList />} />
    </Routes>
  );
};
