import React, { useState } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import "./style/post.style.scss"

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
      method: "post",
      url: "http://localhost:8080/user/post",
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
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="on"
      >
        <div className="uploadPostFrom">
          <input
            name="title"
            onChange={handleChange}
            type="text"
            value={postValues.title}
            placeholder="Enter Title"
          />
          <TextField
            className="outlined-multiline-static"
            multiline
            rows={4}
            name="content"
            onChange={handleChange}
            value={postValues.content}
          />

          <button onClick={handleClick}>Post</button>
        </div>
      </Box>
    </>
  );
};
