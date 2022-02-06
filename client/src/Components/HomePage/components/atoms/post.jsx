import React from "react";
import "./style/post.style.scss";
import { Link } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export const Post = ({ post: { title, content, userName, date, owner } }) => {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const renderPostCard = () => {
    let copyContent = content;

    return (
      <Card
        className="card"
        sx={{
          minHeight: "200px",
          height: "fit-content",
          minWidth: "60%",
          maxWidth: "60%",
        }}
      >
        <CardHeader
          title={<Link to={`/post/${userName}`}>{userName}</Link>}
          subheader={date}
        />

        <CardContent>
          <Typography variant="body2" color="text.secondary">
            <h3>{title}</h3>
            {content}
          </Typography>
        </CardContent>
      </Card>
    );
  };
  return <>{renderPostCard()}</>;
};
