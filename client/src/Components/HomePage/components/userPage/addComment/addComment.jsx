import axios from "axios";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";

export const AddComment = ({ getData, id }) => {
  const [commentValue, setCommentValue] = useState("");

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
        setCommentValue("")
      })
      .catch((error) => {
        console.log(error);
        console.log("Error");
      });
  };

  return (
    <>
      <div className="comment-section">
        <TextField
          id="outlined-size-small"
          onChange={handleChange}
          value={commentValue}
          className="textarea"
          size="small"
        />
        <Button
          onClick={handleClick}
          className="btn"
          variant="outlined"
          endIcon={<SendIcon />}
        >
          Send
        </Button>
      </div>
    </>
  );
};
