import { useContext, useState } from "react";
import { useParams } from "react-router";
import RecipeReviewCard from "./card";
import "./style/userPage.style.scss";
import "./style/mobileUserPage.style.scss";
import myApi from "../../../../App/api/myApi";
import { PostsContext, UserDataContext } from "../../../../App/context/context";
import { CommentUpdate } from "./editComment/editComment";

export const UserProfile = ({ getData }) => {
  const { postsData } = useContext(PostsContext);
  let token = localStorage.getItem("token");
  const { userData } = useContext(UserDataContext);
  const userNameParam = Object.values(useParams()).toString();
  const [isupdateComment, setIsUpdateComment] = useState(false);
  const [tempId, setTempId] = useState("");
  const [tempContent, setTempContent] = useState("");

  const deleteComment = (id, postId) => {
    let config = {
      method: "put",
      url: `/user/post/comment/${postId}`,
      headers: {
        Authorization: `Barear ${token}`,
      },
      data: { commentId: id },
    };
    myApi(config)
      .then(() => {
        getData();
      })
      .catch((error) => {
        console.dir(error);
      });
  };
  const handleClick = ({ target: { id } }, _id, postId, content) => {
    id === "delete-icon" && deleteComment(_id, postId);
    id === "edit-icon" && handleClickEditIcon(_id, content);
  };

  const handleClickEditIcon = (_id, content) => {
    setTempId(_id);
    setTempContent(content);
    setIsUpdateComment(true);
  };

  const renderComments = (comment, postId) => {
    const { _id, date, userName, content, email } = comment;

    let name = userName.charAt(0).toUpperCase() + userName.slice(1);
    return (
      <div key={_id} id={_id} className="comment-container">
        {isupdateComment && (
          <div className="comment-update-container">
            <CommentUpdate
              getData={getData}
              setIsUpdateComment={setIsUpdateComment}
              postId={postId}
              tempId={tempId}
              content={tempContent}
            />
          </div>
        )}
        <div className="crud-comment-options">
          {userData.email === email && (
            <i
              name="delete"
              onClick={(e) => handleClick(e, _id, postId)}
              id="delete-icon"
              className="fas fa-trash"
            />
          )}
          {userData.email === email && (
            <i
              name="edit"
              onClick={(e) => handleClick(e, _id, postId, content)}
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
                {post.comments?.map((comment) =>
                  renderComments(comment, _id, userName)
                )}
              </RecipeReviewCard>
            );
          })}
      </div>
    </>
  );
};
