import { NavBar } from "../../../navBar/navBar";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import RecipeReviewCard from "./userPageTest";

export const UserProfile = ({ postsData, getData }) => {
  const [isData, serIsData] = useState(false);
  const [isComment, setIsComment] = useState(false);
  const [filteredData, setFilteredData] = useState();
  const userNameParam = Object.values(useParams()).toString();

  const renderComments = (comment) => {
    const { _id, date, userName, content } = comment;
    return (
      <div id={_id} key={_id} className="comment-container">
        <p>{date}</p>
        <h3>{userName}</h3>
        <p>{content}</p>
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
        // <div key={post._id} id={post._id}>
        //   <h1>{userNameParam}</h1>
        //   <h3>{post.title}</h3>
        //   <p>{post.date}</p>
        //   <p>{post.content}</p>
        //   <hr />
        //   <div className="comments">{isData && renderComments(i)}</div>
        //   {!isComment && (
        //     <button onClick={() => setIsComment(true)}>
        //       Leave A Comment
        //     </button>
        //   )}
        //   {isComment && (
            // <AddComment id={filteredData[i]._id} getData={getData} />
        //   )}
        // </div>
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
      {isData && renderPost()}
    </>
  );
};
