import { NavBar } from "../navBar/navBar";
import { Content } from "./components/content";
import "./styles/homePage.style.scss";
export const HomePage = () => {
  return (
    <>
      <NavBar />
      <div className="home-page-container">
        <div className="posts-container">
          <Content />
        </div>
      </div>
    </>
  );
};
