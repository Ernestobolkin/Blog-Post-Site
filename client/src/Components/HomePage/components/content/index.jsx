import { Routes, Route } from "react-router";
import { PostsList } from "../postsList";
import ROUTES from "../../../../constants/routes";
export const Content = ({ getData }) => {
  return (
    <Routes>
      <Route path={ROUTES.TRAILING_PATH} element={<PostsList getData={getData} />} />
    </Routes>
  );
};
