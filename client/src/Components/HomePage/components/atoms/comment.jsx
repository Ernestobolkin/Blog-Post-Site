import React from "react";
import { Link } from "react-router-dom";

const classes = {
  container: "",
  header: "",
  headerMainContent: "",
  content: "",
};

export const Comment = ({ comment: { userName, content, userId } }) => {
  return (
    <div className={classes.container}>
      <header className={classes.header}>
        <Link to={`/${userId}`}>
          <h4 className={classes.headerMainContent}>{userName}</h4>
        </Link>
      </header>
      <p className={classes.content}>{content}</p>
    </div>
  );
};
