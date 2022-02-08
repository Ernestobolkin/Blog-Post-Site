import { NavBar } from "../../../navBar/navBar";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import RecipeReviewCard from "./card";
import "./style/userPage.style.scss";
import axios from "axios";

export const UserProfile = ({ postsData, getData }) => {
  const userLogged = window.localStorage.getItem("userName").toLowerCase();
  const token = window.localStorage.getItem("token");
  const [isData, serIsData] = useState(false);
  const [filteredData, setFilteredData] = useState();
  const userNameParam = Object.values(useParams()).toString();

  const deleteComment = (id, postId) => {
    let config = {
      method: "put",
      url: `http://localhost:8080/user/post/comment/${postId}`,
      headers: {
        Authorization: `Barear ${token}`,
      },
      data: { commentId: id },
    };
    axios(config)
      .then(({ data }) => {
        getData();
      })
      .catch((error) => {
        console.dir(error);
        console.log("Error");
      });
  };

  const handleClick = ({ target }, _id, postId) => {
    const { id } = target;

    id === "delete-icon" && deleteComment(_id, postId);
    // edit === icon;
  };

  const renderComments = (comment, postId, postOwner) => {
    const { _id, date, userName, content } = comment;
    let name = userName.charAt(0).toUpperCase() + userName.slice(1);
    return (
      <div id={_id} key={_id} className="comment-container">
        <div className="crud-comment-options">
          {postOwner === userLogged && (
            <i
              name="delete"
              onClick={(e) => handleClick(e, _id, postId)}
              id="delete-icon"
              className="fas fa-trash"
            />
          )}
          <i
            name="edit"
            onClick={handleClick}
            id="edit-icon"
            className="fas fa-pencil-alt"
          />
        </div>
        <h3>{name}</h3>
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
      const { _id, title, date, content, userName } = post;
      return (
        <RecipeReviewCard
          key={_id}
          id={_id}
          title={title}
          date={date}
          content={content}
          getData={getData}
        >
          {post?.comments?.map((comment) =>
            renderComments(comment, _id, userName)
          )}
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
        <h2 className="userName">
          {userNameParam.charAt(0).toUpperCase() + userNameParam.slice(1)}
        </h2>

        {isData && renderPost()}
      </div>
    </>
  );
};
