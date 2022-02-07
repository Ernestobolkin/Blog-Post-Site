import React, { useState } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import "./style/post.style.scss";
import Button from "@mui/material/Button";

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
        setPostValues({ title: "", content: "" });
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
          <TextField
            size="small"
            value={postValues.title}
            type="text"
            name="title"
            onChange={handleChange}
            label="Enter Title"
            id="standard-basic"
            variant="standard"
          />

          <div className="text-area-N-btn">
            <TextField
              className="outlined-multiline-static"
              multiline
              rows={4}
              placeholder="What would you like to share?"
              name="content"
              onChange={handleChange}
              value={postValues.content}
            />
            <Button
              size="small"
              className="btn"
              variant="contained"
              onClick={handleClick}
            >
              Post
            </Button>
          </div>
        </div>
      </Box>
    </>
  );
};
