import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useState } from "react";
import myApi from "../../../../../App/api/myApi";

export const CommentUpdate = ({ getData, setIsUpdateComment, postId, tempId ,content}) => {
  const [valueToSend, setValueToSend] = useState(content);
  let token = window.localStorage.getItem("token");
  const handleClick = () => {
    let config = {
      method: "put",
      url: `/user/post/comment/update/${postId}`,
      headers: {
        Authorization: `Barear ${token}`,
      },
      data: {
        commentId: tempId,
        content: valueToSend,
      },
    };
    myApi(config)
      .then(() => {
        setIsUpdateComment(false)
        getData();
      })
      .catch((error) => {
        console.dir(error);
        console.log("Error");
    });
  };
  const handleClickIcon = () => {
    setIsUpdateComment(false);
  };

  return (
    <>
      <i name="icon" onClick={handleClickIcon} className="fas fa-times"></i>
      <TextField
        className="text-field-title"
        size="small"
        type="text"
        name="title"
        id="standard-basic"
        variant="outlined"
        value={valueToSend}
        onChange={(e) => {
          setValueToSend(e.target.value);
        }}
      />
      <Button
        className="btn"
        variant="contained"
        name="btn"
        onClick={handleClick}
      >
        save
      </Button>
    </>
  );
};
