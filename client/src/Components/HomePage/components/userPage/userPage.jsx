import { NavBar } from "../../../navBar/navBar";
import { PostsContext } from "../../../../App/context/context";
import { useContext, useEffect } from "react";
import { useParams } from "react-router";

export const UserProfile = () => {
  const { postsData } = useContext(PostsContext);
  const userNameParam = Object.values(useParams()).toString();
  const userData = postsData.filter((post) => post.userName === userNameParam);
  



  return (
    <>
      <NavBar />
      <h1>{userNameParam}</h1>
      <h3>{userData[0].title}</h3>
      <p>{userData[0].date}</p>
      <p>{userData[0].content}</p>
    </>
  );
};
