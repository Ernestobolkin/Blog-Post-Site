import React, { useState } from "react";
import { Comment } from "../atoms/comment";
export const CommentsList = ({ comments }) => {
  return (
    <>
      {comments.map((comment) => (
        <Comment key={comment.commentId} comment={comment} />
      ))}
    </>
  );
};
