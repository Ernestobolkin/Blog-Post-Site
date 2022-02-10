import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useState } from "react";
import axios from "axios";

export const PostUpdate = ({
  getData,
  _id,
  setIsUpdatePost,
  content,
  title,
}) => {
  const token = window.localStorage.getItem("token");
  const [valueToSend, setValueToSend] = useState({
    title,
    content,
  });

  const handleClick = () => {
    let config = {
      method: "put",
      url: `http://localhost:8080/user/post/update/${_id}`,
      headers: {
        Authorization: `Barear ${token}`,
      },
      data: valueToSend,
    };
    axios(config)
      .then(({ data }) => {
        getData();
        setIsUpdatePost(false);
      })
      .catch((error) => {
        console.dir(error);
        console.log("Error");
      });
  };

  const handleClickIcon = () => {
    setIsUpdatePost(false);
  };

  const handleChange = ({ target }) => {
    const { name, value } = target;
    name === "title" && setValueToSend({ ...valueToSend, title: value });
    name === "content" && setValueToSend({ ...valueToSend, content: value });
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
        onChange={handleChange}
        value={valueToSend.title}
      />
      <TextField
        id="outlined-multiline-static"
        className="text-field-content"
        multiline
        rows={5}
        name="content"
        onChange={handleChange}
        value={valueToSend.content}
      />
      <Button className="btn" variant="contained" name="btn" onClick={handleClick}>
        save
      </Button>
    </>
  );
};
