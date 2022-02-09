import React, { useState } from "react";
import "./style/post.style.scss";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import "./style/post.style.scss";
import axios from "axios";
import { PostUpdate } from "./postCrud/postCrud";

export const Post = ({
  getData,
  post: { _id, title, content, userName, date, email },
}) => {
  const [isUpdatePost, setIsUpdatePost] = useState(false);
  let token = window.localStorage.getItem("token");
  let userEmail = window.localStorage.getItem("email");

  let name = userName.charAt(0).toUpperCase() + userName.slice(1);
  const deletePost = () => {
    let config = {
      method: "delete",
      url: `http://localhost:8080/user/post/${_id}`,
      headers: {
        Authorization: `Barear ${token}`,
      },
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

  const handleClick = ({ target }) => {
    const { id } = target;
    id === "delete-icon" && deletePost();
    id === "edit-icon" && setIsUpdatePost(true);
  };

  const renderPostCard = () => {
    return (
      <Card
        className="card"
        sx={{
          minHeight: "200px",
          height: "fit-content",
          minWidth: "60%",
          maxWidth: "60%",
        }}
      >
        {email === userEmail && (
          <div className="crud-post-options">
            <i
              name="delete"
              onClick={handleClick}
              id="delete-icon"
              className="fas fa-trash"
            />
            <i
              name="edit"
              onClick={handleClick}
              id="edit-icon"
              className="fas fa-pencil-alt"
            />
          </div>
        )}
        <CardHeader
          title={
            <Link className="user-link" to={`/post/${userName}`}>
              {name}
            </Link>
          }
          subheader={date}
        />

        <CardContent>
          <Typography variant="h6" component="h6">
            <b>{title}</b>
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {content}
          </Typography>
        </CardContent>
      </Card>
    );
  };
  return (
    <>
      {isUpdatePost && (
        <div className="updatePost-card">
          <PostUpdate
            getData={getData}
            _id={_id}
            setIsUpdatePost={setIsUpdatePost}
            content={content}
            title={title}
          />
        </div>
      )}
      {renderPostCard()}
    </>
  );
};
