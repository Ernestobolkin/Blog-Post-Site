import axios from "axios";
import { useState } from "react";

export const AddComment = ({ getData, id }) => {
  const [commentValue, setCommentValue] = useState();

  const handleChange = ({ target }) => {
    const { value } = target;
    setCommentValue(value);
  };

  const handleClick = () => {
    let token = localStorage.getItem("token");
    let config = {
      method: "post",
      url: "http://localhost:8080/user/post/comment",
      headers: {
        Authorization: `Beare ${token}`,
      },
      data: {
        content: commentValue,
        postId: id,
      },
    };
    axios(config)
      .then(({ data }) => {
        getData();
      })
      .catch((error) => {
        console.log(error);
        console.log("Error");
      });
  };

  return (
    <>
      <textarea
        onChange={handleChange}
        name="comment"
        placeholder="Write a comment"
        id=""
        cols="30"
        rows="10"
      ></textarea>
      <button onClick={handleClick}>Send</button>
    </>
  );
};
