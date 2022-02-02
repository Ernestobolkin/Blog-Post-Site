import React from "react";
import "./style/post.style.scss";
import { Link } from "react-router-dom";

const classes = {
  container: "post-card",
  header: "header",
  headerMainContent: "header-content",
  article: "article",
  articleContent: "article-content",
  link: "link",
};

export const Post = ({ post: { title, content, userId } }) => {
  const renderPostCard = () => {
    let copyContent = content;
    let shortedContent =
      copyContent.split(" ").slice(0, 15).join().replace(/,/g, " ") + "...";
    return (
      <Link className={classes.link} to={`/post/${userId}`}>
        <div className={classes.container}>
          <header className={classes.header}>
            {title}
            {/* <div className={classes.headerMainContent}></div> */}
          </header>
          <article className={classes.article}>
            <p className={classes.articleContent}>
              {content.length > 50 ? shortedContent : content}
            </p>
          </article>
        </div>
      </Link>
    );
  };
  return <>{renderPostCard()}</>;
};
