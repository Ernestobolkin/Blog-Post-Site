import { Routes, Route } from "react-router";
import { PostsList } from "../postsList";
export const Content = ({ getData }) => {
  return (
    <Routes>
      <Route path="/*" element={<PostsList getData={getData} />} />
    </Routes>
  );
};
