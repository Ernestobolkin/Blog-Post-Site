import { NavBar } from "../../../navBar/navBar";
import { useContext, useRef } from "react";
import { useParams } from "react-router";
import RecipeReviewCard from "./card";
import "./style/userPage.style.scss";
import axios from "axios";
import { PostsContext } from "../../../../App/context/context";

export const UserProfile = ({ getData }) => {
  const { postsData } = useContext(PostsContext);
  let token = localStorage.getItem("token");
  let userEmail = localStorage.getItem("email");
  const userName = localStorage.getItem("userName")?.toLowerCase();
  const userNameRef = useRef(userName);
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
      .then(() => {
        getData();
      })
      .catch((error) => {
        console.dir(error);
        console.log("Error");
      });
  };

  const handleClick = ({ target: { id } }, _id, postId) => {
    id === "delete-icon" && deleteComment(_id, postId);
    // id === "edit-icon" && setIsUpdatePost(true);
  };

  const renderComments = (comment, postId, postOwner) => {
    const { _id, date, userName, content, email } = comment;
    let name = userName.charAt(0).toUpperCase() + userName.slice(1);

    return (
      <div key={_id} className="comment-container">
        <div className="crud-comment-options">
          {postOwner === userNameRef.current && (
            <i
              name="delete"
              onClick={(e) => handleClick(e, _id, postId)}
              id="delete-icon"
              className="fas fa-trash"
            />
          )}
          {userEmail === email && (
            <i
              name="edit"
              onClick={(e) => handleClick(e, _id, postId)}
              id="edit-icon"
              className="fas fa-pencil-alt"
            />
          )}
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

  return (
    <>
      <NavBar />
      <div className="user-posts-container">
        <h2 className="userName">
          {userNameParam.charAt(0).toUpperCase() + userNameParam.slice(1)}
        </h2>

        {postsData
          .filter((post) => post.userName === userNameParam)
          .reverse()
          .map((post) => {
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
          })}
      </div>
    </>
  );
};
