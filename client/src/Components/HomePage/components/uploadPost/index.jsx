import React, { useState } from "react";
import axios from "axios";

export const UploadPost = ({ getData }) => {
  let token = localStorage.getItem("token");
  const [postValues, setPostValues] = useState({
    title: "",
    content: "",
  });
  const handleChange = ({ target }) => {
    const { name, value } = target;
    name === "title" && setPostValues({ ...postValues, title: value });
    name === "content" && setPostValues({ ...postValues, content: value });
  };
  const handleClick = (e) => {
    e.preventDefault();
    let config = {
      method: 'post',
      url: 'http://localhost:8080/user/post',
      data: postValues,
      headers: {
        Authorization: `bearer ${token}`,
      },
    };
    axios(config)
      .then(({ data }) => {
        getData();
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
        console.log("Error");
      });
  };

  return (
    <>
      <div className="uploadPostFrom">
        <input
          name="title"
          onChange={handleChange}
          type="text"
          placeholder="Enter Title"
        />
        <textarea
          onChange={handleChange}
          name="content"
          id=""
          cols="30"
          rows="10"
          placeholder="What Would You Like To Share"
        ></textarea>
        <button onClick={handleClick}>Post</button>
      </div>
    </>
  );
};
