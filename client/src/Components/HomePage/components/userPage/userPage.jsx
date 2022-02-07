import { NavBar } from "../../../navBar/navBar";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import RecipeReviewCard from "./card";
import "./style/userPage.style.scss";

export const UserProfile = ({ postsData, getData }) => {
  const [isData, serIsData] = useState(false);
  const [filteredData, setFilteredData] = useState();
  const userNameParam = Object.values(useParams()).toString();

  const renderComments = (comment) => {
    const { _id, date, userName, content } = comment;
    return (
      <div id={_id} key={_id} className="comment-container">
        <h3>{userName}</h3>
        <p className="date">{date}</p>
        <br />
        <p>{content}</p>
        <br />
        <hr />
      </div>
    );
  };

  const renderPost = () =>
    filteredData.map((post) => {
      const { _id, title, date, content } = post;
      return (
        <RecipeReviewCard
          key={_id}
          id={_id}
          title={title}
          date={date}
          content={content}
          getData={getData}
        >
          {post?.comments?.map(renderComments)}
        </RecipeReviewCard>
      );
    });

  const filterData = () => {
    const userData = postsData
      .filter((post) => post.userName === userNameParam)
      .reverse();
    setFilteredData(userData);
    serIsData(true);
  };

  useEffect(() => {
    postsData && filterData();
  }, [postsData]); // eslint-disable-line

  return (
    <>
      <NavBar />
      <div className="user-posts-container">
        <h2 className="userName">{userNameParam}</h2>
        {isData && renderPost()}
      </div>
    </>
  );
};
