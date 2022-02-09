import TextField from "@mui/material/TextField";
import {  useState } from "react";
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
        size="small"
        type="text"
        name="title"
        id="standard-basic"
        variant="standard"
        onChange={handleChange}
        value={valueToSend.title}
      />
      <TextField
        className="outlined-multiline-static"
        multiline
        rows={4}
        name="content"
        onChange={handleChange}
        value={valueToSend.content}
      />
      <button name="btn" onClick={handleClick}>
        save
      </button>
    </>
  );
};
