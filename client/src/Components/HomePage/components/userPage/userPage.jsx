import { NavBar } from "../../../navBar/navBar";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { AddComment } from "../addComment/addComment";

export const UserProfile = ({ postsData, getData }) => {
  const [isData, serIsData] = useState(false);
  const [isComment, setIsComment] = useState(false);
  const [filteredData, setFilteredData] = useState();
  const userNameParam = Object.values(useParams()).toString();

  const renderComments = (i) => {
    return filteredData[i].comments.map((comment) => {
      return (
        <div
          id={comment._id}
          name={comment.userId}
          key={comment._id}
          className="comment-container"
        >
          <p>{comment.date}</p>
          <h3>{comment.userName}</h3>
          <p>{comment.content}</p>
          <hr />
        </div>
      );
    });
  };

  const renderPost = () => {
    return filteredData
      .map((post, i) => {
        return (
          <div key={post._id} id={post._id}>
            <h1>{userNameParam}</h1>
            <h3>{post.title}</h3>
            <p>{post.date}</p>
            <p>{post.content}</p>
            <hr />
            <div className="comments">{isData && renderComments(i)}</div>
            {!isComment && (
              <button onClick={() => setIsComment(true)}>
                Leave A Comment
              </button>
            )}
            {isComment && (
              <AddComment id={filteredData[i]._id} getData={getData} />
            )}
          </div>
        );
      })
      .reverse();
  };

  const filterData = () => {
    const userData = postsData.filter(
      (post) => post.userName === userNameParam
    );
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
