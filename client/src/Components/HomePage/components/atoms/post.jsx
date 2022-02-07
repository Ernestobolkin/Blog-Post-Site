import React from "react";
import "./style/post.style.scss";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import "./style/post.style.scss";
import axios from "axios";

export const Post = ({getData, post: { _id, title, content, userName, date } }) => {
  const userLogged = window.localStorage.getItem("userName");
  const token = window.localStorage.getItem("token");
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
        getData()
        // getData={getData}
      })
      .catch((error) => {
        console.log(error);
        console.log("Error");
      });
  };

  const handleClick = ({ target }) => {
    const { id } = target;
    id === "delete-icon" && deletePost();
    // edit-icon
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
        {userLogged === name && (
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
  return <>{renderPostCard()}</>;
};
