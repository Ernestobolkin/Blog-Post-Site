import { Content } from "./components/content";
import "./styles/homePage.style.scss";
import { UploadPost } from "./components/uploadPost";
import { LogOutContext } from "../../App/context/context";
import { useContext } from "react";

const classList = {
  homePage: "home-page-container",
  postContainer: "posts-container",
  uploadContainer: "uploadPostContainer",
};
export const HomePage = ({ getData }) => {
  const { isLoggedIn } = useContext(LogOutContext);
  return (
    <>
      <div className={classList.homePage}>
        <div className={classList.uploadContainer}>
          {isLoggedIn && <UploadPost getData={getData} />}
        </div>
        <div className={classList.postContainer}>
          <Content getData={getData} />
        </div>
      </div>
    </>
  );
};
