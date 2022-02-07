import React from "react";
import "./style/post.style.scss";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import "./style/post.style.scss";

export const Post = ({ post: { title, content, userName, date } }) => {
  const handleClick = ({ target }) => {
    console.dir(target);
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
        <div className="crud-post-options">
          <i id="delete-icon" className="fas fa-trash"></i>
          <i id="edit-icon" className="fas fa-pencil-alt"></i>
        </div>
        <CardHeader
          title={<Link to={`/post/${userName}`}>{userName}</Link>}
          subheader={date}
        />

        <CardContent>
          <Typography variant="body2" color="text.secondary">
            <h3>{title}</h3>
            {content}
          </Typography>
        </CardContent>
      </Card>
    );
  };
  return <>{renderPostCard()}</>;
};
